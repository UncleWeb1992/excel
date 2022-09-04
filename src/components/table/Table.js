import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template';
import {resizeHandler} from './tableResize';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      listeners: ['click', 'mousedown'],
    });
  }
  toHTML() {
    return createTable(30);
  }

  onClick({target}) {
    const cellList = document.querySelectorAll('.cell');
    cellList.forEach((el) => {
      el.classList.remove('selected');
    })
    target.classList.add('selected');
  }

  onMousedown({target}) {
    if (target.dataset.resize) {
      resizeHandler(this.$root, target);
    }
  }
}
