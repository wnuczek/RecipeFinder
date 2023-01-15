from flask import Flask,jsonify,request
from search import get_google_results
from scraper import get_recipe_from_url
from parser import parse_quantity
import json
  
app =   Flask(__name__)
  
@app.route('/scraper', methods = ['GET'])
def scrape():
    url = 'https://kwestiasmaku.com/kuchnia_polska/nalesniki/nalesniki.html'
    url = request.args.get('url')
    if(request.method == 'GET'):
        data = get_recipe_from_url(url)
        quantities = []
        for item in data['ingredients']:
            quantity = parse_quantity(item)
            units = ['gram', 'litre', 'centimetre', 'dimensionless','jajka']
            result = {}
            result['name'] = item
            if len(quantity) > 0:
                result['quantity'] = quantity[0].value
                if quantity[0].unit.name in units:
                    result['unit'] = quantity[0].unit.name
                result['span'] = quantity[0].span
            else:
                quantities.append(None)
            quantities.append(result)

        data['ingredients_parsed'] = quantities


        return jsonify(data)

@app.route('/search', methods = ['GET'])
def search():
    query = request.args.get('query')
    if query == 'nalesniki':
        with open('nalesniki-search.json') as file:
          file_contents = file.read()
        recipe = json.loads(file_contents)
        return jsonify(recipe)

    if query == 'kurczak':
        with open('kurczak-search.json') as file:
          file_contents = file.read()
        recipe = json.loads(file_contents)
        return jsonify(recipe)

    search_results = get_google_results(query)
    url = search_results[0]['link']
    if(request.method == 'GET'):
        data = []
        for (i, result) in enumerate(search_results):
            print('\n\n')
            print(result)
            print('\n\n')
            item = {}
            if 'pagemap' in result:           
              if 'recipe' in result['pagemap']:
                item['key'] = i
                item['title']=result['title']
                item['link']=result['link']
                item['recipe']=result['pagemap']['recipe']
                item['thumbnail']=result['pagemap']['cse_thumbnail']

                
                data.append(item)
        
        response = {}
        response['query'] = query
        response['count'] = len(data)
        response['results'] = data



        return jsonify(response)
  
  
if __name__=='__main__':
    app.run(debug=True)