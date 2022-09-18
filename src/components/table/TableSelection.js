export class TableSelection {
  #className = 'selected';
  constructor() {
    this.group = [];
    this.current = null;
  }

  selecet($el) {
    this.clear();
    this.group.push($el);
    this.current = $el;
    $el.focus().addClass(this.#className);
  }

  clear() {
    this.group.forEach(($c) => $c.removeClass(this.#className));
    this.group = [];
  }

  selectGroup($group = []) {
    this.clear()
    this.group = $group;
    this.group.forEach(($el) => $el.addClass(this.#className));
  }
}
