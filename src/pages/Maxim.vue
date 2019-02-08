<template>
  <f7-page name="login">
    <f7-navbar
      :title="maximsData.maxims[maxim].properties.title"
      back-link="Back"
    >
    </f7-navbar>
    <f7-card v-if="maxim">
      <f7-block>
        <h1>{{ maximsData.maxims[maxim].properties.title }}</h1>
        <p>
          <b>
            <i> {{ maximsData.maxims[maxim].properties.content }} </i>
          </b>
        </p>
      </f7-block>
    </f7-card>
  </f7-page>
</template>
<script>
import maximsData from "../data/10Maxims";

export default {
  data() {
    return { maximsData };
  },
  props: ["maxim"]
};
</script>
<style media="screen" scoped>
div.card {
  padding-bottom: 20px;
}
</style>
