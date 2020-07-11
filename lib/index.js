function asyncPool(iterator, handler, workers){

    async function doWork(iterator) {
        for (let item of iterator) {
            await handler(item);
        }
    }

    return new Array(workers).fill(iterator).map(doWork)
}

export default asyncPool;
