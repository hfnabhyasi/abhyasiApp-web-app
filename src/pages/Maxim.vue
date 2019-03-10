<template lang="pug">
f7-page(name='login')
  //- NAVBAR
  f7-navbar(:title='maximsData.maxims[maxim].properties.title' back-link='Back')
  //- SHEET FOR SETTING NOTIFICATIONS
  f7-sheet.demo-sheet(:opened='sheetOpened' @sheet:closed='sheetOpened = false')
    f7-toolbar
        div.left
          span(style='padding-left:10px;')
            f7-toggle(value='reminderStatus' color='blue' @toggle:change='reminderToggled')
        div.right
          f7-link(sheet-close='' @click='resetReminder()') DONE
    f7-page-content
      f7-block
        p Every {{ reminderHours }} hours for next {{ reminderDays }} day(s).
        f7-list(inline-labels no-hairlines-md)
          f7-list-input(label='Hours' type='select' default-value='2' :value='reminderHours' placeholder='Please choose...'  @input='reminderHours = $event.target.value')
            f7-icon(slot='media' f7='calendar')
            option(value='1')  1
            option(value='2')  2
            option(value='3')  3

          f7-list-input(label='Days' type='select' default-value='2' :value='reminderDays' placeholder='Please choose...' @input='reminderDays = $event.target.value')
            f7-icon(slot='media' f7='time')
            option(value='1')  1
            option(value='2')  2
            option(value='3')  3
  //- MAXIM CARD
  f7-card(v-if='maxim')
    div(style='text-align:right; padding:10px; padding-bottom:0px;')
      f7-link(@click='sheetOpened = true')
        f7-icon(f7='bell_off')
    f7-block
      h1 {{ maximsData.maxims[maxim].properties.title }}
      p
        b
          i  {{ maximsData.maxims[maxim].properties.content }}
</template>
<script>
import maximsData from "../data/10Maxims";

export default {
  props: {
    maxim: {
      type: String,
      default: ""
    }
  },
  data() {
    return { maximsData, sheetOpened: false, reminderStatus: false, reminderDays: 2, reminderHours:2 };
  },
  methods: {
    resetReminder,
    reminderToggled
  }
};

function reminderToggled(reminderTurnedOn) {
  if(reminderTurnedOn) this.reminderStatus = true
  else this.reminderStatus = false
}

function resetReminder() {
  if (device.platform === 'Android') resetNotificationForAndroid().apply(this);
}

function resetNotificationForAndroid() {
  discardPreviousNotification.apply(this);
  setNewReminder.apply(this);
}

function setNewReminder() {
  const _this = this;
  cordova.plugins.notification.local.schedule({
    title: _this.maximsData.maxims[maxim].properties.title,
    text:  _this.maximsData.maxims[maxim].properties.content
  });
}

function discardPreviousNotification() {

}

</script>
<style media="screen" scoped>
div.card {
  padding-bottom: 20px;
}
</style>
