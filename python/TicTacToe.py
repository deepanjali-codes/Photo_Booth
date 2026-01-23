import tkinter
from tkinter import messagebox
from tkinter import *

button_width = 12
button_height = 8
button_background = 'black'
screen = tkinter.Tk()
clicked = True
count = 0


# disabled all button :
def disable_all_buttons():
    if winner:
        button_1.config(state=DISABLED)
        button_2.config(state=DISABLED)
        button_3.config(state=DISABLED)
        button_4.config(state=DISABLED)
        button_5.config(state=DISABLED)
        button_6.config(state=DISABLED)
        button_7.config(state=DISABLED)
        button_8.config(state=DISABLED)
        button_9.config(state=DISABLED)


def check_if_won():
    global winner
    winner = False
    if button_1['text'] == 'X' and button_2['text'] == 'X' and button_3['text'] == 'X':
        button_1.configure(background='powderblue')
        button_2.configure(background='powderblue')
        button_3.configure(background='powderblue')
        messagebox.showinfo(title='Tic Tac Toe', message="x is the winner. ")
        winner = True
        disable_all_buttons()
    elif button_4['text'] == 'X' and button_5['text'] == 'X' and button_6['text'] == 'X':
        button_4.configure(background='powderblue')
        button_5.configure(background='powderblue')
        button_6.configure(background='powderblue')
        messagebox.showinfo(title='Tic Tac Toe', message="x is the winner. ")
        winner = True
        disable_all_buttons()
    elif button_7['text'] == 'X' and button_8['text'] == 'X' and button_9['text'] == 'X':
        button_7.configure(background='powderblue')
        button_8.configure(background='powderblue')
        button_9.configure(background='powderblue')
        messagebox.showinfo(title='Tic Tac Toe', message="x is the winner. ")
        winner = True
        disable_all_buttons()
    elif button_1['text'] == 'O' and button_2['text'] == 'O' and button_3['text'] == '0':
        button_1.configure(background='powderblue')
        button_2.configure(background='powderblue')
        button_3.configure(background='powderblue')
        messagebox.showinfo(title='Tic Tac Toe', message=f"O is the winner. ")
        winner = True
        disable_all_buttons()
    elif button_4['text'] == 'O' and button_5['text'] == 'O' and button_6['text'] == 'O':
        button_4.configure(background='powderblue')
        button_5.configure(background='powderblue')
        button_6.configure(background='powderblue')
        messagebox.showinfo(title='Tic Tac Toe', message=f"O is the winner. ")
        winner = True
        disable_all_buttons()
    elif button_7['text'] == 'O' and button_8['text'] == 'O' and button_9['text'] == 'X':
        button_7.configure(background='powderblue')
        button_8.configure(background='powderblue')
        button_9.configure(background='powderblue')
        messagebox.showinfo(title='Tic Tac Toe', message=f"O is the winner. ")
        winner = True
        disable_all_buttons()
    # -------------------------------------------------------------------------------------------------#
    # -------------------------------------------------------------------------------------------------#
    elif button_1['text'] == 'X' and button_4['text'] == 'X' and button_7['text'] == 'X':
        button_1.configure(background='powderblue')
        button_4.configure(background='powderblue')
        button_7.configure(background='powderblue')
        messagebox.showinfo(title='Tic Tac Toe', message="x is the winner. ")
        winner = True
        disable_all_buttons()
    elif button_2['text'] == 'X' and button_5['text'] == 'X' and button_8['text'] == 'X':
        button_2.configure(background='powderblue')
        button_5.configure(background='powderblue')
        button_8.configure(background='powderblue')
        messagebox.showinfo(title='Tic Tac Toe', message="x is the winner. ")
        winner = True
        disable_all_buttons()
    elif button_3['text'] == 'X' and button_6['text'] == 'X' and button_9['text'] == 'X':
        button_3.configure(background='powderblue')
        button_6.configure(background='powderblue')
        button_9.configure(background='powderblue')
        messagebox.showinfo(title='Tic Tac Toe', message="x is the winner. ")
        winner = True
        disable_all_buttons()
    elif button_1['text'] == 'O' and button_4['text'] == 'O' and button_7['text'] == '0':
        button_1.configure(background='powderblue')
        button_4.configure(background='powderblue')
        button_7.configure(background='powderblue')
        messagebox.showinfo(title='Tic Tac Toe', message=f"O is the winner. ")
        winner = True
        disable_all_buttons()
    elif button_2['text'] == 'O' and button_5['text'] == 'O' and button_8['text'] == 'O':
        button_2.configure(background='powderblue')
        button_5.configure(background='powderblue')
        button_8.configure(background='powderblue')
        messagebox.showinfo(title='Tic Tac Toe', message=f"O is the winner. ")
        winner = True
        disable_all_buttons()
    elif button_3['text'] == 'O' and button_6['text'] == 'O' and button_9['text'] == 'X':
        button_3.configure(background='powderblue')
        button_6.configure(background='powderblue')
        button_9.configure(background='powderblue')
        messagebox.showinfo(title='Tic Tac Toe', message=f"O is the winner. ")
        winner = True
        disable_all_buttons()
    # -------------------------------------------------------------------------------------------#
    # -------------------------------------------------------------------------------------------#
    elif button_1['text'] == 'X' and button_5['text'] == 'X' and button_9['text'] == 'X':
        button_1.configure(background='powderblue')
        button_5.configure(background='powderblue')
        button_9.configure(background='powderblue')
        messagebox.showinfo(title='Tic Tac Toe', message="x is the winner. ")
        winner = True
        disable_all_buttons()
    elif button_3['text'] == 'X' and button_5['text'] == 'X' and button_7['text'] == 'X':
        button_3.configure(background='powderblue')
        button_5.configure(background='powderblue')
        button_7.configure(background='powderblue')
        messagebox.showinfo(title='Tic Tac Toe', message="x is the winner. ")
        winner = True
        disable_all_buttons()
    elif button_1['text'] == 'O' and button_5['text'] == 'O' and button_9['text'] == 'O':
        button_1.configure(background='powderblue')
        button_5.configure(background='powderblue')
        button_9.configure(background='powderblue')
        messagebox.showinfo(title='Tic Tac Toe', message="x is the winner. ")
        winner = True
        disable_all_buttons()
    elif button_3['text'] == 'O' and button_5['text'] == 'O' and button_7['text'] == '0':
        button_3.configure(background='powderblue')
        button_5.configure(background='powderblue')
        button_7.configure(background='powderblue')
        messagebox.showinfo(title='Tic Tac Toe', message="x is the winner. ")
        winner = True
        disable_all_buttons()


