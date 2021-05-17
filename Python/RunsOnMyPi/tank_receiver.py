import mqtt_helper
import time
import rosebot

class TankReceiver:

    def __init__(self):
        self.mqtt_client = mqtt_helper.MqttClient()
        self.mqtt_client.callback = lambda message_type,payload: self.mqtt_callback(message_type,payload)
        self.mqtt_client.connect(subscription_topic_name="eckelsjd/forPi", publish_topic_name="eckelsjd/forComputer",use_off_campus_broker=True)
        self.robot = rosebot.RoseBot() 

    def mqtt_callback(self,message_type,payload):
        print("MQTT messsage_type", message_type)
        print("MQTT payload", payload)

        if message_type == 'motor/go':
            left_wheel_speed = payload[0]
            right_wheel_speed = payload[1]
            self.robot.drive_system.go(left_wheel_speed,right_wheel_speed)

        if message_type == 'motor/stop':
            self.robot.drive_system.stop()

        if message_type[0:5] == 'servo':
            pin_number = int(message_type[6:])
            self.robot.servos.set_angle(pin_number,payload)

if __name__ == "__main__":
    receiver = TankReceiver()
    while True:
        left = receiver.robot.line.get_left_value()
        middle = receiver.robot.line.get_middle_value()
        right = receiver.robot.line.get_right_value()
        distance = receiver.robot.ultrasonic.get_distance()
        receiver.mqtt_client.send_message('sensor/ultrasonic',distance)
        receiver.mqtt_client.send_message('sensor/line_sensor',[left, middle, right])
        time.sleep(0.1)
