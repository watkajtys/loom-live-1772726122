import sys
from playwright.sync_api import sync_playwright

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("http://localhost:5173/?view=feed")
        page.screenshot(path="screenshot_feed.png")
        browser.close()

if __name__ == "__main__":
    main()
