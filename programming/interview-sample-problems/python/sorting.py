# Create me a function takes a dictionary JSON input and sorts based on a specific key

def sort_dict_by_key(input_dict, key, reverse=False):
    return sorted(input_dict, key=lambda x: x[key], reverse=reverse)

# Sample data
products = [
    {"product": "apples", "aisle": "13"},
    {"product": "chips", "aisle": "10"},
    {"product": "salsa", "aisle": "10"},
    {"product": "milk", "aisle": "7"},
    {"product": "cake", "aisle": "2"},
]

# Sort the data by aisle
for x in sort_dict_by_key(products, "aisle"):
    print(x)

print()

# Sort the data by aisle in reverse order
for x in sort_dict_by_key(products, "aisle", True):
    print(x)