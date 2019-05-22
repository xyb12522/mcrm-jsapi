# mcrm-jsapi
二次封装了Android和IOS使用WebViewJavascriptBridge的方法

## 技术说明

| 采用ES6语法进行工程化分层，规范并统一安卓ios调用WebViewJavascriptBridge的方法|


## 安装
#### NPM
```shell
npm install mcrm-jsapi
```

###快速上手

```
import mcrm from 'mcrm-jsapi'
例：使用打开新页面方法
mcrm.busi.openLink({
	url: 'https://www.baidu.com/',
	onSuccess: res => {
	  console.log(res);
	},
	onFail: res => {
	  console.log(res);
	},
  });
```
