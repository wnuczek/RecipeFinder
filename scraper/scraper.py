from recipe_scrapers import scrape_me

def scrape_url(url):
    # give the url as a string, it can be url from any site listed below
    scraper = scrape_me(url)
    return scraper

def print_recipe(recipe):
    print(vars(recipe))

def parse_recipe(url, scraper):
    result = {}
    try:
        result['url'] = url
    except:
        print('Error while setting recipe url')
    try:
        title = scraper.title()
        result['title'] = title
    except:
        print('Error while getting recipe title')
    try: 
        time = scraper.total_time()
        result['time'] = time
    except:
        print('Error while getting recipe time')
    try: 
        yields = scraper.yields()
        result['yields'] = yields
    except:
        print('Error while getting recipe yields')
    try: 
        ingredients = scraper.ingredients()
        result['ingredients'] = ingredients
    except:
        print('Error while getting recipe ingredients')
    try: 
        instructions = scraper.instructions()
        result['instructions'] = instructions
    except:
        print('Error while getting recipe instructions')
    try: 
        image = scraper.image()
        result['image'] = image
    except:
        print('Error while getting recipe image')
    try: 
        host = scraper.host()
        result['host'] = host
    except:
        print('Error while getting recipe host')
    # try: 
    #     links = scraper.links()
    #     result['links'] = links
    # except:
    #     print('Error while getting recipe links')
    try: 
        nutrients = scraper.nutrients()
        result['nutrients'] = nutrients
    except:
        print('Error while getting recipe nutrients')

    return result

def get_recipe_from_url(url):
    scraper = scrape_url(url)
    recipe = parse_recipe(url, scraper)
    return recipe
    

# print(scraper.links())
# url = 'https://www.kwestiasmaku.com/kuchnia_polska/nalesniki/nalesniki.html'


