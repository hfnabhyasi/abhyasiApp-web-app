<template>
  <f7-page name="practice">
    <f7-navbar title="Practice/Abhyaas" back-link="Back"> </f7-navbar>
    <f7-card>
      <f7-list>
        <f7-list-item
          v-for="(item, idx) in PracticePageListItems"
          :title="item.title"
          :link="item.link"
          :key="idx"
          no-chevron
        ></f7-list-item>
      </f7-list>
    </f7-card>
  </f7-page>
</template>
<script>
import PracticePageListItems from "../data/PracticePageListItems";
export default {
  data() {
    return {
      PracticePageListItems
    };
  }
};
</script>
