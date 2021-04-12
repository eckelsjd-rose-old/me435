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

app.listen(3000);