from gpiozero import DistanceSensor
from gpiozero import LineSensor

class UltrasonicSensor:
    def __init__(self):
        self.echo_pin = 8
        self.trigger_pin = 11
        self.sensor = DistanceSensor(echo=self.echo_pin,trigger=self.trigger_pin)

    # return distance in cm
    def get_distance(self):
        return self.sensor.distance*100

class LineSensors:
    def __init__(self):
        self.left_line = LineSensor(20)
        self.middle_line = LineSensor(16)
        self.right_line = LineSensor(19)

    def get_average_value(self):
        return (self.left_line.value + self.middle_line.value + self.right_line.value)/3

    def get_left_value(self):
        return self.left_line.value

    def get_middle_value(self):
        return self.middle_line.value

# Testing for development
if __name__ == '__main__':
    print("Goodbye")