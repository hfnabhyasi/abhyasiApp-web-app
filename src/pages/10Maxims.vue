<template lang="pug">
f7-page(name='login')
  f7-navbar(title='10 Maxims' back-link='Back')
  f7-card
    f7-list
      f7-list-item(
        v-for='(maxim, idxProp) in maximsData.maxims'
        :key='idxProp'
        :title='maxim.properties.title'
        :link='`/maxims/${idxProp}`'
        no-chevron=''
      )
</template>
<script>
import maximsData from "../data/10Maxims";

export default {
  data() {
    return { maximsData };
  }
};
</script>
