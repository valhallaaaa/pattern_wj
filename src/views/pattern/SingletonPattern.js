// 单例模式

// 顾名思义，单例模式中Class的实例个数最多为1。当需要一个对象去贯穿整个系统执行某些任务时，单例模式就派上了用场。而除此之外的场景尽量避免单例模式的使用，
// 因为单例模式会引入全局状态，而一个健康的系统应该避免引入过多的全局状态。

// 实现单例模式需要解决以下几个问题：
// 如何确定Class只有一个实例？
// 如何简便的访问Class的唯一实例？
// Class如何控制实例化的过程？
// 如何将Class的实例个数限制为1？

// 我们一般通过实现以下两点来解决上述问题：
// 隐藏Class的构造函数，避免多次实例化
// 通过暴露一个 getInstance() 方法来创建/获取唯一实例

// 单例构造器
const FooServiceSingleton = (function () { // 隐藏的Class的构造函数
    function FooService() {}

    // 未初始化的单例对象
    let fooService;

    return { // 创建/获取单例对象的函数
        getInstance: function () {
            if (! fooService) {
                fooService = new FooService();
            }
            return fooService;
        }
    };
})();
const fooService1 = FooServiceSingleton.getInstance();
const fooService2 = FooServiceSingleton.getInstance();

console.log(fooService1 === fooService2); // true


// 实现的关键点有：
// 使用 IIFE创建局部作用域并即时执行；
// getInstance() 为一个 闭包 ，使用闭包保存局部作用域中的单例对象并返回。

// 场景例子
// 定义命名空间和实现分支型方法
// 登录框
// vuex 和 redux中的store

// 优点
// 划分命名空间，减少全局变量
// 增强模块性，把自己的代码组织在一个全局变量名下，放在单一位置，便于维护
// 且只会实例化一次。简化了代码的调试和维护

// 缺点
// 由于单例模式提供的是一种单点访问，所以它有可能导致模块间的强耦合
// 从而不利于单元测试。无法单独测试一个调用了来自单例的方法的类，而只能把它与那个单例作为一个单元一起测试。
