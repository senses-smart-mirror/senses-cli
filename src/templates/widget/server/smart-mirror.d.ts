// smart-mirror.d.ts

declare namespace SmartMirror {

  // declare global `WidgetConfig` interface
  interface IWidgetConfig {
    id?: string;
    name: string;
    icon: string;
    settings: ISetting[];
  
    speech?: string | ISpeechConfig[];
    helper?: any;
    version?: string;
    custom?: boolean;
    author?: string;
    link?: string;
    url?: string;
    isLoading?: boolean;
    hide?: boolean;
  }
}

// declare `Option` interface
interface IOption {
  name: string;
  value: string;
}

// declare `BasicSettings` interface
interface IBasicSetting {
  name: string;
  value: string | number | boolean | undefined;
  valueLabel?: string | number | boolean | undefined;
}

// declare global `Setting` interface
interface ISetting {
  name: string;
  label: string;
  type: string;
  description: string;

  scramble?: boolean;
  placeholder?: string;
  link?: string;
  value?: string | number | boolean | undefined | string[];
  defaultValue?: string | boolean | number;
  options?: IOption[];
  items?: any[];
  disabled?: boolean;
  displayOnly?: boolean;
  order?: number;
  min?: number;
  max?: number;
  buttonLabel?: string;
  listLabel?: string;
  hide?: boolean;
  validation?: {[key:string]: string | number};
  socketInfo?: {emitter: string, subscribe: string};
  dependsOn?: string;
  optionsProperty?: string[];
}

// declare `SpeechConfig` interface
interface ISpeechConfig {
  text: string;
  functionName: string;
  function?: Function;
  speechValue?: string | number;
}

// declare global abstract class `WidgetHelper`
declare abstract class WidgetHelper {

  constructor(data: any);
  
  /**
  * @save
  * Saves (strores) widget in active profile configuration file
  * 
  * @returns void
  */
  save(): void;

  /**
  * @addSpeechListeners
  * Adds a listener to the speech module. 
  * 
  * @param {functionName: string, function: Function} data - data object with function name and reference to the function.
  * @returns void
  */
  addSpeechListeners(data: {functionName: string, function: Function }): void;

  /**
  * @getSettingValue
  * Returns the setting based on the name of the setting
  * 
  * @param {string} name - name of the setting 
  * @returns ISetting
  */
  getSetting(name: string): ISetting; 

  /**
  * @getSettingValue
  * Returns the value of a setting by provided the name of the setting.
  * 
  * @param {string} name - name of the setting 
  * @returns any
  */
  getSettingValue(name: string): any;

/**
  * @getVersion
  * Returns the version of the Smart Mirror.
  * 
  * @returns string
  */
  getVersion(): string;

  getId(): string;

  getName(): string;

  clearCache(): void;

  addToCache(item: {timestamp: number, data: object}): void;

  addToCacheById(item: any): void;

  getFromCacheById(id: string | number): object;

  addSocketListener(name: string, callback: Function): void;

  addGlobalListener(name: string, callback: Function): void;

  addGetRoute(path: string, handler: Function): void;

  addPostRoute(path: string, handler: Function): void

  sendResponse(res: Response, status: number, data: any): Response

  addEmitter(name: string, data: any): void;

  addGlobalEmitter(name: string, data: any): void;

  updateSetting(setting: object): void;

  getProfile(): object;

  getFromCache(): {name: string, id: string, data: any}

  afterReload(data: any): void;

  afterStart(data: any): void;

  afterStop(data: any): void;

}

declare var Logger: any;