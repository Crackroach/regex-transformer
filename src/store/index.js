import Vue from 'vue'
import Vuex from 'vuex'
//import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex);


// Load store modules dynamically.
const requireContext = require.context('./modules', false, /.*\.js$/)

const modules = requireContext.keys()
    .map(file =>
        [file.replace(/(^.\/)|(\.js$)/g, ''), requireContext(file)]
    )
    .reduce((modules, [name, module]) => {
        if (module.namespaced === undefined) {
            module.namespaced = true
        }

        return { ...modules, [name]: module }
    }, {})

export default new Vuex.Store({
    //plugins: [createPersistedState({ storage: window.localStorage, key: "vuex" })],
    modules,
    // state: {
    //     isLoading: false
    // },
    // mutations: {
    //     setLoadingState(state, isLoading) {
    //         state.isLoading = isLoading;
    //     }
    // },
    // actions: {
    //     init({ dispatch }) {
    //         return Promise.all([dispatch('auth/init')])
    //     },
    //     download(context, { blob, filename, applicationType }) {
    //         blob = new Blob([blob], { type: applicationType });
    //         const link = document.createElement("a");
    //         link.href = URL.createObjectURL(blob)
    //         link.download = filename;
    //         document.body.appendChild(link)
    //         link.click()
    //         document.body.removeChild(link)
    //         //URL.revokeObjectURL(link.href);
    //     }
    // },
    // getters: {
    //     isLoading: state => state.isLoading
    // }
})