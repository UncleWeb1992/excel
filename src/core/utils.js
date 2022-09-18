export function capitalize(string) {
  if (typeof string !== 'string') {
    return ''
  }

  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function range(start, end) {
  if (start > end) {
    [start, end] = [end, start];
  }
  return new Array(end - start + 1)
      .fill('')
      .map((_, i) => start + i);
}

export function nextSelector({row, col}, key) {
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++;
      break;
    case 'Tab':
    case 'ArrowRight':
      col++;
      break;
    case 'ArrowLeft':
      col = col > 0 ? col - 1 : 0;
      break;
    case 'ArrowUp':
      row = row > 0 ? row - 1 : 0;
      break;
  }

  return `[data-key="${row}:${col}"]`;
}
