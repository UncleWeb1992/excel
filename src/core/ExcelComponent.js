import {DomListener} from './DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.prepare();
    this.emitter = options.emitter;
    this.unsubs = [];
  }
  toHTML() {
    return '';
  }

  prepare() {

  }

  init() {
    this.initDomListeners()
  }

  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubs.push(unsub);
  }

  destroy() {
    this.removeDomListeners();
    this.unsubs.forEach((unsub) => unsub());
  }
}
