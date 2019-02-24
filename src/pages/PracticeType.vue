<template>
  <f7-page name="practice">
    <f7-navbar
      class="capitalize"
      :title="practice"
      back-link="Back"
    />
    <f7-card>
      <f7-block>
        <h1 class="capitalize">
          {{ practice }}
        </h1>
        <ul>
          <li
            v-for="(step, idx) in Practice[practice]"
            :key="idx"
          >
            <template v-if="step.prayer">
              <div>
                <p
                  v-for="(prayerLine, idx2) in step.prayer"
                  :key="idx2"
                  style="text-align:center;margin:0; margin-bottom: 3px;padding:0 !important;"
                >
                  <i>{{ prayerLine }}</i>
                </p>
              </div>
            </template>
            <template v-else>
              <p>
                <f7-icon
                  f7="circle"
                  size="16"
                  color="blue"
                />
                <span style="margin-left:7px;">
                  {{ step }}
                </span>
              </p>
            </template>
          </li>
        </ul>
      </f7-block>
    </f7-card>
  </f7-page>
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
