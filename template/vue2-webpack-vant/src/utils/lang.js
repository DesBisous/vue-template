import qs from 'qs';
import VueI18n from 'vue-i18n';
import store from '@/store';
import { inApp } from '@hst/utils';
import { Locale } from 'vant';
import { getCookie, setCookie } from '@/utils/cookie';
import { deepObjectMerge } from '@/utils/common';
import { langType, locales, vantLocales } from '@/data/lang';

function saveLangToStatic(lang) {
  if (!lang) return;
  setCookie('lang', lang); // 将语言保存在 cookie 中
  store.dispatch('global/setLang', lang); // 保存在 vuex
}

/**
 * 通过 url、cookie、navigator 获取语言
 */
export function getQueryLang() {
  let lang = langType.zhCN; // 默认简体中文
  // 获取 url 语言
  const urlLang = qs.parse(window.location.search.replace(/^\?/, '')).lang;
  // 获取 cookie 语言
  const cookieLang = getCookie('lang');
  // 获取系统语言
  const navigatorLang = navigator.language || navigator.browserLanguage;
  lang = urlLang || cookieLang || navigatorLang;
  lang = lang.toLocaleLowerCase().replace('-', '_');
  const isExist = Object.values(langType).includes(lang);
  lang = isExist ? lang : langType.zhCN;
  saveLangToStatic(lang);
  return lang;
}

/**
 * 获取 UA 语言类型
 */
export function getUAgentLang() {
  let lang = langType.zhCN; // 默认简体中文
  const UA = window.navigator.userAgent.toLocaleLowerCase();
  let regExp = 'lang/(';
  Object.values(langType).forEach(lang => {
    regExp += `${lang}|`;
  });
  regExp = regExp.substr(0, regExp.length - 1) + ')';
  const regx = new RegExp(regExp, 'g');
  const result = regx.exec(UA);
  lang = result ? result[1] : lang;
  return lang;
}

/**
 * 整合获取 lang
 */
export function getLang() {
  return inApp() ? getUAgentLang() : getQueryLang();
}

/**
 * setLang
 */
export function setLang(i18n, lang = langType.zhCN) {
  const isExist = Object.values(langType).includes(lang);
  if (!isExist || !(i18n instanceof VueI18n)) return;
  // 设置 vant 语言
  const vantLangLib = vantLocales[lang];
  const vantLangArray = lang.split('_');
  const vantLang =
    vantLangArray[0] + '_' + vantLangArray[1].toLocaleLowerCase();
  Locale.use(vantLang, vantLangLib);
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
  return deepObjectMerge(vantLocales, locales);
}
