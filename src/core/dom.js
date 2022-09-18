class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector;
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    }

    return this.$el.outerHTML.trim();
  }

  clear() {
    this.html('');
    return this;
  }

  on(eventType, fn) {
    this.$el.addEventListener(eventType, fn);
  }

  off(eventType, fn) {
    this.$el.removeEventListener(eventType, fn);
  }

  focus() {
    this.$el.focus();
    return this;
  }

  text(value) {
    if (typeof value === 'string') {
      this.$el.textContent = value;
      return this;
    }

    if (this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.value.trim();
    }

    return this.$el.textContent.trim();
  }

  get data() {
    return this.$el.dataset;
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el;
    }
    if (Element.prototype.append) {
      this.$el.append(node);
    } else {
      this.$el.appendChild(node);
    }

    return this;
  }

  closest(selector) {
    return $(this.$el.closest(selector));
  }

  findOnce(selector) {
    return $(this.$el.querySelector(selector));
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }

  getCoords() {
    return this.$el.getBoundingClientRect();
  }

  id(parse) {
    if (parse) {
      const parsed = this.id().split(':');
      return {
        row: +parsed[0],
        col: +parsed[1],
      }
    }
    return this.data.key;
  }

  addClass(className) {
    this.$el.classList.add(className);
  }

  removeClass(className) {
    this.$el.classList.remove(className);
  }

  css(styles = {}) {
    Object.keys(styles).forEach((key) => {
      this.$el.style[key] = styles[key];
    })
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, className = ``) => {
  const el = document.createElement(tagName);

  if (className) {
    el.classList.add(className);
  }

  return $(el);
}
