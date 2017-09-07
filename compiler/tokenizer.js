/**
 * We're gonna start off with our first phase of parsing, lexical analysis, with
 * the tokenizer.
 *
 * We're just going to take our string of code and break it down into an array
 * of tokens.
 *
 *   (add 2 (subtract 4 2))   =>   [{ type: 'paren', value: '(' }, ...]
 */
window.tokenizer = function(input) {
  const LETTERS = /[a-z]/i;
  const WHITESPACE = /\s/;
  const NUMBERS = /[0-9]/;
  let current = 0;
  let tokens = [];
  let value = '';
  while (current < input.length) {
    let char = input[current];
    switch (true) {

      case char === '(':
        current++;
        tokens.push({
          type: 'paren',
          value: '(',
        });
        continue;

      case char === ')':
        tokens.push({
          type: 'paren',
          value: ')',
        });
        current++;
        continue;

      case WHITESPACE.test(char):
        current++;
        continue;
  
      case NUMBERS.test(char):
        value = '';
        while (NUMBERS.test(char)) {
          value += char;
          char = input[++current];
        }
        tokens.push({ type: 'number', value });
        continue;

      case char === '"':
        value = '';
        char = input[++current];
        while (char !== '"') {
          value += char;
          char = input[++current];
        }
        char = input[++current];
        tokens.push({ type: 'string', value });
        continue;

      case LETTERS.test(char):
        value = '';
        while (LETTERS.test(char)) {
          value += char;
          char = input[++current];
        }
        tokens.push({ type: 'name', value });
        continue;
      
      default:
        throw new TypeError('I dont know what this character is: ' + char);
    }
  }
  return tokens;
}