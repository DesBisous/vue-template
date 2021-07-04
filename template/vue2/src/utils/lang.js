import VueI18n from 'vue-i18n';
import { getLangCode, setCookie } from '@hst/utils';
import { deepObjectMerge } from '@/utils/common';
import { langType, locales/* vant util import vantLocales config */ } from '@/data/lang';

function saveLangToStatic(lang) {
  if (!lang) return;
  setCookie('lang', lang); // 将语言保存在 cookie 中
}

/**
 * getLang
 */
export function getLang(lang = getLangCode()) {
  // 个别项目可能没有英文，可以在这里将英文环境输出繁体
  return lang;
}

/**
 * setLang
 */
export function setLang(i18n, lang = langType.zhCN) {
  const isExist = Object.values(langType).includes(lang);
  if (!isExist || !(i18n instanceof VueI18n)) return;
  /* vant util set lang config */
  // 设置 vue-i18n 语言
  const locale = i18n.locale;
  if (locale !== lang) {
    i18n.locale = lang;
    saveLangToStatic(lang);
  }
}

/**
 * 获取语言集合
 */
export function getMessages() {
  return deepObjectMerge(/* vant util merge vantLocales config */locales);
}
