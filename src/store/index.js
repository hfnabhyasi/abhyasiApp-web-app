import Vue from 'vue';
import Vuex from 'vuex';
//
import env from './env';
import android from './android';
import persistentData from './persistentData';

const store = {
  modules:{
    android,
    env,
    persistentData
  }
}

Vue.use(Vuex);
export default new Vuex.Store(store);
