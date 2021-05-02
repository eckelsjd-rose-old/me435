import requests
import time

requests.get("http://eckelsjd-tank.wlan.rose-hulman.edu:3000/api/motor/go/90/90")
time.sleep(2)
requests.get("http://eckelsjd-tank.wlan.rose-hulman.edu:3000/api/motor/stop")