const Gpio = require("pigpio").Gpio;

class Motor {
    constructor(pin1, pin2, pinEnable) {
        this.digitalOutput1 = new Gpio(pin1, {mode: Gpio.OUTPUT});
        this.digitalOutput2 = new Gpio(pin2, {mode: Gpio.OUTPUT});
        this.pwmOutput = new Gpio(pinEnable, {mode: Gpio.OUTPUT});
    }

    turnOn(dutyCycle) {
        // dutyCycle = -100 to 100
        // scale -100<=>100 to be -255<->255 for pigpio
        dutyCycle = Math.round(dutyCycle * 255 / 100);
        console.log("scaled DutyCycle = ", dutyCycle);

        if (dutyCycle > 0) {
            this.digitalOutput1.digitalWrite(1);
            this.digitalOutput2.digitalWrite(0);
            this.pwmOutput.pwmWrite(dutyCycle);
        } else if (dutyCycle < 0) {
            this.digitalOutput1.digitalWrite(0);
            this.digitalOutput2.digitalWrite(1);
            this.pwmOutput.pwmWrite(-dutyCycle);
        } else {
            this.turnOff();
        }

    }

    turnOff() {
        this.digitalOutput1.digitalWrite(0);
        this.digitalOutput2.digitalWrite(0);
        this.pwmOutput.pwmWrite(0);
    }
}

class DriveSystem {
    constructor() {
        const Motor_A_EN = 4;
        const Motor_B_EN = 17; // no hardware PWM
        const Motor_A_Pin1 = 14;
        const Motor_A_Pin2 = 15;
        const Motor_B_Pin1 = 27;
        const Motor_B_Pin2 = 18;
        this.leftMotor = new Motor(Motor_B_Pin1,Motor_B_Pin2,Motor_B_EN);
        this.rightMotor = new Motor(Motor_A_Pin2,Motor_A_Pin1,Motor_A_EN);
    }

    go(leftSpeed, rightSpeed) {
        this.leftMotor.turnOn(leftSpeed);
        this.rightMotor.turnOn(rightSpeed);
    }

    stop() {
        this.leftMotor.turnOff();
        this.rightMotor.turnOff();
    }
}

module.exports = {
    DriveSystem
}