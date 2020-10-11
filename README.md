- [widgetScript](#widgetscript)
    - [helloSelf.js](#helloselfjs)
        * [1. 获取自己所在地理位置的经纬度, 然后到彩云天气获取天气令牌. 获取到信息后, 添加到脚本的 `user_config`](#1-----------------------------------------------user-config-)
        * [2. 配置说明, `user_config`中可以设置显示效果](#2--------user-config----------)
        * [3. 显示效果](#3-----)
        * [4. 如何使用](#4-----)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>

# widgetScript


使用方法：
1.你需要在你的手机上安装 Scriptable [testflight版本](https://testflight.apple.com/join/ uN1vTqxk) 或者 [AppStore版本](https://apps.apple.com/cn/app/scriptable/id1405459188)

2.下载你想使用的脚本, 放到scriptable中; 或者点击对应的脚本, 复制所有代码,在scriptable中创建一个新的script,将复制的代码新建的script中


#### helloSelf.js

##### 1. 获取自己所在地理位置的经纬度, 然后到彩云天气获取天气令牌. 获取到信息后, 添加到脚本的 `user_config` 
```
	caiyunToken:'***********',
	userLocation: '121.6544,25.1552',
	isShowLife:true,
```
##### 2. 配置说明, `user_config`中可以设置显示效果

```
 isShowWeather: 电池信息下方那一行是否展示天气信息(数据温度, 还有天气现象,eg: 大风大雨大雪等等)或者显示随机一条诗词;  true: 天气信息; false: 显示一条随机诗词;
 weatherEmoji: 只在isShowWeather为true的时候生效, weatherEmoji 为ture的时候用emoji替代文字显示天气现象

```

##### 3. 显示效果

天气显示emoji ![天气显示emoji](https://tva1.sinaimg.cn/large/007S8ZIlly1gjl6238pshj30je0cyjtz.jpg)

显示节假日信息 ![显示节假日信息](https://tva1.sinaimg.cn/large/007S8ZIlly1gjl63i60vsj30j80awq52.jpg)


随机一条诗词  ![随机一条诗词](https://tva1.sinaimg.cn/large/007S8ZIlly1gjl640x4cmj30j40aeq4z.jpg)

文字天气  
![文字天气](https://tva1.sinaimg.cn/large/007S8ZIlly1gjl651dzy4j30j609y40f.jpg)




##### 4. 如何使用


![](https://tva1.sinaimg.cn/large/007S8ZIlly1gjl6kvny2eg30d40sib2n.gif)



[![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=SuQiankun)](https://github.com/anuraghazra/github-readme-stats)
