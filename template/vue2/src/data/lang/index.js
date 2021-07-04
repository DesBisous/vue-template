import { importAll } from '@/utils/common';

export const locales = importAll(require.context('./locales', false, /\.json$/), /\.json$/, key =>
  key.replace('-', '_')
);

export const langType = {
  enUS: 'en_US',
  zhHK: 'zh_HK',
  zhCN: 'zh_CN',
};
/* vant data lang config */
/* antdv data lang config */