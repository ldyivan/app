# RTS拉流使用文档

当您需要使用RTS拉流。您可以通过本章节，了解接入的方法，帮助您更好的体验阿里云音视频通信服务。

## 接入方法
#### 1、实例化
```javascript
var aliRts = AliRTS.createClient();
```

#### 2、isSupport检测浏览器是否可用
```javascript
/**
 * isSupport检测是否可用
 * @param {Object} supportInfo 检测信息
 * @param {Boolean} supportInfo.isReceiveVideo 是否拉视频流
 * @return {Promise}
 */
aliRts.isSupport(supportInfo).then(re=> {
	// 可用
}).catch(err=> {
  // 不可用
  console.log(`not support errorCode: ${err.errorCode}`);
  console.log(`not support message: ${err.message}`);
})
```


#### 3、RTS开始拉流
```javascript
/**
 * rts开始拉流接口
 * @param {String} pullStreamUrl 拉流地址,在地址后添加@subaudio=no或者@subvideo=no来表示不订阅音频流或视频流
 * @return {Promise}
 */
aliRts.subscribe(pullStreamUrl).then((remoteStream) => {
  // mediaElement是媒体标签audio或video
  remoteStream.play(mediaElement);
}).catch((err) => {
  // 订阅失败
})
```


#### 4、RTS停止播放
```javascript
/**
 * 停止rts播放接口
 */
aliRts.unsubscribe();
```


#### 5、静音接口
```javascript

remoteStream.muted = true;
```


#### 6、获取本地流
```javascript
/**
 * 获取本地流localStream
 */
aliRts.createStream({
  audio: true,
  video: true,
  screen: false,
}).then((localStream) => {
  // 预览推流内容，mediaElement是媒体标签audio或video
  localStream.play(mediaElement);
}).catch((err) => {
  // 创建本地流失败
})
```


#### 7、推流
```javascript
/**
 * 开始推流
 */
aliRts.publish(pushUrl, localStream)).then(() => {
  // 推流成功
}).catch((err) => {
  // 推流失败
})
```


#### 8、停止推流
```javascript
/**
 * 停止推流
 */
aliRts.unpublish();
```






注：1、由于浏览器策略问题，https协议无法正常加载http资源，所以https协议链接的拉流地址必须也是https(如果使用http也同理，拉流地址也需要是http)。

## 浏览器支持情况
| 平台 | 浏览器 | 最低支持版本 |
| --- | --- | --- |
| Windwos | Chrome | 63 |
|  | Firefox | 62 |
|  | Opera | 15 |
| Mac | Chrome | 63 |
|  | Safari | 11 |
|  | Firefox | 62 |
|  | Opera | 15 |
| Android | Chrome | 63 |
|  | 微信浏览器 | 微信版本号>=7.0.9 |
| ios | Safari | 11 |
|  | 微信浏览器 | 微信版本号>=7.0.9 |
|  | 钉钉浏览器 | ios系统版本号>=11.2.5 |

## 错误码
| 错误码 （errorCode） | 错误信息（message） | 描述 |
| --- | --- | --- |
| 10000 | device unknown error | 设备未知错误 |
| 10001 | audio device not found | 没有找到音频设备 |
| 10002 | video device not found | 没有找到视频设备 |
| 10003 | audio device not allowed | 不允许使用音频设备 |
| 10004 | video device not allowed | 不允许使用视频设备 |
| 10005 | audio device not readable | 没有使用音频设备权限 |
| 10006 | video device not readable | 没有使用视频设备权限 |
| 10007 | device constrained error | 获取设备参数错误 |
| 10010 | screenshare unknown error | 屏幕共享未知错误 |
| 10011 | screenshare not allowed | 不允许屏幕共享 |
| 10012 | screenshare ended | 屏幕共享结束 |
| 10013 | screenshare no permission  | 应用没有屏幕共享的权限 |
| 10018 | screenshare not support  | 不支持屏幕共享 |
| 10101 | http request error | 信令请求失败 |
| 10102 | play fail | 播放失败，默认5秒没有成功返回播放失败 |
| 10110 | not support webrtc | 不支持webrtc |
| 10111 | browser not support | 不支持此浏览器 |
| 10112 | browser version too low | 浏览器版本过低 |
| 10113 | not support h264 | 不支持H264 |
| 10114 | create offer error | create offer 失败 |
| 10125 | html element not match | 订阅内容和传入的媒体类型不匹配 |
| 10201 | auto play failed | 自动播放失败 |
| 10202 | play url error | 播放url协议错误 |
| 10203 | subscribe nothing | 没有订阅任何内容 |
| 10204 | html element error | 订阅传入的HTMLElement不是Audio/Video |
| 10205 | create offer error | 创建offer错误，浏览器不支持RTC |
| 10206 | http request error | http请求失败 |
| 10207 | http request error | answer失败 |
| 10300 | publish url error | 推流url错误 |
| 10301 | publish no audio | 推流缺少音频 |
| 11000 | track type audio | tracktype不存在 |
| 11001 | track kingd error | mediastreamtrack类型错误，比如添加audio，但是传入的是videotrack |
| 11002 | no audio track error | 没有音频流，至少需要一个audiotrack |
| 12000 | peerconnection error | peerconnection |
