##导入
```javascript
import asyncPool from "asyncPool";
```

##使用场景**

####1、：页面内含大量图片时限制并发HTTP连接数**

```javascript
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

Promise.all(asyncPool(imgs.values(),loadImg,5)).then(() => console.log('done'))
```

![image-20200711201310802](https://raw.github.com/yuanzhuacn/asyncPool/master/img_for_demo/demo1.jpg)


