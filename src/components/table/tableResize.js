import {$} from '../../core/dom';

export function resizeHandler($root, e) {
  const $resizer = $(e.target);
  const $parent = $resizer.closest('[data-type="resizable"]');
  const $table = $resizer.closest('.excel__table');
  const typeResize = e.target.dataset.resize;
  const parentId = $parent.$el.id;
  const coords = $parent.getCoords();
  $resizer.css({opacity: 1});
  let delta;

  document.onmousemove = (e) => {
    if (typeResize === 'column') {
      delta = Math.floor(e.pageX - coords.right);
      $resizer.css({right: -delta + 'px', height: $table.getCoords().height + 'px'});
    } else {
      delta = Math.floor(e.pageY - coords.bottom);
      $resizer.css({bottom: -delta + 'px', width: $table.getCoords().width + 'px'});
    }
  }

  document.onmouseup = () => {
    if (typeResize === 'column') {
      $resizer.css({opacity: 0, right: 0, height: '100%'});
      $parent.css({width: coords.width + delta + 'px'});
      $root.findAll(`[data-id="${parentId}"]`).forEach((el) => {
        el.style.width = coords.width + delta + 'px';
      })
    } else {
      $resizer.css({opacity: 0, bottom: 0, width: '100%'});
      $parent.css({height: coords.height + delta + 'px'});
    }
    document.onmousemove = null;
    document.onmouseup = null;
  }
}
