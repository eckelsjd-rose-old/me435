var Gpio = require('onoff').Gpio;

function main() {
    console.log("Ready to use onoff");

    // TODO: Set GPIO14 as an output
    const pinNumber = 8; // GPIO14
    const led = new Gpio(14, 'out');

    for (let k = 0; k < 3; k++) {
        console.log("turn the LED on");
        led.writeSync(1);
        sleep(1);

        console.log("turn the LED off");
        led.writeSync(0);
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