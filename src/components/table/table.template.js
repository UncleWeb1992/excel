const CharCodes = {
  A: 65,
  Z: 90,
}

function createCell() {
  return '<div class="cell"></div>'
}

function createCol(el) {
  return `<div class="column">${el}</div>`
}

function createRow(content, index) {
  return `
    <div class="row">
        <div class="row-info">${index ? index : ''}</div>
        <div class="row-data">${content}</div>
    </div>
  `;
}

function toChar(_, index) {
  return String.fromCharCode( CharCodes.A + index);
}

export function createTable(rowscount = 10) {
  const columnsCount = CharCodes.Z - CharCodes.A + 1;
  const rows = [];

  const columns = new Array(columnsCount)
      .fill('')
      .map(toChar)
      .map(createCol)
      .join('')

  const cell = new Array(columnsCount)
      .fill('')
      .map(createCell)
      .join('');

  rows.push(createRow(columns));


  for (let i = 0; i < rowscount; i++) {
    rows.push(createRow(cell, i + 1));
  }
  return rows.join('');
}
