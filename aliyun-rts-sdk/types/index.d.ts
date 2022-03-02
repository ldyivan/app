
export enum ErrorCode {

  ERROR_DEVICE_UNKNOWNERROR = 10000,
  ERROR_DEVICE_AUDIODEVICE_NOTFOUND = 10001,
  ERROR_DEVICE_VIDEODEVICE_NOTFOUND,
  ERROR_DEVICE_AUDIODEVICE_NOTALLOWED,
  ERROR_DEVICE_VIDEODEVICE_NOTALLOWED,
  ERROR_DEVICE_AUDIODEVICE_NOTREADABLE,
  ERROR_DEVICE_VIDEODEVICE_NOTREADABLE,
  ERROR_DEIVCE_CONSTRAINEDERROR = 10007,

  ERROR_SCREENSHARE_UNKNOWNERRO = 10010,
  ERROR_SCREENSHARE_NOTALLOWED = 10011,
  ERROR_SCREENSHARE_ENDED = 10012,
  ERROR_SCREENSHARE_NOPERMISSION = 10013,
  ERROR_SCREENSHARE_INVALIDACCESS = 10014,

  ERROR_SCREENSHARE_NOTSUPPORT = 10018,
  ERROR_DEVICE_NOTSUPPORT = 10019,


  ERROR_SIGNAL_ERROR = 10101, // 信令请求失败
  ERROR_PLAY_FAILED = 10102,  // 播放失败，默认5秒没成功，返回播放失败

  ERROR_NOTSUPPORT_WEBRTC = 10110,  // 不支持webrtc
  ERROR_BROWSER_NOTSUPPORT = 10111, // 不支持此浏览器
  ERROR_BROWSER_VERSIONLOW = 10112, // 浏览器版本过低
  ERROR_NOTSUPPORT_H264 = 10113,    // 不支持H264
  ERROR_CREATEOFFER = 10114,        // 创建offer错误


  ERROR_HEMLELEMENT_NOTMATCH = 10125, // 订阅的内容和传入的参数不匹配(可能是订阅视频传入的Audio，也可能是订阅音频+视频传入了Audio，也可能是订阅音频传入了Video，此错误不一定会影响播放)


  ERROR_AUTOPLAY_ERROR = 10201,     // 自动播放失败
  ERROR_PLAY_URL = 10202,           // 播放url协议错误
  ERROR_SUBSCRIBE_NOTHING = 10203,  // 参数中设置不订阅视频也不订阅音频
  ERROR_HTMLELEMENT_ERROR = 10204,  // 订阅时候传入的HtmlElement既不是Audio也不是Video
  ERROR_CREATEOFFER_ERROR = 10205,  // 创建offer错误，浏览器不支持RTC
  ERROR_HTTPREQUEST_ERROR = 10206,  // http请求失败
  ERROR_ANSWER_ERROR = 10207,       // answer失败

  ERROR_PUBLISH_URL = 10300,        // 推流url错误
  ERROR_PUBLISH_NOAUDIO = 10301,


  ERROR_MEDIASTREAMTRACK_TYPE_ERROR = 11000,    // TrackType不存在
  ERROR_MEDIASTREAMTRACK_KIND_ERROR = 11001,    // mediastreamtrack类型错误，比如添加audio，但是传入的是videotrack
  ERROR_MEDIASTREAMTRACK_AUDIO_NONE = 11002,    // 没有音频流，至少需要一个audiotrack

  ERROR_PREERCONNECTION_UNKNOWN = 12000,        // pc异常
}

export interface ICommonParam {
  APIVersion: string, // 固定参数
  os: string,         // 系统名称
  osv: string,        // 系统版本
  bt: string,         // 浏览器名称
  bv: string,         // 浏览器版本
  host: string,       // 域名
  uid: string,        // uuid 唯一标识
  tid: string,        // 流标识
  ver: string,        // sdk版本
  ct: string,         // 客户自定义标识
  dt: string,          // 设备类型
  lv: string          // 日志的版本 默认1.0.0
}

export interface IExtraParam {
  msgid: number,
  args?: string
}

export interface IPlayConfig {
  playTimeOut?: number;  // 播放超时的设置，默认是5秒
}

export interface IConfig {
  customTag?: string,
  playConfig?: IPlayConfig, // 播放相关的配置
  customReporter?: (params: ICommonParam & IExtraParam) => any, // 自定义打点函数，每个点位上报都会经过这里
}

declare interface ISupportInfo {
  isReceiveVideo: boolean;
}

declare interface ISupportResult {
  errorCode: number;
  message: string;
}

export interface IAudioConstraints {
  deviceId?: string;
}

export interface IVideoConstraints {
  deviceId ?: string;
  width ?: number;
  height ?: number;
}

export interface IStreamConfig {
  audio: IAudioConstraints | boolean,
  video?: IVideoConstraints | boolean,
  screen?: boolean,
}

export declare class RemoteStream {
  audioTrack ?: MediaStreamTrack;
  videoTrack ?: MediaStreamTrack;
  traceId ?: string;
  muted: boolean;

  getMediaStream (): MediaStream | undefined;
  play (element: HTMLMediaElement): void;
  stop (): void;
}


export declare class LocalStream {
  audioTrack ?: MediaStreamTrack;
  videoTrack ?: MediaStreamTrack;
  traceId ?: string;
  muted: boolean;

  getMediaStream (): MediaStream | undefined;
  play (element: HTMLMediaElement): void;
  stop (): void;

  setVideoProfile (paofile: string): void;
  setScreenProfile (profile: string): void;

  enableAudio (): boolean;
  disableAudio (): boolean;

  enableVideo (): boolean;
  disableVideo (): boolean;
}


export class RtsClient {
  /**
   * 获取版本号
   */
  getVersion ():string;

  /**
   * 判断当前环境是否支持RTS
   */
  isSupport (supportInfo: ISupportInfo): Promise<ISupportResult>;

  subscribe(pullStreamUrl: string): Promise<RemoteStream>;

  unsubscribe (): void;

  publish (url: string, stream: LocalStream): Promise<any>;

  unpublish (): Promise<void>;
}

export class AliRTS {

  static getMicList (): Promise<Array<MediaDeviceInfo>>;

  static getCameraList (): Promise<Array<MediaDeviceInfo>>;

  static createStream (config: IStreamConfig): Promise<LocalStream>;

  static createClient (config: IConfig): RtsClient;
}

