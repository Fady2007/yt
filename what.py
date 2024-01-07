import random
import pyautogui as pg
import time

ls = ["mama", ".."]
time.sleep(1)
pg.hotkey("win")
pg.typewrite("a")
for i in range(12):
    pg.press("backspace")
time.sleep(1)
pg.typewrite("whatsapp")
pg.press("enter")
time.sleep(1)

for i in range(16):
    pg.press("backspace")
time.sleep(1)
pg.typewrite("201276001655")
time.sleep(4)
pg.press("tab")
pg.press("enter")

time.sleep(2)
for i in range(2):
    a = random.choice(ls)
    pg.typewrite(a)
    time.sleep(1)
    pg.press("enter")
