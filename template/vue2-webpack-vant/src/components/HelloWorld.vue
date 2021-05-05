<template>
  <div class="hello">
    <p>{{ msg }}</p>
    <p>{{ $t('welcome') }}</p>
    <van-button type="primary" @click="changeLanguage">变更语言</van-button>
    <van-pagination :total-items="24" :items-per-page="5" />
    <SvgIcon class="icon" icon="camera" />
    <img src="@/assets/images/404.png" alt="404" srcset="" />
  </div>
</template>

<script>
import SvgIcon from '@/components/Icon/SvgIcon.vue';
import { setLang } from '@/utils/lang';
import { userApi } from '@/api';

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  components: {
    SvgIcon,
  },
  methods: {
    changeLanguage() {
      if (this.$i18n.locale == 'en_us') {
        setLang(this.$i18n, 'zh_cn');
      } else {
        setLang(this.$i18n, 'en_us');
      }
      console.log(this.$i18n.locale);
    },
    async getUser() {
      const res = await userApi.getUser('123456');
      console.log(res);
    },
  },
  mounted() {
    this.getUser();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
p {
  color: #42b983;
  margin: 16px 0;
}
img {
  display: block;
  margin: auto;
  width: 50%;
}
</style>
