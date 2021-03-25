import gpiozero as gz
import time
import signal

def read_button_state():
    button = gz.Button(25)
    led = gz.LED(14)
    while True:
        if button.is_pressed:
            # print("Button is pressed")
            led.on()

        else:
            # print("Button is not pressed")
            led.off()
        time.sleep(0.1)

def button_interrupts():
    button = gz.Button(25)
    button.when_pressed = lambda : say_message("Press")
    button.when_released = lambda : say_message("Released")
    signal.pause()

def say_hello():
    print("Hello!")

def say_message(message):
    print("Message: ", message)

def main():
    print("Ready")
    # read_button_state()
    button_interrupts()


main()