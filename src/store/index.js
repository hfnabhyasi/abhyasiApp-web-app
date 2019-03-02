import Vue from 'vue';
import Vuex from 'vuex';
import android from './android';

const store = {
  modules:{
    android
  }
}

Vue.use(Vuex);
export default new Vuex.Store(store);
