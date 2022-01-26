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

  /**
  * @getId
  * Returns the ID of the widget
  *
  * @returns string
  */
  getId(): string;

  /**
  * @getName
  * Returns the name of the widget
  *
  * @returns string
  */
  getName(): string;

  /**
  * @clearCache
  * Clear the widget cache
  *
  * @returns void
  */
  clearCache(): void;

  /**
  * @addToCache
  * Add data from the widget to the global cache.
  *
  * @param {timestamp: number, data: object} item - cache item
  * @returns void
  */
  addToCache(item: {timestamp: number, data: object}): void;

  /**
  * @addToCacheById
  * Add data from widget to the global cache by id
  *
  * @param {timestamp: number, data: object, id: string} item - cache item
  * @returns void
  */
  addToCacheById(item: {timestamp: number, data: object, id: string}): void;

  /**
  * @getFromCacheById
  * Remove data from global cache by given ID
  *
  * @param {id: number | string} id - cache item id
  * @returns object
  */
  getFromCacheById(id: string | number): object;

  /**
  * @addSocketListener
  * Add socket listener from widget to the global scope
  *
  * @param {string} name - listener name
  * @param {Function} callback - listener callback
  * @returns void
  */
  addSocketListener(name: string, callback: Function): void;

  addGlobalListener(name: string, callback: Function): void;

  addGetRoute(path: string, handler: Function): void;

  addPostRoute(path: string, handler: Function): void

  sendResponse(res: Response, status: number, data: any): Response

  addEmitter(name: string, data: any): void;

  addGlobalEmitter(name: string, data: any): void;

  updateSetting(setting: object): void;

  /**
  * @getProfile
  * Returns current active profile
  *
  * @returns void
  */
  getProfile(): object;

  /**
  * @getFromCache
  * Returns widget cache data
  *
  * @returns {name: string, id: string, data: any}
  */
  getFromCache(): {name: string, id: string, data: any}

  /**
  * @afterReload
  * Callback function that gets triggered after the widget is reloaded
  *
  * @param {any} data - widget configuration data
  * @returns void
  */
  afterReload(data: any): void;

  /**
  * @afterStart
  * Callback function that gets triggered after the widget is started
  *
  * @param {any} data - widget configuration data
  * @returns void
  */
  afterStart(data: any): void;

  /**
  * @afterStop
  * Callback function that gets triggered after the widget is stopped
  *
  * @param {any} data - widget configuration data
  * @returns void
  */
  afterStop(data: any): void;

}

declare var Logger: any;
