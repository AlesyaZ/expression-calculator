function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {

    // создаю 2 стека: 1 стек чисел, 2 стек операций

    let stackNumbers = [];
    let StackOperations = [];

    // возращаю с аргумента функции нужные значения 
    const arrExpr = expr.match(/([+*-/)(]{1}|\d+)/g);
    
    // создаю операции 
    const operations = {
      "+": (a, b) => (topStackOperations(StackOperations) === "-" ? a - b : a + b),
      "-": (a, b) => (topStackOperations(StackOperations) === "-" ? a + b : a - b),
      "*": (a, b) => a * b,
      "/": (a, b) => { 
          if (b === 0) {
             throw new Error("TypeError: Division by zero.");
          }
      return a / b;
      }
    }
    // создаю приоритеты операций 
    const priority = {
      "+": 1,
      "-": 1,
      "*": 2,
      "/": 2
    }
    // возращаю последний элемент в стеке
    function topStackOperations(n) {
        return n[n.length - 1]
      }
      
   // проверяю сопоставимость количества скобок 

        let brackets = [];
    for (let i = 0; i < arrExpr.length; i++) {
      if (arrExpr[i] === "(") {
        brackets.push(arrExpr[i]);
      }
      if (arrExpr[i] === ")") {
        if (brackets.length === 0) throw new Error("ExpressionError: Brackets must be paired");    
        brackets.pop();    
      }
    }
    if (brackets.length !== 0) throw new Error("ExpressionError: Brackets must be paired"); 

   // выбираю числа в стеке и присваиваю оперцию со второго стека
   function calc() {
    let [b, a] = [stackNumbers.pop(), stackNumbers.pop()]
    stackNumbers.push(operations[StackOperations.pop()](a, b))
    }

   // произвожу вычисление 
  for (value of arrExpr) {
    if (!isNaN(value)) {
      stackNumbers.push(+value)
    } else {
      if (priority[value]) {
        if (priority[value] <= priority[topStackOperations(StackOperations)]) {
          calc()
        }
      }
      if (value === ")") {
        while (topStackOperations(StackOperations) !== "(") {
          calc()
        }
        StackOperations.pop()
        continue
      }
      StackOperations.push(value)
    }
  }

// если числа в стеке остались общаемся к функции calc
while (stackNumbers.length > 1) {
    calc()
  }

// возращаем последнее число в стеке
  return stackNumbers.pop()
}

module.exports = {
    expressionCalculator
}