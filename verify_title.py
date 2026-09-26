import time
import subprocess
from playwright.sync_api import sync_playwright

def verify():
    server = subprocess.Popen(["npx", "vite", "preview", "--port", "4173"], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    time.sleep(2)
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch()
            page = browser.new_page(viewport={'width': 1280, 'height': 720})
            page.goto('http://localhost:4173/Watch-Bearer/')
            page.wait_for_selector('.game-title')
            page.wait_for_timeout(1000)
            page.screenshot(path='title_screen.png')
            browser.close()
    finally:
        server.terminate()

if __name__ == "__main__":
    verify()
