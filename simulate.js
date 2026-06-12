const { initializeApp } = require('firebase-admin/app');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');
const admin = require('firebase-admin');

// 1. Firebase Admin mit dem GitHub Secret initialisieren
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = getFirestore();

// 2. LIVE-ROUTE: Hauptstraße N2 durch Zaio (Marokko)
const route = [
  { latitude: 34.9392, longitude: -2.7485 }, // Start (N2 Westeingang)
  { latitude: 34.9383, longitude: -2.7431 }, // Höhe Avenue Sidi Atmane
  { latitude: 34.9371, longitude: -2.7369 }, // Stadtzentrum Zaio
  { latitude: 34.9360, longitude: -2.7311 }, // Nahe Moschee / Markt
  { latitude: 34.9351, longitude: -2.7248 }, // N2 Richtung Osten
  { latitude: 34.9342, longitude: -2.7190 }, // Ausgang Richtung Berkane
  { latitude: 34.9351, longitude: -2.7248 }, // Rückweg für nahtlose Schleife
  { latitude: 34.9360, longitude: -2.7311 },
  { latitude: 34.9371, longitude: -2.7369 },
  { latitude: 34.9383, longitude: -2.7431 }
];

async function runSimulation() {
  // WICHTIG: Ersetzen Sie 'demo_vendor_id' durch die ID, die Ihre Android-App sucht!
  const sellerRef = db.collection('users').doc('tLxGXCKHQDUPOlLxQDpH4zzmP4E2');
  
  // Aktuellen Index aus Firestore auslesen
  const docSnap = await sellerRef.get();
  let currentIndex = 0;
  
  if (docSnap.exists && docSnap.data().currentRouteIndex !== undefined) {
    currentIndex = docSnap.data().currentRouteIndex;
  }

  // 5 Intervalle á 10 Sekunden innerhalb der GitHub-Aktivitätsminute
  for (let i = 0; i < 5; i++) {
    if (currentIndex >= route.length) {
      currentIndex = 0;
    }

    const currentPos = route[currentIndex];

    try {
      // Schreibt exakt in die 'users' Collection laut Ihren Regeln
      await sellerRef.set({
        // role: "vendor", // Markiert den Account als Verkäufer für Ihre App
        isOnline: true,
        latitude: currentPos.latitude,
        longitude: currentPos.longitude,
        currentRouteIndex: currentIndex + 1, // Speichert den Stand für das nächste Intervall
        updatedAt: FieldValue.serverTimestamp()
      }, { merge: true });

      console.log(`[Schritt ${i+1}/5] Zaio N2 updated: Lat ${currentPos.latitude}, Lng ${currentPos.longitude}`);
    } catch (error) {
      console.error("Fehler beim Schreiben in Firestore:", error);
    }

    currentIndex++;

    // 10 Sekunden Pause vor dem nächsten Schritt
    if (i < 4) {
      await new Promise(resolve => setTimeout(resolve, 10000));
    }
  }
}

runSimulation();
