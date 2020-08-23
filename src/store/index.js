import Vue from 'vue'
import Vuex from 'vuex'

import base from '@/store/base';
import login from '@/store/login';
import project from '@/store/project';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    base,
    login,
    project,
  },
  strict: false,
});
