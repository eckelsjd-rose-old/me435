import adafruit_servokit
from numpy import interp

class RosebotServos:
    def __init__(self):
        self.kit = adafruit_servokit.ServoKit(channels=16)
        self.camera_range = [115, 30] # maps to [0 45]
        self.joint1_range = [180, 0] # maps to [-90 90]
        self.joint2_range = [0, 170] # maps to [-90 90]
        self.joint3_range = [0, 180] # maps to [-90 90]
        self.gripper_range = [50, 0] # maps to [0, 1.5] in

    # takes in DH angles, convert them here based on hardware offsets
    def set_angle(self,servo_pin,angle):
        real_angle = 0
        if (servo_pin == 11):
            # camera servo
            real_angle = interp(angle,[0, 45],self.camera_range)

        elif (servo_pin == 12):
            # Joint 1
            real_angle = interp(angle,[-90, 45],self.joint1_range)

        elif (servo_pin == 13):
            # Joint 2
            real_angle = interp(angle,[-90, 90],self.joint2_range)
        
        elif (servo_pin == 14):
            # Joint 3
            real_angle = interp(angle,[-90, 90],self.joint3_range)

        elif (servo_pin == 15):
            # Gripper servo
            real_angle = interp(angle,[0, 1.5],self.gripper_range)
        else:
            print("Wrong pin provided")

        self.kit.servo[servo_pin].angle = real_angle

# Testing for development
if __name__ == '__main__':
    print("Goodbye")
