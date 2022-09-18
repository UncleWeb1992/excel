import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template';
import {resizeHandler} from './tableResize';
import {TableSelection} from './TableSelection';
import {$} from '../../core/dom';
import {nextSelector, range} from '../../core/utils';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
    this.unsubs = [];
  }
  toHTML() {
    return createTable(30);
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init();
    this.selectCell(this.$root.findOnce('[data-key="0:0"]'));
    this.$on('Formula:input', (text) => {
      this.selection.current.text(text);
    });
    this.$on('Formula:enter', () => {
      this.selection.current.focus();
    })
  }

  selectCell($cell) {
    this.selection.selecet($cell);
    this.$emit(`${this.name}:select`, $cell);
  }

  onInput(e) {
    this.$emit(`${this.name}:input`, $(e.target));
  }

  onMousedown(e) {
    const target = $(e.target);
    const dataKey = target.$el.dataset.key;
    if (target.$el.dataset.resize) {
      resizeHandler(this.$root, e);
    } else if (dataKey) {
      const $cell = this.$root.findOnce(`[data-key="${dataKey}"]`);
      if (!e.shiftKey) {
        this.selection.selecet($cell);
      } else {
        const currentKey = this.selection.current.id(true);
        const targetKey = target.id(true);
        const cols = range(currentKey.col, targetKey.col);
        const rows = range(currentKey.row, targetKey.row);
        const ids = cols.reduce((acc, col) => {
          rows.forEach((row) => {
            acc.push(`${row}:${col}`);
          })
          return acc;
        }, []);

        const $cells = ids.map((id) => this.$root.findOnce(`[data-key="${id}"]`));
        this.selection.selectGroup($cells);
      }
    }
  }

  onKeydown(e) {
    const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ArrowUp'];
    const {key} = e;

    if (keys.includes(key) && !e.shiftKey) {
      e.preventDefault();
      const id = this.selection.current.id(true);
      const $next = this.$root.findOnce(nextSelector(id, key));
      this.selectCell($next);
    }
  }
}

