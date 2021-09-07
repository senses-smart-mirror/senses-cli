
/*
* Smart Mirror Widget
*
* [ .. name here .. ]
* [ .. short description here .. ]
*/

class {{simpleName}} extends WidgetHelper {

  /**
   * name of the widget
   *
   * @type {string}
   * @public
  */
  name: string = "{{simpleName}}";

  /**
   * @constructor
   *
   * @param {any} data - widget data
  */
  constructor(data: any) {
    super(data);

    this._addSocketListener();
  }

  /**
   * @_addSocketListener
   *
   * Put your socket listeners in this method.
   *
   * @private
  */
  _addSocketListener() { }

  /**
   * @afterStart
   *
   * Method to be called after the widget is started.
   *
   * @param {any} widgetData - full widget settings object
   * @public
  */
  afterStart(widgetData: any) {
    console.log(`Widget Data: ${this.name}`, widgetData);
  }

  /**
   * @afterStop
   *
   * Method to be called after the widget is stopped.
   *
   * @param {any} widgetData - full widget settings object
   * @public
  */
  afterStop() { }

  /**
   * @afterReload
   *
   * Method to be called after the widget is reloaded.
   *
   * @param {any} widgetData - full widget settings object
   * @public
  */
  afterReload() { }
}

export default {{simpleName}};
