<template>
  <a-config-provider :locale="locale">
    <slot></slot>
  </a-config-provider>
</template>

<script>
import { antdvLocales } from '@/data/lang';
import moment from 'moment';

export default {
  name: 'index',
  computed: {
    locale() {
      const momentLocale = this.$i18n.locale
        ? this.$i18n.locale.toLocaleLowerCase().replace('_', '-')
        : 'zh-cn';
      moment.locale(momentLocale);
      return antdvLocales[this.$i18n.locale];
    },
  },
};
</script>
