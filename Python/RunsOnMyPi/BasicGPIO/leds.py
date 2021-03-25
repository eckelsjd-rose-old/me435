import gpiozero as gz
import time

def main():
    print("Ready")
    # basic_led_on_off()
    # manual_blink()
    manual_traffic_light()

def basic_led_on_off():
    red = gz.LED(14)
    yellow = gz.LED(15)
    green = gz.LED(18)

    red.on()
    yellow.on()
    green.on()

    time.sleep(3)
    print("Goodbye")

def manual_blink():
    red = gz.LED(14)
    yellow = gz.LED(15)
    green = gz.LED(18)

    for k in range(5):
        red.on()
        yellow.on()
        green.on()
        time.sleep(1)
        red.off()
        yellow.off()
        green.off()
        time.sleep(1)

def manual_traffic_light():

    # loop forever green=5, yellow=1, red=5
    red = gz.LED(14)
    yellow = gz.LED(15)
    green = gz.LED(18)

    while True:
        red.on()
        yellow.off()
        green.off()
        time.sleep(5)

        green.on()
        red.off()
        time.sleep(5)

        green.off()
        yellow.on()
        time.sleep(1)




main()