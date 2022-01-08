module.exports = function check(str, bracketsConfig) {
  let strToArr = str.split('');
  const stack = [];
  let arrOfSame = [];
  let arrOfSame2 = [];
  //check for the same brackets
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
  //make objects of brackets and closing brackets
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
  //solution with stack;
  for (let i = 0; i < str.length; i++) {
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
