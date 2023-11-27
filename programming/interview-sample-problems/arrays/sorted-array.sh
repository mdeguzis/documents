# Create me a simple script that adds several numeric values to an array. 
# output the sorted numbers and unique numbers.
    
numbers=()

numbers+=(1 1 2 3 9 5 2 7 0 5 3 3 2)

# sort the array
sorted=$(for i in "${numbers[@]}"; do echo "$i"; done | sort -n)
echo ${sorted}

# print the unique list sorted
unique=$(for i in "${numbers[@]}"; do echo "$i"; done | sort -n | uniq)
echo ${unique}