const Gpio = require('pigpio').Gpio;

function main() {
    let ledState = 0;
    console.log("Ready using pigpio");

    // TODO: Set GPIO14 as an output
    const pinNumber = 14; // GPIO14
    const led = new Gpio(pinNumber, {mode: Gpio.OUTPUT});
    const pushbutton = new Gpio(25, {mode: Gpio.INPUT,
        pullUpDown: Gpio.PUD_UP,
        edge:Gpio.FALLING_EDGE
    });
    pushbutton.glitchFilter(20000); // debounce 20000 useconds
    pushbutton.on('interrupt', (level,tick) => {
        console.log("Button pressed");
        led.digitalWrite(ledState);
        ledState ^= 1;
    });

    console.log("Program over.");

}

function msleep(n) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
 }
 
 function sleep(n) {
    msleep(n * 1000);
 }
 

main();