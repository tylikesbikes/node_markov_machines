const mm = require('./markov');

// beforeEach(function() {
//     const mm = new markovMachine.MarkovMachine('eggs.txt');
// })

test('make sure markov machine exists', function() {
    const machine = new mm.MarkovMachine('eggs.txt');
    expect(machine).toBeInstanceOf(mm.MarkovMachine);
});

test('random element picker returns a random element from an array', function() {
    const machine = new mm.MarkovMachine('eggs.txt');
    expect(machine.randomElementFromArray(['a','b','c'])).toMatch(new RegExp('^[abc]'));
});

test('check chains', function() {
    const machine = new mm.MarkovMachine('i like flowers.  i like donuts. like father like son.');
    expect(machine.chains.get('i like')).toEqual(['flowers.','donuts.']);
});