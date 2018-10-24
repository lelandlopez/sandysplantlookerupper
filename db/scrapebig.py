from bs4 import BeautifulSoup
import urllib.request
import csv

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

url = "http://www.starrenvironmental.com/images/"

content = urllib.request.urlopen(url)

soup = BeautifulSoup(content, "lxml")

trs = soup.find_all('tr')

start = 2000 
numFiles = 5000

driver = webdriver.Firefox()

arr = []
images = []
for idx, row in enumerate(trs):
  if idx > start:
    print(idx)
    tds = row.find_all('td')
    if tds[0].find('a') is not None:
      link = tds[0].find('a').get('href')
      name = tds[0].find('a').get_text()
      common_name = tds[1].get_text()
      family = tds[2].find('a').get_text()
      u = url + link
      driver.get(u)
      desc = ''
      try:
        element = WebDriverWait(driver, 2).until(
          EC.presence_of_element_located((By.ID, "flickr_images"))
        )
        soup = BeautifulSoup(driver.page_source, "lxml")
        desc = soup.find("div", class_='page_title_detail').get_text()
        imgs = soup.find_all("img", class_='image_inserted')
        for i in imgs:
          src = i.get('src')
          title = i.get('title')
          images.append([idx, src, title])
      finally:
        print('asdfasdf')
      arr.append([idx, u,  name, common_name, family, desc])
    if idx == numFiles:
      break

with open('names.csv', 'a', newline='') as csvfile:
    spamwriter = csv.writer(csvfile)
    for r in arr:
      spamwriter.writerow(r)

with open('images.csv', 'a', newline='') as csvfile:
    spamwriter = csv.writer(csvfile)
    for r in images:
      spamwriter.writerow(r)

driver.close()
