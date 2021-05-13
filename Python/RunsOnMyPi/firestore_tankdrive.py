import time
import json
import rosebot

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import threading

class PiTank:
    def __init__(self):
        self.robot = rosebot.RoseBot()
        cred = credentials.Certificate('tankDriveAccountKey.json')
        firebase_admin.initialize_app(cred)
        self.db = firestore.client()
        self.add_snapshot_listener()

    def add_snapshot_listener(self):
        self.callback_done = threading.Event()
        ref = self.db.collection(u'Commands').document(u'command')
        ref.on_snapshot(lambda docs, changes, read_time: self.on_snapshot(docs))

    def on_snapshot(self,docs):
        for doc in docs:
            if doc.exists:
                doc_data = doc.to_dict()
                print(f'Data: {doc_data}')
                message_type = doc_data.get("type")
                payload = doc_data.get("payload")
                if payload is not None:
                    payload = json.loads(payload)
                self.handle_message(message_type,payload)

        self.callback_done.set()

    def handle_message(self,message_type,payload):
        if message_type == "motor/go":
            left_wheel_speed = payload[0]
            right_wheel_speed = payload[1]
            self.robot.drive_system.go(left_wheel_speed,right_wheel_speed)
        elif message_type == "motor/stop":
            self.robot.drive_system.stop()

if __name__ == '__main__':
    PiTank()

    while True:
        time.sleep(0.01)