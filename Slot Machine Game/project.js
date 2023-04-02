//Importing the prompt-sync library to get input from the user 
const prompt = require("prompt-sync")();

//Defining the grid size for the slot machine
const ROWS = 3;
const COLS = 3;

//Defining the number of symbols for each type
const SYMBOLS_COUNT = {
    "A":2,
    "B":3,
    "C":6,
    "D":8,
}

//Defining the value of each symbol
const SYMBOLS_VALUES = {
    "A":5,
    "B":4,
    "C":3,
    "D":2,
}

//Function that gets the amount to deposit
const deposit = () => {
    while(true) {
        const depositAmount = prompt("Enter the amount to deposit: ");   
        const numberDepositAmount = parseFloat(depositAmount);

        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
            console.log("Invalid deposit amount, try again.");
        } else {
            return numberDepositAmount;
        }
    }
};

//Function that gets the number of lines to bet on
const getNumberOfLine = () => {
    while(true) {
        const lines = prompt("Enter the number of line to bet on (1-3): ");   
        const numberlines = parseFloat(lines);

        if (isNaN(numberlines) || numberlines <= 0 || numberlines > 3) {
            console.log("Invalid number of lines, try again.");
        } else {
            return numberlines;
        }
    }
};

//Function that gets the amount to bet
const getBet = (balance, lines) => {
    while(true) {
        const bet = prompt("Enter the bet amount: ");   
        const numberBet = parseFloat(bet);

        if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance/lines) {
            console.log("Invalid bet, try again.");
        } else {
            return numberBet;
        }
    }
};

//Function that generates a new set of symbols for the slot machine
const spin = () => {
    const symbols = [];
    for(const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for(let i=0; i<count; i++) {
            symbols.push(symbol);
        }
    }   const reels = []
        for(let i=0; i<COLS; i++) {
        reels.push([]);
        const reelSymbols = [...symbols];
        for(let j=0; j<ROWS; j++){
            const randomIndex = Math.floor(Math.random()*reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex,1);
        }   
    }
    return reels;
};

//Function that transposes the generated reel symbols into rows
const transpose= (reels) => {
    const rows = [];
    for(let i=0; i < ROWS;i++) {
        rows.push([]);
        for(let j=0; j<COLS; j++){
            rows[i].push(reels[j][i])
        }
    }
    return rows;
};

//Function that prints the generated rows on console
const printRows = (rows) => {
    for(const row of rows) {
        let rowString= "";
        for(const [i,symbol] of row.entries()){
            rowString+= symbol
            if(i != rows.length-1){
                rowString+= "|"
            }            
        }
        console.log(rowString)
    }   
};

//Function that gets the winnings amount based on the generated rows
const getWinnings = (rows, bet, lines) => {
    let winnings = 0;
       for(let row=0; row < lines; row++) {
        const symbols = rows[row];
        let allSame = true;
        for(const symbol of symbols){
            if(symbol != symbols[0]) {
                allSame = false;
                break;
            }
        }
        if (allSame) {
            winnings+=bet* SYMBOLS_VALUES[symbols[0]];
        }
    }
    return winnings;
}

//Main game function
const game= () => {
    while(true){
        let balance = deposit();
        console.log("You have a balance of $"+balance);

        const numberlines = getNumberOfLine();
        const bet = getBet(balance,numberlines);
        balance-= bet *numberlines;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows, bet, numberlines);
        balance +=winnings;
        console.log("You won, $"+winnings.toString());

        if(balance<=0){
            console.log("You ran out of money!"); 
            break;
        }

        const playAgain= prompt("Do you want to play again? (y/n)");

        if(playAgain!="y") break;
    }
};

//Invoking the main game function
game();