import { isNumber, debounce } from '@hst/utils';
import { addEvent, isFunction, removeEvent } from '@/utils/common';

const dictMap = new Map();

function saveDicMap(el, key, value) {
  const obj = dictMap.has(el) ? dictMap.get(el) : {};
  const val = obj[key] ? obj[key] : new Set();
  val.add(value);
  obj[key] = val;
  dictMap.set(el, obj);
}

function removeDicMap(el) {
  if (!dictMap.has(el)) return;
  const obj = dictMap.get(el);
  const keys = Object.keys(obj);
  keys.forEach(skey => {
    obj[skey].clear();
    obj[skey] = null;
  });
  dictMap.delete(el);
}

function removeAllEvent(el) {
  if (!dictMap.has(el)) return;
  const obj = dictMap.get(el);
  const keys = Object.keys(obj);
  keys.forEach(skey => {
    const val = obj[skey];
    val.forEach(sval => removeEvent(el, skey, sval));
  });
}

function getDefalutEvent(el, modifiers) {
  let event = null;
  const nodeName = el.nodeName;
  const keys = Object.keys(modifiers).reverse();
  const key = keys.length > 0 ? keys[0].toLocaleLowerCase() : '';
  if (['BUTTON'].includes(nodeName)) {
    event = 'click';
  }
  if (['INPUT'].includes(nodeName)) {
    event = 'input';
  }
  switch (key) {
    case 'click':
      event = 'click';
      break;
    case 'input':
      event = 'input';
      break;
    default:
      break;
  }
  return event;
}

// 防抖
function vDebounce(Vue) {
  Vue.directive('debounce', {
    bind: (el, binding) => {
      const { value, arg, modifiers } = binding;
      const event = getDefalutEvent(el, modifiers);
      const timeout = isNumber(arg) ? Number(arg) : 2000;
      const immediate = modifiers.immediate;
      const func = isFunction(value) ? debounce(value, timeout, immediate) : null;
      if (!func) return;
      addEvent(el, event, func);
      saveDicMap(el, event, func);
    },
    unbind(el) {
      removeAllEvent(el);
      removeDicMap(el);
    },
  });
}

export default function(Vue) {
  vDebounce(Vue);
}
