import Vue from 'vue'
import Vuex from 'vuex'
import Firebase from 'firebase'
import createPersistedState from "vuex-persistedstate";


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userA: null,
  },
  plugins: [createPersistedState()],
  getters:{
    getUserA: (state) => { return state.userA; }
  },
  mutations: {
    setUserA: state => { state.userA = Firebase.auth().currentUser; }
  },
  actions: {
  },
  modules: {
  }
})
