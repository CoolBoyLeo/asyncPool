/* 参数
 iterator
    要并发处理的可迭代对象或者是一个迭代器
 handler
    function 异步处理函数,返回promise,
 workers
    Number 并发数
 返回值
    Array<Promise> limit个promise数组
*/
function asyncPool(iterator, handler, workers){
    if(!iterator.hasOwnProperty("next")){
        if(typeof iterator[Symbol.iterator]().next !="function") {
            throw Error("iterator must be an iterator or iterable 第一个参数必须要并发处理的可迭代对象或者是一个迭代器")
        }
        else{
            iterator=iterator[Symbol.iterator]();
        }
    }

    if(typeof handler != 'function'){
        throw Error("handler must be an function and return a promise")
    }
    if(typeof workers != 'number'){
        throw Error("workers must be an number")
    }
    async function doWork(iterator) {
        for (let item of iterator) {
            await handler(item);
        }
    }
    return new Array(workers).fill(iterator).map(doWork)
}
export default asyncPool;
