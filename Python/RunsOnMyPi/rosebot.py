import rosebot_drive_system
import rosebot_servos
import rosebot_sensors

class RoseBot:
    def __init__(self):
        self.drive_system = rosebot_drive_system.DriveSystem()
        self.servos = rosebot_servos.RosebotServos()
        self.ultrasonic = rosebot_sensors.UltrasonicSensor()
        self.line = rosebot_sensors.LineSensors()