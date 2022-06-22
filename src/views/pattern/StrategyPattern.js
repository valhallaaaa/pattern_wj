// 策略模式

// 策略模式指的是定义一系列的算法，把它们一个个封装起来。将不变的部分和变化的部分隔开是每个设计模式的主题，策略模式也不例外，策略模式的目的就是将算法的使用与算法的实现分离开来。

// js中函数也是对象，直接将 strategy 定义为函数
let strategy = {
    "S": function (salary) {
        return salary * 4;
    },
    "A": function (salary) {
        return salary * 3;
    },
    "B": function (salary) {
        return salary * 2;
    }
}
let calculateBonus = function (level, salary) {
    return strategy[level](salary);
}
console.log(calculateBonus('A', 20000))
// 6000

