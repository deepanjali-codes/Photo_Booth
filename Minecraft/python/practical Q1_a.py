
from datetime import datetime

name = input("enter your name : ")
age=int(input("Enter your age :"))

current_year = datetime.now().year

year_turn_100 = current_year +(100 -age)

print (f"Hello {name}! The year you will turn 100 years old: {year_turn_100}")



