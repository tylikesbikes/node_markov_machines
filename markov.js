const { Console } = require('console');
const fs = require('fs');

/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.chains = this.makeChains();
  }

  /** set markov chains:
   *
   * 
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    const chains={};
  
    for (let i = 0; i < this.words.length - 1; i++){
      let thisWord = this.words[i];
      let nextWord = this.words[i+1];
      
      if (thisWord in chains) {
        chains[thisWord].add(nextWord);
      } else {
        chains[thisWord] = new Set();
        chains[thisWord].add(nextWord);
      }
  }
  return chains;
}


  //     } else {
  //       chains.thisWord = new Set();
  //       chains.thisWord.add(nextWord)
  //     }
  //   }
  //   return chains;
  // }
  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
    console.log(this.chains);
  }
}

// const eggs = fs.readFileSync('eggs.txt', 'utf8', (err, data) => {
//   if (err) {
//     console.log('Error reading file\n', err);
//   } else {
    
//   }
// });

const eggs = fs.readFileSync('eggs.txt','utf8');

const eggsMarkov = new MarkovMachine(eggs);

eggsMarkov.makeText();


// eggsMarkov.makeText();