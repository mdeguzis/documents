/*
Given the words:

anna
banana
kayak

Check if each word is a palindrome (same backwards and forwards)
*/

function checkPalindrome(user_input: string){
    let reversed = user_input.split("").reverse().join("")
    return user_input === reversed
}
  
let str1 = "anna"
let str2 = "banana"
let str3 = "kayak"

console.log(checkPalindrome(str1));
console.log(checkPalindrome(str2));
console.log(checkPalindrome(str2));