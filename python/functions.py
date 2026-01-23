# to seperate logics and perform the same task multiple times without rewriting the code.

#function definition
def greet(name):
    return f"Hello, {name}!"

#function call
print(greet("Alice"))  


#Quick tip: Use functions to break down complex problems into smaller, manageable parts.
#Quick Quiz
def goodbye(name, message):
 print(" Goodbye, " + name + "!")
 print(message)
 return #function return value is None by default
a = goodbye("Bob", "Thanks for using functions!")
print(a)


