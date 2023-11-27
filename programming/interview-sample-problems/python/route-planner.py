"""
Create me a basic Python program that gives me the best route to a made up music concert 10 miles away. The program should have a basic function that takes options: highway, no-tools, and train. Each of these options can get me there at a different time, but not all leave at the same time.

highway
highway-no-tolls
train
uber

Imagine:
"How long to get to my concert if I take the train? What about the highway?"

The program should have a menu that allows the user to choose an option. If the user chooses highway, the program should print something such as "Take the highway. Estimated time: 20 minutes. Each option should print something. The last option is to exit. Each option will tell the user how long it will take to get there.
"""

def get_best_route(option):
    if option == "highway":
        return "Take the highway. Estimated time: 20 minutes."
    elif option == "highway-no-tolls":
        return "Choose the route with no tolls. Estimated time: 25 minutes."
    elif option == "train":
        return "Take the train. Estimated time: 30 minutes."
    elif option == "uber":
        return "Take uber (have to wait for pickup). Estimated time: 35 minutes."

if __name__ == "__main__":
    print("Welcome to the Concert Route Planner!")
    
    while True:
        print("\nChoose your transportation option:")
        print("1. Highway")
        print("2. Highway No tolls")
        print("3. Uber")
        print("4. Train")
        print("5. Exit")

        choice = input("Enter the number of your choice: ")

        if choice == "1":
            route = get_best_route("highway")
            print(route)
        elif choice == "2":
            route = get_best_route("highway-no-tolls")
            print(route)
        elif choice == "3":
            route = get_best_route("uber")
            print(route)
        elif choice == "4":
            route = get_best_route("train")
            print(route)
        elif choice == "5":
            print("Exiting the Concert Route Planner. Have a great time at the concert!")
            break
        else:
            print("Invalid choice. Please enter a number between 1 and 4.")