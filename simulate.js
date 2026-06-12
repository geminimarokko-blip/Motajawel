const { initializeApp } = require('firebase-admin/app');
const { getFirestore, FieldValue, GeoPoint } = require('firebase-admin/firestore');
const admin = require('firebase-admin');

// Firebase Admin initialisieren
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = getFirestore();

// Live-Route durch Zaio, Marokko
const route = [
  { latitude: 34.9392, longitude: -2.7485 }, 
  { latitude: 34.9383, longitude: -2.7431 }, 
  { latitude: 34.9371, longitude: -2.7369 }, 
  { latitude: 34.9360, longitude: -2.7311 }, 
  { latitude: 34.9351, longitude: -2.7248 }, 
  { latitude: 34.9342, longitude: -2.7190 }, 
  { latitude: 34.9351, longitude: -2.7248 }, 
  { latitude: 34.9360, longitude: -2.7311 },
  { latitude: 34.9371, longitude: -2.7369 },
  { latitude: 34.9383, longitude: -2.7431 }
];

async function runSimulation() {
  const sellerRef = db.collection('users').doc('demo_vendor_id');
  
  // Start-Index aus Firestore holen
  const docSnap = await sellerRef.get();
  let currentIndex = 0;
  
  if (docSnap.exists && docSnap.data().currentRouteIndex !== undefined) {
    currentIndex = docSnap.data().currentRouteIndex;
  }

  console.log("Starte 30-Minuten-Dauer-Simulation für den Verkäufer...");

  // 180 Durchläufe * 10 Sekunden Pause = 1800 Sekunden = 30 Minuten Live-Fahrt
  for (let i = 0; i < 180; i++) {
    if (currentIndex >= route.length) {
      currentIndex = 0;
    }

    const currentPos = route[currentIndex];

    try {
      await sellerRef.set({
        name: "Demo Verkäufer Zaio",
        role: "vendor",
        isOnline: true,
        currentRouteIndex: currentIndex + 1,
        updatedAt: FieldValue.serverTimestamp(),
        location: {
          latitude: currentPos.latitude,
          longitude: currentPos.longitude,
          geopoint: new GeoPoint(currentPos.latitude, currentPos.longitude)
        }
      }, { merge: true });

      console.log(`[Schritt ${i+1}/180] Zaio N2 aktualisiert: Lat ${currentPos.latitude}, Lng ${currentPos.longitude}`);
    } catch (error) {
      console.error("Fehler beim Schreiben in Firestore:", error);
    }

    currentIndex++;

    // 10 Sekunden warten vor dem nächsten Schritt (außer beim allerletzten Durchlauf)
    if (i < 179) {
      await new Promise(resolve => setTimeout(resolve, 10000));
    }
  }
  
  console.log("30-Minuten-Simulation erfolgreich beendet.");
}

runSimulation();
