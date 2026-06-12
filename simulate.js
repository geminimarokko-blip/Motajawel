const { initializeApp } = require('firebase-admin/app');
const { getFirestore, FieldValue, GeoPoint } = require('firebase-admin/firestore');
const admin = require('firebase-admin');

// Firebase Admin initialisieren
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = getFirestore();

// NEUE ROUTE: Langsames Fahrrad im Stadtzentrum von Zaio (Zick-Zack durch Straßen)
const route = [
  { latitude: 34.93750, longitude: -2.73400 }, // 1. Start im Zentrum (Hauptstraße)
  { latitude: 34.93720, longitude: -2.73410 }, // 2. Geradeaus Richtung Süden
  { latitude: 34.93690, longitude: -2.73420 }, // 3. Weiter geradeaus
  { latitude: 34.93685, longitude: -2.73350 }, // 4. Biegt RECHTS ab in die Querstraße
  { latitude: 34.93680, longitude: -2.73280 }, // 5. Fährt geradeaus durch die Gasse
  { latitude: 34.93710, longitude: -2.73270 }, // 6. Biegt LINKS ab (Richtung Norden)
  { latitude: 34.93740, longitude: -2.73260 }, // 7. Fährt geradeaus weiter
  { latitude: 34.93745, longitude: -2.73330 }, // 8. Biegt wieder LINKS ab (zurück Richtung Start)
  { latitude: 34.93748, longitude: -2.73380 }  // 9. Schließt die Runde fürs nächste Intervall
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
  for (let i = 0; i < 180; i++) {
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
    if (i < 179) {
      await new Promise(resolve => setTimeout(resolve, 10000));
    }
  }
}

runSimulation();
