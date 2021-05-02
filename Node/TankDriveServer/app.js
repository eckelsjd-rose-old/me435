const express = require("express");
const rosebot = require("./rosebot");

const app = express(); // make web server
app.use("/", express.static("public")); // serve the public folder
const robot = new rosebot.RoseBot();

app.get("/api/motor/go/:leftWheelSpeed/:rightWheelSpeed", (req, res) => {
    const leftWheelSpeed = parseInt(req.params.leftWheelSpeed);
    const rightWheelSpeed = parseInt(req.params.rightWheelSpeed);
    robot.driveSystem.go(leftWheelSpeed,rightWheelSpeed);
    res.json({
        status: "ok",
        leftWheelSpeed: leftWheelSpeed,
        rightWheelSpeed: rightWheelSpeed
    });
});

app.get("/api/motor/stop",(req,res) => {
    robot.driveSystem.stop();
    res.json({
        status: "ok"
    });
});

app.get("/api/servo/arm_pw/:jointNumber/:pulseWidth",(req,res) => {
    const jointNumber = parseInt(req.params.jointNumber);
    const pulseWidth = parseInt(req.params.pulseWidth);
    robot.armServos.setPulseWidth(jointNumber,pulseWidth);
    res.json({
        status: "ok"
    });
});

app.get("/api/servo/gripper_pw/:pulseWidth",(req,res) => {
    const pulseWidth = parseInt(req.params.pulseWidth);
    robot.gripperServo.setPulseWidth(pulseWidth);
    res.json({
        status: "ok"
    });
});

app.get("/api/servo/camera_pw/:pulseWidth",(req,res) => {
    const pulseWidth = parseInt(req.params.pulseWidth);
    robot.cameraServo.setPulseWidth(pulseWidth);
    res.json({
        status: "ok"
    });
});

app.listen(3000);