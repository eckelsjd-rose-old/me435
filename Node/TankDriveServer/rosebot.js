const rosebotDriveSystem = require("./rosebotDriveSystem");

// const test = new rosebotDriveSystem.DriveSystem();

class RoseBot {
    constructor() {
        // Motors
        this.driveSystem = new rosebotDriveSystem.DriveSystem();
    }
}

function msleep(n) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
  }
  function sleep(n) {
    msleep(n*1000);
  }

module.exports = {
    RoseBot,
    sleep,
    msleep
}

