// 职责链模式

// 假设有一个售卖手机的电商网站，经过分别缴纳500元定金和200元定价的两轮预定后（订单此时生成），
// 现在已经到了正式购买的阶段。公司针对支付过定金的客户有一定的优惠政策。在正式购买时，已支付过500元定金的客户将获得100元商城优惠券，
// 已支付过200元的客户将获得50元商城优惠券；而之前没有支付过定金的客户将没有任何优惠券，并且在库存有限的情况下，还不一定能买得到；

// 1.orderType：表示订单类型（定金用户或普通用户），code的值为1的时候是500元定金用户，为2的时候是200元定金用户，为3的时候是普通用户；
// 2.pay：表示用户是否已经支付定金，值为true或false。虽然用户下过500元的定金的订单，但如果他一直没有支付定金，现在只能以普通用户的身份进行购买；
// 3.stock：表示普通用户用于购买手机的库存数量，已经支付过500元定金或者200元定金的客户不受此限制；

var order500 = function (orderType, pay, stock) {
    console.log(stock)
    if (orderType === 1 && pay === true) {
        console.log('500 元定金预购，得到100 优惠券');
    } else {
        return 'nextSuccessor'; // 我不知道下一个节点是谁，反正把请求往后面传递
    }
};

var order200 = function (orderType, pay, stock) {
    console.log(stock)
    if (orderType === 2 && pay === true) {
        console.log('200 元定金预购，得到50 优惠券');
    } else {
        return 'nextSuccessor'; // 我不知道下一个节点是谁，反正把请求往后面传递
    }
};

var orderNormal = function (orderType, pay, stock) {
    if (stock > 0) {
        console.log('普通购买，无优惠券');
    } else {
        console.log('手机库存不足');
    }
};

var Chain = function (fn) {
    this.fn = fn;
    this.successor = null;
};

// 传递请求给下一个节点
Chain.prototype.setNextSuccessor = function (successor) {
    return this.successor = successor;
};

// 传递请求给某个节点
Chain.prototype.passRequest = function () { // 接收实例后的方法并将参数作为数组形式保存
    var ret = this.fn.apply(this, arguments);
    console.log(ret);

    // ret等于nextSuccessor就是不符合处理条件还得往下执行
    if (ret === 'nextSuccessor') { // 这里是逻辑短路返回，并集一假则假；如果this.successor存在，则返回后面的执行结果；如果this.successor不存在,则返回this.nextSuccessor的值即为undefined
        return this.successor && this.successor.passRequest.apply(this.successor, arguments);
    }
};


var chainOrder500 = new Chain(order500);
var chainOrder200 = new Chain(order200);
var chainOrderNormal = new Chain(orderNormal);

// 沿职责链节点传递
chainOrder500.setNextSuccessor(chainOrder200);
chainOrder200.setNextSuccessor(chainOrderNormal);

chainOrder500.passRequest(1, true, 500); // 500 元定金预购，得到100 优惠券
chainOrder500.passRequest(2, true, 500); // 200 元定金预购，得到50 优惠券
chainOrder500.passRequest(3, true, 500); // 普通购买，无优惠券
chainOrder500.passRequest(1, false, 0); // 手机库存不足


var order300 = function () { // 具体实现的行为
};

var chainOrder300 = new Chain(order300);
chainOrder500.setNextSuccessor(chainOrder300);
chainOrder300.setNextSuccessor(chainOrder200);
