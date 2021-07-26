import Vue from 'vue';
import Skeleton1 from './Skeleton1';
import Skeleton2 from './Skeleton2';

export default new Vue({
  components: {
    Skeleton1,
    Skeleton2,
  },
  template: `
        <div style="height: 100%; padding: 15px; ">
            <Skeleton1 id="Skeleton1" style="display:none"/>
            <Skeleton2 id="Skeleton2" style="display:none"/>
        </div>
    `,
});
