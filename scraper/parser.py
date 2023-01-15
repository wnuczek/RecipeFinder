from quantulum3 import parser

def parse_quantity(string):
    quants = parser.parse(string)
    print(quants)
    return quants

# quants = parser.parse('I want 2 liters of wine')

# print(quants)