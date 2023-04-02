# Slot Machine Game

This is a simple slot machine game implemented using JavaScript. The game has the following features:

- User can deposit money
- User can select the number of lines to bet on
- User can enter the bet amount
- A new set of symbols is generated for each spin
- The generated symbols are displayed on the console
- Winnings are calculated based on the generated rows and the bet amount
- The user can play the game multiple times until they run out of money or choose to quit

## Installation

To install the required libraries, run the following command:

```
npm install prompt-sync --save
```

## Usage

To play the game, run the following command:

```
node slot-machine.js
```

## Implementation

The implementation consists of the following functions:

- `deposit()`: Gets the amount to deposit
- `getNumberOfLine()`: Gets the number of lines to bet on
- `getBet(balance, lines)`: Gets the amount to bet
- `spin()`: Generates a new set of symbols for the slot machine
- `transpose(reels)`: Transposes the generated reel symbols into rows
- `printRows(rows)`: Prints the generated rows on console
- `getWinnings(rows, bet, lines)`: Gets the winnings amount based on the generated rows
- `game()`: Main game function

## Credits

This game was created by (Omkar Shitole). Feel free to use and modify the code as per your requirements.
