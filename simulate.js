const { initializeApp } = require('firebase-admin/app');
const { getFirestore, FieldValue, GeoPoint } = require('firebase-admin/firestore');
const admin = require('firebase-admin');

// Firebase Admin initialisieren
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = getFirestore();

// NEUE ROUTE: Langsames Fahrrad im Stadtzentrum von Zaio (Zick-Zack durch Straßen)
const route = [
  { latitude: 34.94420, longitude: -2.73500 }, // 1. Start auf der Hauptstraße im Zentrum
  { latitude: 34.94390, longitude: -2.73510 }, // 2. Fährt geradeaus nach Süden (hält sich rechts)
  { latitude: 34.94360, longitude: -2.73520 }, // 3. Weiter geradeaus
  { latitude: 34.94355, longitude: -2.73450 }, // 4. Biegt RECHTS ab in die Seitenstraße
  { latitude: 34.94350, longitude: -2.73380 }, // 5. Langsam durch die Gasse geradeaus
  { latitude: 34.94380, longitude: -2.73370 }, // 6. Biegt LINKS ab Richtung Norden
  { latitude: 34.94410, longitude: -2.73360 }, // 7. Fährt die Parallelstraße hoch
  { latitude: 34.94415, longitude: -2.73430 }, // 8. Biegt wieder LINKS ab (Richtung Ausgangspunkt)
  { latitude: 34.94418, longitude: -2.73480 }  // 9. Runde schließt sich fürs nächste Intervall
];

async function runSimulation() {
  const sellerRef = db.collection('users').doc('tLxGXCKHQDUPOlLxQDpH4zzmP4E2');
  
  const docSnap = await sellerRef.get();
  let currentIndex = 0;
  
  if (docSnap.exists && docSnap.data().currentRouteIndex !== undefined) {
    currentIndex = docSnap.data().currentRouteIndex;
  }

  console.log("🚲 Fahrrad-Straßenverkäufer Simulation gestartet (30 Minuten)...");

  // 180 Durchläufe * 10 Sekunden = 30 Minuten langsame Fahrt
  for (let i = 0; i < 1440; i++) {
    if (currentIndex >= route.length) {
      currentIndex = 0;
    }

    const currentPos = route[currentIndex];

    try {
      await sellerRef.set({
       // name: "Fahrrad-Verkäufer Zaio",
        //role: "vendor",
        isOnline: true,
        currentRouteIndex: currentIndex + 1,
        updatedAt: FieldValue.serverTimestamp(),
        location: {
          latitude: currentPos.latitude,
          longitude: currentPos.longitude,
          geopoint: new GeoPoint(currentPos.latitude, currentPos.longitude)
        }
      }, { merge: true });

      console.log(`[Schritt ${i+1}/180] Fahrrad-Position: Lat ${currentPos.latitude}, Lng ${currentPos.longitude}`);
    } catch (error) {
      console.error("Fehler beim Schreiben:", error);
    }

    currentIndex++;

    // 10 Sekunden Pause für ein gemütliches Fahrrad-Tempo
    if (i < 1439) {
      await new Promise(resolve => setTimeout(resolve, 10000));
    }
  }
}

runSimulation();
