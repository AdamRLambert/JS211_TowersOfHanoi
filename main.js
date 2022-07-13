'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

// Start here. What is this function doing?
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}
// we want to pop one item from an array and push it into another array 
const movePiece = (startStack, endStack) => {
  // Your code here
  stacks[endStack].push(stacks[startStack].pop())    
 
}

// with this code, we are going to compare the value of "rings" on one stack to the other stack, if the value of the
// stack is 0 or the value of rings on the second move is more than the value of "rings" on the first move 
//is greater, the game can continue 
const isLegal = (firstMove, secondMove) => {
  console.log(firstMove), (secondMove)
  if(!(stacks[secondMove].length) || (stacks[secondMove][stacks[secondMove].length -1] > stacks[firstMove][stacks[firstMove].length -1])){
    return true 
  } else {
    console.log("You can't do that you Captialist scum")
    return false
  }
}

//with this, we are checking to see if the stacks equal the required amout of "rings" per stack.  And in this case, 4
const checkForWin = () => {
  
  if (stacks['b'].length === 4 || stacks['c'].length === 4) {
    console.log('You have demolished private property!')
    return true
  } else {
    return false
  }
}

// this is taking the users input and making the variable that we will use in both "isLegal" and "movePiece"
const towersOfHanoi = (start, end) => {
  
  if(isLegal(start, end)) {
    movePiece(start, end) 
  } else {
    console.log("Is that what Marx would do?")
  }

}

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
