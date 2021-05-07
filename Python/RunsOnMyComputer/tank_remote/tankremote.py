from kivymd.app import MDApp
from kivy.core.window import Window
from kivy.properties import StringProperty
import mqtt_helper

class TankRemoteApp(MDApp):

    ultrasonic_text = StringProperty("???")
    line_sensor_text = StringProperty("???") 

    def __init__(self,**kwargs):
        super(TankRemoteApp, self).__init__(**kwargs)
        self.mqtt_client = mqtt_helper.MqttClient()
        self.mqtt_client.callback = lambda message_type,payload: self.mqtt_callback(message_type,payload)
        self.mqtt_client.connect(subscription_topic_name="eckelsjd/forComputer", publish_topic_name="eckelsjd/forPi")

    def mqtt_callback(self,message_type,payload):
        print("MQTT messsage_type", message_type)
        print("MQTT payload", payload)

        if message_type == "sensor/ultrasonic":
            self.ultrasonic_text = f'Value = {round(payload,3)}'

        if message_type == "sensor/line_sensor":
            self.line_sensor_text = f'Value = {payload}'

    def build(self):
        # Done in magic .kv file HelloButtonApp --> hellobutton.kv
        self.theme_cls.primary_palette = "BlueGray"
        Window.size = (400, 600)
        return  


if __name__ == '__main__':
    TankRemoteApp().run()