import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { getLang } from '@/utils/lang';
import { langType } from '@/data/lang';
import { setLang, getMessages } from '@/utils/lang';

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: getLang(), // 定义默认语言为中文
  messages: getMessages(),
  fallbackLocale: langType.zhCN,
  formatFallbackMessages: true,
});

setLang(i18n, i18n.locale);

export default i18n;
