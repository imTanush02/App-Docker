def get_data():
    with open('names.txt', 'r') as f:
        data = f.read().splitlines()
    return data