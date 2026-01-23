import turtle
from turtle import Turtle, Screen
import random

timmy = Turtle()
turtle.colormode(255)


def random_color():
    r = random.randint(0, 255)
    g = random.randint(0, 255)
    b = random.randint(0, 255)
    return (r, g, b)


# color = ["red", "blue", "orange", "coral", "yellow", "black", "purple", ]
direction = [0, 90, 180, 270]
timmy.pensize(15)
timmy.speed("fastest")
for i in range(200):
    timmy.color(random_color())
    timmy.forward(30)
    timmy.setheading(random.choice(direction))

my_screen = Screen()
my_screen.exitonclick()
