const express = require("express");
const Gpio = require("pigpio").Gpio;

const app = express(); // make web server
app.use("/", express.static("public")); // serve the public folder

// Pin setup on Raspberry pi
const red_led = new Gpio(14, {mode: Gpio.OUTPUT});
const yellow_led = new Gpio(15, {mode: Gpio.OUTPUT});
const green_led = new Gpio(18, {mode: Gpio.OUTPUT});
const pushbutton = new Gpio(25, {mode: Gpio.INPUT, pullUpDown: Gpio.PUD_UP});
const serv = new Gpio(13, {mode: Gpio.OUTPUT}); // PWM
const motor = new Gpio(12, {mode: Gpio.OUTPUT}); // PWM
const ctrl1 = new Gpio(20, {mode: Gpio.OUTPUT});
const ctrl2 = new Gpio(21, {mode: Gpio.OUTPUT});

function setLed(color, value) {
    if (color == "r") {
        red_led.digitalWrite(value);
    }
    if (color == "y") {
        yellow_led.digitalWrite(value);
    }
    if (color == "g") {
        green_led.digitalWrite(value);
    }
}

function setServo(value) {
    serv.servoWrite(value);
}

function setMotor(value) {
    console.log("Value: " + typeof(value));
    if (value < 0 ) {
        ctrl1.digitalWrite(1);
        ctrl2.digitalWrite(0);
        motor.analogWrite(Math.abs(value));
    }
    if (value >= 0 ) {
        ctrl1.digitalWrite(0);
        ctrl2.digitalWrite(1);
        motor.analogWrite(Math.abs(value));
    }
}

app.get("/hello",(req, res) => {
    res.json({
        status: "ok"
    });
});

app.get("/api/ledon/:color", (req, res) => {
    const color = req.params.color;
    console.log("Turn the LED On for " + color);
    setLed(color,1);
    res.json({
        status: "ok"
    });
});

// :color is argument
app.get("/api/ledoff/:color", (req, res) => {
    const color = req.params.color;
    console.log("Turn the LED Off for " + color);
    setLed(color,0);
    res.json({
        status: "ok"
    });
});

app.get("/api/read", (req, res) => {
    console.log("Returns the value of the pushbutton");
    res.json({
        isHigh: pushbutton.digitalRead()
    });
});

app.get("/api/servo/:value", (req,res) => {
    const value = req.params.value;
    console.log("Value received: " + value);
    setServo(parseInt(value));
    res.json({
        status: "ok"
    });
});

app.get("/api/motor/:value", (req,res) => {
    const value = req.params.value;
    console.log("Value received: " + value);
    setMotor(parseInt(value));
    res.json({
        status: "ok"
    });
})

app.listen(3000);