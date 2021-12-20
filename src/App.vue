<template>
    <v-app>
        <!-- <AppBar/> -->
        <NavDrawer />

        <v-main>
            <router-view />
        </v-main>
        <v-btn
            fab
            absolute
            top
            left
            small
            class="mt-6"
            color="primary"
            @click="showDrawer"
        >
            <v-icon>mdi-menu</v-icon>
        </v-btn>
    </v-app>
</template>

<script>
import AppBar from "./components/layout/AppBar";
import NavDrawer from "./components/layout/NavDrawer.vue";
import global from "./assets/global.scss";

export default {
    name: "App",
    components: {
        AppBar,
        NavDrawer,
    },
    methods: {
        showDrawer() {
            this.$store.commit("app/SET_DRAWER_VISIBLE", true);
        },
    },
};
</script>
