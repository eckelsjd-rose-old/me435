import gpiozero as gz
import time
import signal

count = 0
red = gz.LED(14)
yellow = gz.LED(15)
green = gz.LED(18)

def update_leds():
    global count
    global red
    global yellow
    global green

    bin_str = format(count,'08b')
    red_state = int(bin_str[5])
    yellow_state = int(bin_str[6])
    green_state = int(bin_str[7])

    red.on() if red_state else red.off()
    yellow.on() if yellow_state else yellow.off()
    green.on() if green_state else green.off()


def handle_counter():
    global count
    count += 1
    print(f'Count = {count}')
    update_leds()

def handle_reset():
    global count
    count = 0
    print(f'Count = {count}')
    update_leds()

def main():
    print("Starting binary counter")

    counter = gz.Button(22) # by the red led
    reset = gz.Button(25) # play button

    counter.when_pressed = lambda : handle_counter()
    reset.when_pressed = lambda : handle_reset()
    signal.pause()

if __name__ == '__main__':
    main()