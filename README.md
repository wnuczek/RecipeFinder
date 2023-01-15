<h1 style="color: #920918; text-align: center; font-weight: bold; text-transform: uppercase;">Recipe Finder</h1>
<h2 style="text-align: center; font-weight: bold; text-transform: uppercase;">Find & scale cooking recipes</h2>

## Idea

- User enters one or more ingredients,
- Server returns list of matching recipes,
- User selects wanted recipe
- Ingredients amounts are calculated based on input amount or wanted portions (if portion info in recipe)

## Screenshots

![iOS screenshots](screenshots_ios.png "iOS screenshots")

## Details

- API
  - how to find matching recipes
    - google it on supported websites
    - scrape selected website
    - build cached recipe database while scraping (WIP)

## Dependencies

- recipe scraping: [https://github.com/hhursev/recipe-scrapers]

## Limitations

- google search api free plan has a daily quota of 100 requests

## Disclaimers

- this project is made for educational purposes
- all data presented by this app scraped from the web
