import gpiozero as gz
import time
import signal

def main():
    print("Ready")
    # fancy_blink()
    # led_pwm()
    # led_board()

    fancy_traffic_light()

def fancy_blink():
    red = gz.LED(14)
    yellow = gz.LED(15)
    green = gz.LED(18)

    red.blink()

    signal.pause()

def led_pwm():
    red = gz.PWMLED(14)
    yellow = gz.PWMLED(15)
    green = gz.PWMLED(18)

    while True:
        for k in range(10):
            red.value = k /10
            time.sleep(0.5)

def led_board():
    leds = gz.LEDBoard(14,15,18)

    leds.on()
    time.sleep(2)
    leds.off()
    time.sleep(2)
    leds.value = (1,0,1)
    time.sleep(2)
    leds.blink()

    signal.pause()

def fancy_traffic_light():
    # turn green on 5, yellow 1, red 3
    lights = gz.TrafficLights(14,15,18)
    lights.green.on()

    while True:
        time.sleep(5)
        lights.green.off()
        lights.amber.on()
        time.sleep(1)
        lights.amber.off()
        lights.red.on()
        time.sleep(3)
        lights.red.off()
        lights.green.on()





main()