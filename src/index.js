module.exports = function check(str, bracketsConfig) {
  let strToArr = str.split('');
  const stack = [];
  let arrOfSame = [];
  let arrOfSame2 = [];
  //check for the same brackets in the input string and make them not the same.
  strToArr.forEach((elem, index) => {
    bracketsConfig.forEach((configElem) => {
      if (configElem.indexOf(elem) !== -1 && configElem[0] === configElem[1]) {
        if (arrOfSame.length === 0 || arrOfSame[0] === elem) {
          arrOfSame.push(elem);
          if (arrOfSame.length % 2 !== 0) {
            strToArr[index] = elem + 'o';
          } else {
            strToArr[index] = elem + 'c';
          }
        } else {
          arrOfSame2.push(elem);
          if (arrOfSame2.length % 2 !== 0) {
            strToArr[index] = elem + 'o';
          } else {
            strToArr[index] = elem + 'c';
          }
        }
      }
    })
  })
  //make objects of brackets and closing brackets. For the same brackets - make them not the same as well: add "o" and "c" letters respectively.
  const open = {};
  const closed = {};
  bracketsConfig.forEach(element => {
    if (element[0] === element[1]) {
      open[element[0] + 'o'] = element[1] + 'c';
      closed[element[1] + 'c'] = true;
    } else {
      open[element[0]] = element[1];
      closed[element[1]] = true;
    }
  });
  //solution with stack: we iterate through the array (from input string). If the bracket is open bracket we push it to the stack. Otherwise (close bracket) we pop the last from the stack and check if its value from the 'open' object matches to the current close bracket. If not - the answer is the sequence is not correct. Otherwise we proceed while the loop is over. In this case the length of stack is 0 so we return the result of comparing length and 0.
  for (let i = 0; i < strToArr.length; i++) {
    let char = strToArr[i];
    if (open[char]) {
      stack.push(char);
    } else if (closed[char]) {
      if (open[stack.pop()] !== char) {
        return false;
      }
    }
  }
  return stack.length === 0;
}
