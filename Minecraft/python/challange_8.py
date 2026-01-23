from turtle import Turtle, Screen
import random


def draw_line():
    timmy = Turtle()
    timmy.penup()
    timmy.hideturtle()
    timmy.goto(x=250,y=-200)
    timmy.left(90)
    timmy.pendown()
    timmy.pensize(10)
    timmy.forward(400)


is_race_on = False
color = ["red", "orange", "yellow", "green", "blue", "indigo"]
screen = Screen()
screen.setup(width=550, height=400)
user_guess = screen.textinput(title="Turtle Racing Game ", prompt="which turtle will win the race? Enter a color: ")
all_turtle = []
y_cor = -100
for i in range(6):
    new_turtle = Turtle()
    all_turtle.append(new_turtle)
    new_turtle.shape("turtle")
    new_turtle.color(color[i])
    new_turtle.penup()
    new_turtle.goto(x=-230, y=y_cor)
    y_cor += 50
draw_line()

if type(user_guess) == str:
    is_race_on = True

while is_race_on:
    for turtle in all_turtle:
        if turtle.xcor() > 230:
            winning_color = turtle.pencolor()
            if winning_color == user_guess:
                print(f"you've won ! the {winning_color} color turtle is the winner")
            else:
                print(f"you've lost !! the {winning_color} color turtle is the winner")
            is_race_on = False

        random_distance = random.randint(0, 10)
        turtle.forward(random_distance)

screen.exitonclick()
