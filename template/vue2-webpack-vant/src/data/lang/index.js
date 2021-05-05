import { importAll } from '@/utils/common';
import vantEnUS from 'vant/lib/locale/lang/en-US';
import vantZhCN from 'vant/lib/locale/lang/zh-CN';
import vantZhHK from 'vant/lib/locale/lang/zh-HK';

export const locales = importAll(require.context('./locales', false, /\.js$/));

export const langType = {
  enUS: 'en_us',
  zhHK: 'zh_hk',
  zhCN: 'zh_cn',
};

export const vantLocales = {
  [langType.enUS]: vantEnUS,
  [langType.zhHK]: vantZhHK,
  [langType.zhCN]: vantZhCN,
};
