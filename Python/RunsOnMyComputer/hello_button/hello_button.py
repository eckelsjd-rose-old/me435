from kivymd.app import MDApp
from kivy.core.window import Window

class HelloButtonApp(MDApp):

    def build(self):
        # Done in magic .kv file HelloButtonApp --> hellobutton.kv
        Window.size = (400, 300)
        return  


if __name__ == '__main__':
    HelloButtonApp().run()