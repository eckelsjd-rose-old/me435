function main() {
    console.log("Ready");

    // TODO: Set GPIO14 as an output

    for (let k = 0; k < 3; k++) {
        console.log("turn the LED on");
        sleep(1);

        console.log("turn the LED off");
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