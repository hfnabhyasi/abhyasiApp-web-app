<template lang="pug">
f7-page(name='practice')
  f7-navbar.capitalize(:title='practice' back-link='Back')
  f7-card
    f7-block
      h1.capitalize  {{ practice }}
      ul
        li(v-for='(step, idx) in Practice[practice]' :key='idx')
          template(v-if='step.prayer')
            div
              p(v-for='(prayerLine, idx2) in step.prayer' :key='idx2' style='text-align:center;margin:0; margin-bottom: 3px;padding:0 !important;')
                i {{ prayerLine }}
          template(v-else='')
            p
              f7-icon(f7='circle' size='16' color='blue')
              span(style='margin-left:7px;') {{ step }}
</template>
<script>
import Practice from "../data/Practice";
export default {
  props: {
    practice: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return { Practice };
  }
};
</script>
<style scoped>
.capitalize {
  text-transform: capitalize;
}
ul {
  padding-bottom: 20px;
  list-style: none;
  padding-left: 5px;
}
</style>
