const { initializeApp } = require('firebase-admin/app');
const { getFirestore, FieldValue, GeoPoint } = require('firebase-admin/firestore');
const admin = require('firebase-admin');

// Firebase Admin initialisieren
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = getFirestore();

// NEUE ROUTE: Langsames Fahrrad im Stadtzentrum von Zaio (Zick-Zack durch Straßen)
const route = [
  { latitude: 34.9414583, longitude: -2.7321497 },
  { latitude: 34.9414664, longitude: -2.7321768 },
  { latitude: 34.9408343, longitude: -2.7312014 },
  { latitude: 34.9408514, longitude: -2.7312123 },
  { latitude: 34.941934, longitude: -2.7301803 },
  { latitude: 34.9419408, longitude: -2.7301834 },
  { latitude: 34.942554, longitude: -2.7314604 },
  { latitude: 34.9425558, longitude: -2.7315124 },
  { latitude: 34.9421875, longitude: -2.7317879 },
  { latitude: 34.9422044, longitude: -2.7318124 },
  { latitude: 34.9426905, longitude: -2.7324922 },
  { latitude: 34.9426964, longitude: -2.7325413 },
  { latitude: 34.9432481, longitude: -2.7335668 },
  { latitude: 34.9432938, longitude: -2.7335916 },
  { latitude: 34.9425189, longitude: -2.7343096 },
  { latitude: 34.9425382, longitude: -2.7343418 },
  { latitude: 34.9420003, longitude: -2.7334598 },
  { latitude: 34.9420111, longitude: -2.7334844 },
  { latitude: 34.9413179, longitude: -2.7340078 },
  { latitude: 34.9413434, longitude: -2.7340203 },
  { latitude: 34.9410449, longitude: -2.7335549 },
  { latitude: 34.9410622, longitude: -2.7333558 },
  { latitude: 34.9406784, longitude: -2.7336738 },
  { latitude: 34.9406757, longitude: -2.7336988 },
  { latitude: 34.9403859, longitude: -2.7340142 },
  { latitude: 34.9403945, longitude: -2.7340417 },
  { latitude: 34.9409998, longitude: -2.7334234 },
  { latitude: 34.9400255, longitude: -2.7334201 },
  { latitude: 34.940538, longitude: -2.7329781 },
  { latitude: 34.9405175, longitude: -2.7330343 },
  { latitude: 34.9406589, longitude: -2.7326549 },
  { latitude: 34.9406757, longitude: -2.7326913 },
  { latitude: 34.9404522, longitude: -2.7322888 },
  { latitude: 34.9404472, longitude: -2.7323055 },
  { latitude: 34.9408304, longitude: -2.7319292 },
  { latitude: 34.9408514, longitude: -2.7319411 },
  { latitude: 34.9404834, longitude: -2.7313555 },
  { latitude: 34.9404648, longitude: -2.7313837 },
  { latitude: 34.9404132, longitude: -2.7308824 },
  { latitude: 34.9404297, longitude: -2.7308907 },
  { latitude: 34.9404132, longitude: -2.7302146 },
  { latitude: 34.9404297, longitude: -2.7302262 },
  { latitude: 34.9406004, longitude: -2.7298078 },
  { latitude: 34.9405878, longitude: -2.7298404 },
  { latitude: 34.9408343, longitude: -2.7293027 },
  { latitude: 34.9408338, longitude: -2.7293045 },
  { latitude: 34.9413803, longitude: -2.7294118 },
  { latitude: 34.9413961, longitude: -2.7294546 },
  { latitude: 34.9415206, longitude: -2.7299213 },
  { latitude: 34.9415367, longitude: -2.7299476 },
  { latitude: 34.9422537, longitude: -2.7293883 },
  { latitude: 34.9422395, longitude: -2.7294546 },
  { latitude: 34.9427256, longitude: -2.7291057 },
  { latitude: 34.9427491, longitude: -2.7291116 },
  { latitude: 34.9428971, longitude: -2.7295017 },
  { latitude: 34.9429424, longitude: -2.7295189 },
  { latitude: 34.9425072, longitude: -2.7296794 },
  { latitude: 34.9425031, longitude: -2.7296904 },
  { latitude: 34.9427529, longitude: -2.7304714 },
  { latitude: 34.9427491, longitude: -2.7304835 },
  { latitude: 34.9430765, longitude: -2.7310301 },
  { latitude: 34.9430829, longitude: -2.7310836 },
  { latitude: 34.9417039, longitude: -2.7318607 },
  { latitude: 34.9417124, longitude: -2.7319196 },
  { latitude: 34.9413959, longitude: -2.7322396 },
  { latitude: 34.9413961, longitude: -2.732284 }
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
