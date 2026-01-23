

num =int(input("Enter your num :"))


if num %2==0:
         print("The number is even ")
else:
    print("the num is odd")

#program for fibonacci series

'''n=int(input("Enter how many fibonacci number you want :"))

a=0
b=1

print("Fibonacci series : ")

for i in range(n):
    print(a,end=' ')
    a,b=b ,a+b'''

#program for reverse value

'''value=input("Enter your value to reverse :")

reverse_value= value[::-1]

print("before reverse value :" ,value)            

print(" after reverse value is : ",reverse_value)            '''

#Armstrong number

'''def is_armstrong(num):
    num_str=str(num)
    count=len(num_str)
    total=0

    for i in(num_str):
        total+=int(i)**count

        if total==num:
            return True
        else :
            return False'''

#palindrome

'''def is_palindrome(value):

    value_str=str(value)
    reverse_str=value_str[::-1]

    if reverse_str==value_str:
        return True
    else:
        return False'''

#factorial

