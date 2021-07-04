<template>
  <div class="about">
    About page
    <p>{{ $t('locale') }}</p>
    <button class="info" @click="changeLanguage">变更语言</button>
    <img src="@/assets/images/404.png" alt="404" srcset="" />
  </div>
</template>

<script>
import { setLang } from '@/utils/lang';
import { langType } from '@/data/lang';

export default {
  name: 'About',
  i18n: {
    messages: {
      [langType.enUS]: { locale: 'Local language' },
      [langType.zhHK]: { locale: '本地语言' },
      [langType.zhCN]: { locale: '本地语言' },
    },
  },
  methods: {
    changeLanguage() {
      if (this.$i18n.locale == 'en_US') {
        setLang(this.$i18n, 'zh_CN');
      } else {
        setLang(this.$i18n, 'en_US');
      }
    },
  },
};
</script>
<style lang="less" scoped>
.about {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px 15px;
}

img {
  display: block;
  margin: 56px auto 24px;
  width: 50%;
}

button {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  height: 36px;
  margin: 0;
  line-height: 1.2;
  text-align: center;
  border-radius: 2px;
  cursor: pointer;
  padding: 0 15px;
  font-size: 14px;
  -webkit-transition: opacity 0.2s;
  transition: opacity 0.2s;
  -webkit-appearance: none;

  &.info {
    color: #FFFFFF;
    background-color: #1989FA;
    border: 1px solid #1989FA;
  }
}
</style>
