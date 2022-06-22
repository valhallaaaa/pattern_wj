// 迭代器模式 
// 提供一种方法顺序一个聚合对象中各个元素，而又不暴露该对象的内部表示

// 一个迭代器通常需要实现以下接口：
// hasNext()：判断迭代是否结束，返回Boolean
// next()：查找并返回下一个元素
// 类似于封装函数？
const item = [1, 'red', false, 3.14];

function Iterator(items) {
  this.items = items;
  this.index = 0;
}

Iterator.prototype = {
  hasNext: function () {
    return this.index < this.items.length;
  },
  next: function () {
    return this.items[this.index++];
  }
}
const iterator = new Iterator(item);

while(iterator.hasNext()){
  console.log(iterator.next());
}
//输出：1, red, false, 3.14


// ES6提供了更简单的迭代循环语法 for...of，
// 使用该语法的前提是操作对象需要实现可迭代协议（The iterable protocol），
// 简单说就是该对象有个Key为 Symbol.iterator 的方法，该方法返回一个iterator对象。

function Range(start, end) {
  return {
    [Symbol.iterator]: function () {
      return {
        next() {
          if (start < end) {
            return { value: start++, done: false };
          }
          return { done: true, value: end };
        }
      }
    }
  }
}
for (var num of Range(1, 5)) {
  console.log(num);
}
// 输出：1, 2, 3, 4