const Gpio = require('pigpio').Gpio;

function main() {
    console.log("Ready using pigpio");

    // TODO: Set GPIO14 as an output
    const pinNumber = 14; // GPIO14
    const led = new Gpio(pinNumber, {mode: Gpio.OUTPUT})

    for (let k = 0; k < 3; k++) {
        console.log("turn the LED on");
        led.digitalWrite(1);
        sleep(1);

        console.log("turn the LED off");
        led.digitalWrite(0);
        sleep(1);
    }

}

function msleep(n) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
 }
 
 function sleep(n) {
    msleep(n * 1000);
 }
 

main();