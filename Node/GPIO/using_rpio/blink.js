var rpio = require('rpio');

function main() {
    console.log("Ready to use rpio");

    // TODO: Set GPIO14 as an output
    const pinNumber = 8; // GPIO14
    rpio.open(pinNumber,rpio.OUTPUT,rpio.LOW);

    for (let k = 0; k < 3; k++) {
        console.log("turn the LED on");
        rpio.write(pinNumber,rpio.HIGH);
        rpio.sleep(1);

        console.log("turn the LED off");
        rpio.write(pinNumber,rpio.LOW);
        rpio.sleep(1);
    }

}

function msleep(n) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
 }
 
 function sleep(n) {
    msleep(n * 1000);
 }
 

main();