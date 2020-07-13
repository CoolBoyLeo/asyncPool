## 引入
```javascript
import asyncPool from "../lib/index";
```
## 用法
```javascript
/* 
输入参数
 iterator
    类型：Iterator | String | Array | TypedArray | Map | Set
    含义：要并发处理的一个迭代器或者内置可迭代对象
 handler
    类型：Function 
    含义：异步处理函数,返回Promise对象
 workers
    类型：Number
    含义：并发数
返回值
    类型：Array<Promise>[workers] 
    含义：Promise数组，数组大小为workers
*/
asyncPool(iterator,handler,workers);
```
## 使用场景

#### ①页面内含大量图片时限制并发HTTP连接数

```javascript
import asyncPool from "../lib/index.js";

let imgs = [ 'https://www.yuanzhua.cn/img_for_demo/pic_001.jpg','https://www.yuanzhua.cn/img_for_demo/pic_002.jpg', 'https://www.yuanzhua.cn/img_for_demo/pic_003.jpg','https://www.yuanzhua.cn/img_for_demo/pic_004.jpg','https://www.yuanzhua.cn/img_for_demo/pic_005.jpg','https://www.yuanzhua.cn/img_for_demo/pic_006.jpg', 'https://www.yuanzhua.cn/img_for_demo/pic_007.jpg','https://www.yuanzhua.cn/img_for_demo/pic_008.png', 'https://www.yuanzhua.cn/img_for_demo/pic_009.jpg', 'https://www.yuanzhua.cn/img_for_demo/pic_010.jpg', 'https://www.yuanzhua.cn/img_for_demo/pic_011.png', 'https://www.yuanzhua.cn/img_for_demo/pic_012.jpg', 'https://www.yuanzhua.cn/img_for_demo/pic_013.jpg', 'https://www.yuanzhua.cn/img_for_demo/pic_014.jpg','https://www.yuanzhua.cn/img_for_demo/pic_015.jpg'];

function loadImg(url){
            return new Promise((resolve, reject)=>{
                let img=new Image();
                img.src=url;
                img.style.width=
                img.onload=function () {
                    this.width=200;
                    // this.style="border:1px solid gray"
                    document.body.append(this);
                    resolve()
                }
                img.onerror=function () {
                    reject()
                }
            });
}

Promise.all(asyncPool(imgs,loadImg,5)).then(() => console.log('done'))
```

![image-20200711201310802](https://raw.github.com/yuanzhuacn/asyncPool/master/img_for_demo/demo1.jpg)


