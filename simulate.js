const { initializeApp } = require('firebase-admin/app');
const { getFirestore, FieldValue, GeoPoint } = require('firebase-admin/firestore');
const admin = require('firebase-admin');

// 1. Firebase Admin mit dem GitHub Secret initialisieren
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = getFirestore();

// 2. LIVE-ROUTE: Hauptstraße N2 durch Zaio (Marokko)
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
  // WICHTIG: Tauschen Sie 'demo_vendor_id' aus, falls Ihre App eine andere ID nutzt
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
      // KORREKTUR: Daten werden jetzt strukturiert im "location"-Unterverzeichnis abgelegt
      await sellerRef.set({
        //name: "Demo Verkäufer Zaio",
        //role: "vendor",
        isOnline: true,
        currentRouteIndex: currentIndex + 1,
        updatedAt: FieldValue.serverTimestamp(),
        
        // Hier ist das gewünschte "location"-Objekt
        location: {
          latitude: currentPos.latitude,
          longitude: currentPos.longitude,
          // Wir senden zusätzlich einen echten Firebase GeoPoint mit (oft von Android benötigt)
          geopoint: new GeoPoint(currentPos.latitude, currentPos.longitude)
        }
      }, { merge: true });

      console.log(`[Schritt ${i+1}/5] Zaio N2 updated in 'location': Lat ${currentPos.latitude}, Lng ${currentPos.longitude}`);
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
