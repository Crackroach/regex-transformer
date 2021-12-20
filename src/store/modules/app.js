
export const state = {
    drawer: false
};
export const mutations = {
    SET_DRAWER_VISIBLE(state, visibility) {
        state.drawer = visibility
    }
};
export const actions = {};
export const getters = {
    isDrawerVisible: (state) => state.drawer
};