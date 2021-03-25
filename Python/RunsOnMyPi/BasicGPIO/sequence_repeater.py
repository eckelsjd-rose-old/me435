import gpiozero as gz
import time
import signal

def handle_color_press(leds,color,arr):
    arr += [color]
    print(arr)
    show_led(leds,color)

def show_led(leds,color):
    if color == "R":
        leds.value = (1,0,0)
    if color == "Y":
        leds.value = (0,1,0)
    if color == "G":
        leds.value = (0,0,1)

def run_sequence(leds,data):
    for color in data:
        show_led(leds,color)
        time.sleep(1)
        leds.off()
        time.sleep(0.1)

    data.clear()

def main():
    print("Ready")
    data = []

    red = gz.Button(22)
    yellow = gz.Button(23)
    green = gz.Button(24)
    play = gz.Button(25)

    leds = gz.LEDBoard(14,15,18)

    red.when_pressed = lambda : handle_color_press(leds, "R",data)
    yellow.when_pressed = lambda : handle_color_press(leds, "Y",data)
    green.when_pressed = lambda : handle_color_press(leds, "G",data)

    red.when_released = leds.off
    yellow.when_released = leds.off
    green.when_released = leds.off

    play.when_pressed = lambda : run_sequence(leds,data)

    signal.pause()

main()