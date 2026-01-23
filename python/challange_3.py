from turtle import Turtle, Screen
import random

timmy = Turtle()  # creating object from Turtle class
timmy.shape("turtle")  # changing turtle shape from default shape
color = ["red","blue","orange","coral","yellow","black","purple",]
timmy.pensize(20)
num = 3
while num < 11:
    timmy.color(random.choice(color))
    for i in range(0,num):
        angle = 360/num
        timmy.forward(100)
        timmy.left(angle)
    num+=1


my_screen = Screen()
my_screen.exitonclick()