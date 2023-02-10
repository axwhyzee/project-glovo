from bs4 import BeautifulSoup
import requests
import json

terms = ['political', 'tech', 'business','sports', 'life']
headline = {}
content = {}
date = {}
genre = {}
url ={}
k = 1

with open('glovoYahoo.json', 'w') as file:
  file.write("[\n")
  for j in range(len(terms)):
    u = 'https://news.search.yahoo.com/search?q={}'.format(terms[j])
    response = requests.get(u)
    soup = BeautifulSoup(response.text, 'html.parser')

    for news_item in soup.find_all('div', class_='NewsArticle'):

        genre[k] = terms[j]

        title = news_item.find('h4').text
        headline[k] = title

        l = news_item.find("a")
        url[k] = l['href']


        cont = news_item.find('p').text
        content[k] = cont

        """rep = requests.get(url[k])
        broth = BeautifulSoup(rep.text, 'html.parser')
        story = []
        for temp in broth.find_all('div', class_='caas-body'):
          story = story.append(temp.find('p').text)
        #cont = content.replace('·', '').strip()
        content[k] = story"""

        time = news_item.find('span', class_='fc-2nd').text
        # Clean time text
        time = time.replace('·', '').strip()
        date[k] = time

        print(k)
        print(genre[k])
        print("{} ({})".format(headline[k], date[k]))
        print(url[k])
        print(content[k])
        

        output_dict = {"URL": url[k], "Title": headline[k], "Genre": genre[k], "Date": date[k], "Content": content[k]}
        json.dump(output_dict, file)
        file.write(", \n")
        file.write("]\n")

        k=k+1
  file.close()