// 观察者模式
// 观察者模式又称发布-订阅模式（Publish/Subscribe Pattern），是我们经常接触到的设计模式，日常生活中的应用也比比皆是，比如你订阅了某个博主的频道，vue双向绑定
// 当有内容更新时会收到推送；又比如JavaScript中的事件订阅响应机制。观察者模式的思想用一句话描述就是：
// 被观察对象（subject）维护一组观察者（observer），当被观察对象状态改变时，通过调用观察者的某个方法将这些变化通知到观察者。
// 观察者模式中Subject对象一般需要实现以下API：
// subscribe(): 接收一个观察者observer对象，使其订阅自己
// unsubscribe(): 接收一个观察者observer对象，使其取消订阅自己
// fire(): 触发事件，通知到所有观察者
// 被观察者
// 被观察者
function Subject() {
  this.observers = [];
}

Subject.prototype = {
  // 订阅
  subscribe: function (observer) {
    this.observers.push(observer);
  },
  // 取消订阅
  unsubscribe: function (observerToRemove) {
    this.observers = this.observers.filter(observer => {
      return observer !== observerToRemove;
    })
  },
  // 事件触发
  fire: function () {
    this.observers.forEach(observer => {
      observer.call();
    });
  }
}

const subject = new Subject();

function observer1() {
  console.log('Observer 1 Firing!');
}

function observer2() {
  console.log('Observer 2 Firing!');
}

subject.subscribe(observer1);
subject.subscribe(observer2);
subject.fire();

//输出：
// Observer 1 Firing! 
// Observer 2 Firing!


subject.unsubscribe(observer2);
subject.fire();

//输出：
// Observer 1 Firing!




// 优点

// 支持简单的广播通信，自动通知所有已经订阅过的对象
// 目标对象与观察者之间的抽象耦合关系能单独扩展以及重用
// 增加了灵活性
// 观察者模式所做的工作就是在解耦，让耦合的双方都依赖于抽象，而不是依赖于具体。从而使得各自的变化都不会影响到另一边的变化。
// 缺点

// 过度使用会导致对象与对象之间的联系弱化，会导致程序难以跟踪维护和理解