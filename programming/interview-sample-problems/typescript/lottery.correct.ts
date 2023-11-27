/*
Below basic typescript program that prints out lottery numbers randomly. If the user matches the winning ticket number, we tell them they won.

However, the program is incomplete and does not work. Can you try to fix it?
*/

import * as readline from 'readline';

// Function to check if the user's ticket matches the winning numbers
function checkLotteryResult(userTicket: number[], winningNumbers: number[]): boolean {
    // Check if every number in the user's ticket is present in the winning numbers
    return userTicket.every(num => winningNumbers.includes(num));
}

// Set the winning numbers for just a demonstration
const winningNumbers = [1, 2, 3, 4, 5, 6]
console.log("Welcome to the Lottery Game!");

// Get user's ticket input (you can replace this with actual user input methods)
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
// Ask use in a prompt for their lottery picks
rl.question('Enter your 6 lottery ticket (1-49) numbers (space separated): ', (userTicketInput) => {
    const userTicket = userTicketInput.split(' ').map(Number);
    if (userTicket.length != 5) {
        console.log("Invalid input. Please enter 6 numbers.");
        rl.close();
    } else {
        // Check the result and inform the user
        const userWon = checkLotteryResult(userTicket, winningNumbers);

        if (userWon) {
            console.log("Congratulations! You won the lottery!");
            console.log("Winning Numbers: ", winningNumbers);
        } else {
            console.log("Sorry, you did not win this time.");
            console.log("Winning Numbers: ", winningNumbers);
        }
        rl.close();
    }
});
