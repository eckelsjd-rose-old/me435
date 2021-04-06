import gpiozero as gz
import time

class Motor:
    def __init__(self, pin_1, pin_2, pin_enable):
        self.digital_output_1 = gz.DigitalOutputDevice(pin_1)
        self.digital_output_2 = gz.DigitalOutputDevice(pin_2)
        self.pwm_output = gz.PWMOutputDevice(pin_enable,frequency=1000)

    def turn_on(self,duty_cycle):
        if duty_cycle > 0:
            self.digital_output_1.on()
            self.digital_output_2.off()
            self.pwm_output.value = duty_cycle / 100.0
        
        elif duty_cycle < 0:
            self.digital_output_1.off()
            self.digital_output_2.on()
            self.pwm_output.value = -duty_cycle / 100.0
        else:
            self.turn_off()

    def turn_off(self):
        self.digital_output_1.off()
        self.digital_output_2.off()
        self.pwm_output.value = 0

class DriveSystem:
    def __init__(self):
        Motor_A_EN = 4
        Motor_B_EN = 17
        Motor_A_Pin1 = 14
        Motor_A_Pin2 = 15
        Motor_B_Pin1 = 27
        Motor_B_Pin2 = 18
        self.right_motor = Motor(Motor_A_Pin2,Motor_A_Pin1,Motor_A_EN)
        self.left_motor = Motor(Motor_B_Pin1,Motor_B_Pin2,Motor_B_EN)

    def go(self, left_wheel_speed, right_wheel_speed):
        """ Sets the left and right motor speed -100 to 100 """
        self.left_motor.turn_on(left_wheel_speed)
        self.right_motor.turn_on(right_wheel_speed)

    def stop(self):
        self.left_motor.turn_off()
        self.right_motor.turn_off()

    def go_staight_for_seconds(self,seconds,speed=50):
        self.go(speed,speed)
        time.sleep(seconds)
        self.stop()

    def go_straight_for_inches(self,inches,speed=50):
        self.go(speed,speed)

        if speed < 0:
            speed = -speed
        if inches < 0:
            inches = -inches

        speed_ips = 0.00004*(speed**3) - 0.0087*(speed**2) + 0.7524*(speed) - 10.942 # use Excel data to convert duty cycle to inches/sec
        seconds = inches / speed_ips
        time.sleep(seconds)
        self.stop()

    def spin_in_place_for_seconds(self,seconds,speed=50):
        # left turn (ccw) = negative
       self.go(speed,-speed)
       time.sleep(seconds)
       self.stop()

    def spin_in_place_for_degrees(self,degrees,speed=50):
        speed = abs(speed)
        if degrees > 0:
            self.go(speed,-speed) # positive = cw
        elif degrees < 0:
            self.go(-speed,speed) # negative = ccw
        else:
            pass

        deg_s = 2.009*speed - 62.752 # curve fit PWM to deg/s
        seconds = abs(degrees) / deg_s
        time.sleep(seconds)
        self.stop()

    def turn_for_seconds(self,seconds,speed):
        # negative turns left
        if speed < 0:
            self.go(0,abs(speed))
        # positive turns right
        elif speed > 0:
            self.go(abs(speed),0)
        else:
            pass
        time.sleep(seconds)
        self.stop()

    def turn_for_degrees(self,degrees,speed):
        # negative degrees turns left
        speed = abs(speed)
        if degrees < 0:
            self.go(0,abs(speed))
        elif degrees > 0:
            self.go(abs(speed),0)
        else:
            pass

        deg_s = 0.6204*speed - 11.194 # curve fit PWM to deg_s
        seconds = abs(degrees) / deg_s
        time.sleep(seconds)
        self.stop()


        

# Testing for development
if __name__ == '__main__':


    print("Goodbye")
