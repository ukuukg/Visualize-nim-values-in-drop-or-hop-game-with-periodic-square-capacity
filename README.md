# Visualize: nim values in drop-or-hop game with periodic square capacity

## Introduction

The Drop-or-Hop game with Larger Squares is played by two players on a 1 × n board, where each square has a designated capacity. In this project, we consider a periodic variant in which the capacities alternate between C0 and C1 (C0 and C1 can be the same of different), starting from the leftmost square (i.e., C0, C1, C0, C1, C0, C1, … across the board). On each turn, a player may either perform a Drop by placing a new pebble into any square whose current number of pebbles is less than its capacity, or perform a Hop by moving a pebble from a square to the one immediately to its right, provided that the target square does not exceed its capacity. The game continues until all squares are filled to their maximum capacities, and the player who makes the last legal move wins.

Given a valid board configuration, let r denote the total number of missing pebbles among the squares with capacity C0, and let c denote the total number of missing pebbles among the squares with capacity C1. The nim-value of the position can be determined by a table indexed by (r, c). This project provides an HTML-based visualization of this table, allowing users to directly explore nim-values for different configurations.

## Technical Details

- The game is an impartial combinatorial game, meaning that both players have exactly the same legal moves from any given position, and there is no randomness involved.
- Each board configuration is a state, for each state, we can get the pair (r, c) where r is the total deficit in C0 squares and c is the total deficit in C1 squares. For different states with the same (r, c) pair, the nim-values (Grundy number) of them are the same.
- The nim-value for each state is computed using dynamic programming implemented in C++.

## Environment

Requirements:

- C++ compiler (supporting C++11 or later)
- Python 3.x
- A modern web browser (Chrome, Edge, Firefox)

## Build

Compile the C++ program using a standard C++ compiler:

**Important:** the output must be named `main.exe`; using a different name will cause an error.

    g++ main.cpp -o main.exe

## Run

1. Make sure Flask is installed:

       pip install flask

2. Start the web server to serve the frontend:

       python server.py

3. Open a browser and navigate to:

    http://localhost:4321

4. Type the C0, C1 values and the board length n into the browser, then click the button "confirm" or click Enter to get the nim value table

## Example

Given an example that C0=4, C1=7, board length=9, the capacities of this board from left to right are `[4, 7, 4, 7, 4, 7, 4, 7, 4]` , we can get the nim value table of this board.

Given a state: the numbers of pebbles from left to right are `[3, 2, 1, 6, 0, 5, 4, 0, 2]` , so the missing numbers of pebbles from left to right are `[4-3, 7-2, 4-1, 7-6, 4-0, 7-5, 4-4, 7-0, 4-2]` = `[1, 5, 3, 1, 4, 2, 0, 7, 2]` , then r=1+3+4+0+2=10 , c=5+1+2+7=15 , so read the table `row:10  column:15` , we can get the answer 2, so the nim value of this state is 2.


## Project Structure

- .gitignore
- README.md
- main.cpp          
- server.py         
- frontend/
  - index.html      
  - script.js     
  - style.css     