# button clicked function
def button_click(button):
    global clicked, count

    if button["text"] == "" and clicked == True:
        button.configure(text="X", foreground='white')
        clicked = False
        count += 1
    elif button["text"] == "" and clicked == False:
        button.configure(text="O", foreground='white')
        clicked = True
        count += 1
    else:
        messagebox.showerror(title="Tic Tac Toe", message="Hey that box has already been selected\nPick another box")
    check_if_won()


button_1 = tkinter.Button(text="", background=button_background, height=button_height, width=button_width,
                          highlightcolor='white', command=lambda: button_click(button_1))
button_1.grid(row=0, column=0)

button_2 = tkinter.Button(text="", background=button_background, height=button_height, width=button_width,
                          highlightcolor='white', command=lambda: button_click(button_2))
button_2.grid(row=0, column=1)

button_3 = tkinter.Button(text="", background=button_background, height=button_height, width=button_width,
                          highlightcolor='white', command=lambda: button_click(button_3))
button_3.grid(row=0, column=2)

button_4 = tkinter.Button(text="", background=button_background, height=button_height, width=button_width,
                          highlightcolor='white', command=lambda: button_click(button_4))
button_4.grid(row=1, column=0)

button_5 = tkinter.Button(text="", background=button_background, height=button_height, width=button_width,
                          highlightcolor='white', command=lambda: button_click(button_5))
button_5.grid(row=1, column=1)

button_6 = tkinter.Button(text="", background=button_background, height=button_height, width=button_width,
                          highlightcolor='white', command=lambda: button_click(button_6))
button_6.grid(row=1, column=2)

button_7 = tkinter.Button(text="", background=button_background, height=button_height, width=button_width,
                          highlightcolor='white', command=lambda: button_click(button_7))
button_7.grid(row=2, column=0)

button_8 = tkinter.Button(text="", background=button_background, height=button_height, width=button_width,
                          highlightcolor='white', command=lambda: button_click(button_8))
button_8.grid(row=2, column=1)

button_9 = tkinter.Button(text="", background=button_background, height=button_height, width=button_width,
                          highlightcolor='white', command=lambda: button_click(button_9))
button_9.grid(row=2, column=2)

screen.mainloop()
