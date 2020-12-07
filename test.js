/*
const sum = (num1, num2) => num1 + num2;
const pi = 3.14;
const myFriend = {
        name: 'mathieu',
        age: 27,
        hobby: 'sport'
    }
    //module.exports = sum; // Need to do that command in order to give the possibility to the other file to use sum variable
    // don't forget to add a variable inside the file that want to use sum with the require element. Exemple I will add inside server.js the line const test = require('./test.js');
    // this use => module.exports = sum;   allow to only export one variable. If I have more variable, I need to use an other methode.
*/

// TO EXPORT MULTIPLE VARIABLE:
// first way but ugly
/*
module.exports.sum = sum;
module.exports.pi = pi;
module.exports.myFriend = myFriend;
*/

// second way cleaner, consist of exporting an object
/*
module.exports = {
    sum: sum,
    pi: pi,
    myFriend: myFriend
}
*/