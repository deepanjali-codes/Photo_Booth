p1 = "Make  lots of Money!"
p2 = "Buy Now!"
p3 = "Subscribe This for More"
p4 = "Click on this now"

message = input("Enter your Comment: ")
if ((p1 in message) or (p2 in message) or (p3 in message) or (p4 in message)):
     print("Dihh! Why are you spamming 🤨")
else:
    print("Ohk! Your comment isn't spam.")

# import re
# text= "apple,banana,cherry,apple"
# result = re.findall("apple",text)
# print(result)
