# print("PyThOn123".swapcase()[::-1])

# Functions & Recursions

# def outer_function():
#     message = "I'm outer"
#     def inner_function():
#         nonlocal message
#         message = "I was changed nonlocally"
#         print("Inside inner function:",message)

#         inner_function()
#         print("Inside outer function:",message)
#     outer_function()

# x = 25
# print("first variable x",x)
# def hello():
#     global x 
#     x = 25
#     return x
# print(hello())
# print(x)

# def maximum_num (val1,val2,val3):
#     if val2>=val1 and val2>=val3:
#         print(val1,"is the greatest number")
#     elif val2>=val1 and val2>=val3:
#         print(val3,"is the greatest number.")
#     else:
#         print(val3,"is the greatest number.")

# def sum_natural(n):
#     if n==0:
#         return 0
#     return n + sum_natural(n - 1)
# print(sum_natural(6))


# Import 

# import datetime
# a = datetime.datetime.now()
# print(a)

# y = datetime.datetime(1997,10,14)
# print(y)
# print(y.strftime("%A")) # for full spelling of days
# print(y.strftime("%a")) # for short form of days
# print(y.strftime("%B")) # for years in full words 
# print(y.strftime("%b")) # for years in short forms
# print(y.strftime("%m")) # for months in numbers
# print(y.strftime("%Y")) # to show years
# print(y.strftime("%y")) # to show last two digits of year


# import random
# x = random.randint(1,100)
# print(x)

# y = ["heads","tails"]
# x = random.choice(y)
# print(x)

# File I/O

