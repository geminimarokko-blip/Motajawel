const { initializeApp } = require('firebase-admin/app');
const { getFirestore, FieldValue, GeoPoint } = require('firebase-admin/firestore');
const admin = require('firebase-admin');

// Firebase Admin initialisieren
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = getFirestore();

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
  const sellerRef = db.collection('users').doc('tLxGXCKHQDUPOlLxQDpH4zzmP4E2');
  const docSnap = await sellerRef.get();
  let currentIndex = 0;
  
  if (docSnap.exists && docSnap.data().currentRouteIndex !== undefined) {
    currentIndex = docSnap.data().currentRouteIndex;
  }

  // Läuft für 5 Durchgänge (50 Sekunden)
  for (let i = 0; i < 5; i++) {
    if (currentIndex >= route.length) {
      currentIndex = 0;
    }

    const currentPos = route[currentIndex];

    try {
      await sellerRef.set({
        //name: "Demo Verkäufer Zaio",
       // role: "vendor",
        isOnline: true,
        currentRouteIndex: currentIndex + 1,
        updatedAt: FieldValue.serverTimestamp(),
        location: {
          latitude: currentPos.latitude,
          longitude: currentPos.longitude,
          geopoint: new GeoPoint(currentPos.latitude, currentPos.longitude)
        }
      }, { merge: true });

      console.log(`[Schritt ${i+1}/5] Zaio N2: Lat ${currentPos.latitude}, Lng ${currentPos.longitude}`);
    } catch (error) {
      console.error("Fehler beim Schreiben in Firestore:", error);
    }

    currentIndex++;

    if (i < 4) {
      await new Promise(resolve => setTimeout(resolve, 10000));
    }
  }

  // JETZT AUTOMATISCHER NEUSTART
  await triggerNextRun();
}

async function triggerNextRun() {
  const repo = process.env.GITHUB_REPOSITORY; 
  const token = process.env.GITHUB_TOKEN; 
  // Holt den aktuellen Branch-Namen dynamisch (z.B. "refs/heads/main" -> "main")
  const branch = process.env.GITHUB_REF ? process.env.GITHUB_REF.replace('refs/heads/', '') : 'main';

  if (!token || !repo) {
    console.log("Automatischer Neustart übersprungen (Lokaler Test oder fehlendes Token).");
    return;
  }

  console.log(`Sende Signal an GitHub für den nächsten Durchlauf auf Branch: ${branch}...`);
  
  try {
    const response = await fetch(`https://github.com{repo}/actions/workflows/mover.yml/dispatches`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28'
      },
      body: JSON.stringify({ ref: branch }) // Nutzt jetzt den dynamisch ermittelten Branch
    });

    if (response.ok) {
      console.log("Erfolgreich! Der nächste 10-Sekunden-Block wurde gestartet.");
    } else {
      console.error("Fehler beim Workflow-Trigger:", response.status, await response.text());
    }
  } catch (err) {
    console.error("Netzwerkfehler beim Workflow-Trigger:", err);
  }
}

runSimulation();
