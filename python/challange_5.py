# draw a spirograph
import random
import turtle
from turtle import Turtle, Screen

turtle.colormode(255)


def random_color():
    r = random.randint(0, 255)
    g = random.randint(0, 255)
    b = random.randint(0, 255)
    return (r, g, b)


timmy = Turtle()
timmy.speed("fastest")
for i in range(500):
    timmy.color(random_color())
    timmy.circle(100)
    timmy.left(5)



screen = Screen()
screen.exitonclick()
