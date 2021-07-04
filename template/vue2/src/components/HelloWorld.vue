<template>
  <div class="hello">
    <SvgIcon class="logo-icon" icon="logo" width="50vw" height="50vw" />
    <p>{{ $t('welcome') }}</p>
    <button class="info" @click="changeLanguage">
      变更语言
    </button>
    <input type="text" value="Directive 栗子🌰" v-debounce="directive" />
    <div class="svg-warp">
      <span>SVG 案例</span>
      <SvgIcon class="icon" icon="camera" />
    </div>
  </div>
</template>

<script>
import SvgIcon from '@/components/Icon/SvgIcon.vue';
import { setLang } from '@/utils/lang';
import { userApi } from '@/api';
import { tryCatchAjax } from '@/utils/http';

export default {
  name: 'HelloWorld',
  components: {
    SvgIcon,
  },
  methods: {
    changeLanguage() {
      if (this.$i18n.locale == 'en_US') {
        setLang(this.$i18n, 'zh_CN');
      } else {
        setLang(this.$i18n, 'en_US');
      }
    },
    async getUser() {
      await tryCatchAjax(userApi.getUser('123456'), res => {
        console.log(res);
      });
    },
    directive() {
      console.log('Directive 栗子🌰');
    },
  },
  mounted() {
    this.getUser();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.hello {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

p {
  margin: 0 0 16px;
  text-align: center;
  height: 40px;
}

.logo-icon {
  margin: 32px 0 24px;
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

input {
  display: block;
  box-sizing: border-box;
  width: 50%;
  min-width: 0;
  margin: 30px auto 0;
  padding: 6px 10px 7px;
  color: #323233;
  line-height: inherit;
  text-align: left;
  background-color: transparent;
  border: 1px solid #DDDDDD;
  resize: none;
  border-radius: 4px;
  font-size: 16px;
}

.svg-warp {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px 0;

  span {
    font-size: 16px;
    margin-bottom: 10px;
  }
}
</style>
