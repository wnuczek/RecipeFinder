import os
from os.path import join, dirname
from dotenv import load_dotenv
import requests

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

google_search_api_key = os.environ.get("google_search_api_key")
google_search_api_id = os.environ.get("google_search_api_id")

def get_page(URL, result='', save=False):
    headers = {
        'User-Agent':
        'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:20.0) Gecko/20100101 Firefox/20.0'
    }
    page = requests.get(URL, headers=headers)
    if save is True:
        filename = URL.replace('/', '_')
        f = open(f'page_{filename}.html', "w")
        f.write(page.text)
        f.close()
    if result == 'json':
        return page.json()
    else:
        return page.text

def get_google_results(query):
    url = f"https://www.googleapis.com/customsearch/v1?key={google_search_api_key}&cx={google_search_api_id}&q={query}"
    page = get_page(url, result='json')

    # f = open(f'google_results_{query}.json', "w")
    # f.write(json.dumps(page,indent=4))
    # f.close()

    if 'items' in page:
        result = page['items']
    else:
        result = None

    return page['items']