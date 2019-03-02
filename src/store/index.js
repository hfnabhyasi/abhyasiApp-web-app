import Vue from 'vue';
import Vuex from 'vuex';
//
import env from './env';
import android from './android';

const store = {
  modules:{
    android,
    env
  }
}

Vue.use(Vuex);
export default new Vuex.Store(store);
