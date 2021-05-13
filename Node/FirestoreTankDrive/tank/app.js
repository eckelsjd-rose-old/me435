const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const rosebot = require("./rosebot");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const robot = new rosebot.RoseBot();

// TODO: Make a ref to the document
const ref = db.collection("Commands").doc("command");

// TODO: Listen for real time updates
ref.onSnapshot((docSnapshot) => {
    console.log(`Received doc snapshot: ${docSnapshot}`);

    if (docSnapshot.exists) {
        console.log(`Received doc snapshot:`, docSnapshot.data());

        const message_type = docSnapshot.get("type");
        let payload = docSnapshot.get("payload");
        if (payload) {
            payload = JSON.parse(payload);
        }
        console.log('payload :>> ', payload);
        handleMessage(message_type,payload);

    } else {
        console.log(`Document missing!`);
    }
} , (err) => {
    console.log(`Encountered error: ${err}`);
} );

// TODO: Parse the response and do it
function handleMessage(message_type, payload) {
    if (message_type == "motor/go") {
        const leftWheelSpeed = payload[0];
        const rightWheelSpeed = payload[1];
        robot.driveSystem.go(leftWheelSpeed,rightWheelSpeed);
    } else if (message_type == "motor/stop") {
        robot.driveSystem.stop();
    }
}