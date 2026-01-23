import time
import winsound

def draw_tree():
    tree = [
        "          ⭐",
        "          ***",
        "         *****",
        "        *******",
        "       *********",
        "      ***********",
        "     *************",
        "    ***************",
        "           |||",
        "           |||"
    ]

    for line in tree:
        print(line)
        time.sleep(0.3)

print("🎄 Launching Christmas Operations...")
time.sleep(1)

# Play music in background
try:
    winsound.PlaySound("carol.wav", winsound.SND_ASYNC)
except:
    print("⚠️ Audio file missing. Silent night activated.")

draw_tree()

print("\n✨ Merry Christmas & Happy Coding ✨")
