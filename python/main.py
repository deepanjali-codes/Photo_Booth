from turtle import Turtle, Screen

timmy = Turtle()  # creating object from Turtle class
timmy.shape("turtle")  # changing turtle shape from default shape
timmy.color("red")  # changing turtle color from default colour

# Turtle challenge 1 - Draw a square :
for i in range(0, 4):
    timmy.forward(100)
    timmy.left(90)

# Turtle challenge 2 - Draw a Dashed line :
timmy.penup()
timmy.right(90)
timmy.forward(20)
timmy.left(90)
for i in range(0,10):

    timmy.pendown()
    timmy.forward(10)
    timmy.penup()
    timmy.forward(10)

screen = Screen()  # creating screen object from Screen class
screen.exitonclick()
