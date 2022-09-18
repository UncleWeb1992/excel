const CharCodes = {
  A: 65,
  Z: 90,
}

function createCell(row) {
  return function(_, col) {
    return `<div data-id="${col}" data-key="${row}:${col}" class="cell" contenteditable="true"></div>`;
  }
}

function createCol(el, index) {
  return `
    <div id="${index}" class="column" data-type="resizable">
      ${el}
      <div class="column-resize" data-resize="column"></div>
    </div>`
}

function createRow(content, index) {
  return `
    <div class="row" data-type="resizable">
      <div class="row-info">
        ${index ? index : ''}
        ${index ? '<div class="row-resize" data-resize="row"></div>' : ''}
      </div>
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

  rows.push(createRow(columns));

  for (let i = 0; i < rowscount; i++) {
    const cell = new Array(columnsCount)
        .fill('')
        .map(createCell(i))
        .join('');
    rows.push(createRow(cell, i + 1));
  }
  return rows.join('');
}
