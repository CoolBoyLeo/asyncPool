/* 参数
 myIterator
    要并发处理的可迭代对象
 handler
    function 异步处理函数,返回promise,
 workers
    Number 并发数
 返回值
    Array<Promise> limit个promise数组
*/
function asyncPool(iterator, handler, workers){
    async function doWork(iterator) {
        for (let item of iterator) {
            await handler(item);
        }
    }
    return new Array(workers).fill(iterator).map(doWork)
}
export default asyncPool;
