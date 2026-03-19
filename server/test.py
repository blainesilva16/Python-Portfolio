from random import randint
positions = [" "," "," "," "," "," "," "," "," "]

def show_game():
    for i in [0,3,6]:
        print(f" {positions[i]} | {positions[i+1]} | {positions[i+2]}")
        if not i == 6:
            print("-----------")
    print("\n")

def win(positions):
    for i in [0,3,6]:
        if positions[i] == positions [i+1] == positions [i+2] != " " or positions[int(i/3)] == positions [int(i/3+3)] == positions [int(i/3+6)] != " " or positions[int(i%3)] == positions[int(i%3+4)] == positions[int(i%3+8)] != " " or positions[int(i%3+2)] == positions[int(i%3+4)] == positions[int(i%3+6)] != " ":
            return True
    return False

def tie(positions):
    counter = 0
    for i in positions:
        if i == "X" or i == "O":
            counter = counter + 1
    if counter == 9:
        return True
    return False

def player_turn(play,positions):
    while not play.isdigit:
        play = input("Only numbers from 1 to 9: ")      
    play_int = int(play)
    while not play_int in [1,2,3,4,5,6,7,8,9]:
        play_int = int(input("Type a number from 1 to 9 only: "))
    while positions[play_int-1] == "X" or positions[play_int-1] == "O":
        play_int = int(input("Position already taken. Type a number from 1 to 9 only: "))
    return play_int

def computer(positions):
    play = randint(0,8)
    while positions[play] == "X" or positions[play] == "O":
        play = randint(0,8)
    return play

go = True
print("------------------------ Welcome to the Tic-Tac-Toe Game! ------------------------\nYou are player O and the computer is player X.\n\nFrom 1 to 9, choose your position:\n\n")

while go:
    show_game()
    play = input('Type a number from 1 to 9: ')
    play_int = player_turn(play,positions)
    positions[play_int-1] = "O"
    if win(positions):
        print('\n------------------------ You win! ------------------------')
        go = False
        break
    if tie(positions):
        print("\n------------------------ It's a tie! ------------------------")
        break
    computer_play = computer(positions)
    positions[computer_play] = "X"
    if win(positions):
        print('\n------------------------ The computer wins! ------------------------')
        break

show_game()