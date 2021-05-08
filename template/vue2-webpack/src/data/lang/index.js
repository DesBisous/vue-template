import { importAll } from '@/utils/common';

export const locales = importAll(require.context('./locales', false, /\.js$/));

export const langType = {
  enUS: 'en_us',
  zhHK: 'zh_hk',
  zhCN: 'zh_cn',
};

/* vant data lang config */