<template>
    <v-navigation-drawer
        v-model="isDrawerVisible"
        :mini-variant="mini"
        app
        class="grey darken-2"
        dark
        bottom
        :temporary="$vuetify.breakpoint.mobile"
    >
        <v-list-item class="px-2">
            <v-list-item-avatar>
                /.*?/
                <!-- <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img> -->
            </v-list-item-avatar>

            <v-list-item-title>Regex transformer</v-list-item-title>

            <v-btn icon @click.stop="mini = !mini">
                <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense>
            <v-list-item
                class="pointer"
                @click.stop="$store.dispatch('transformation/addStep')"
            >
                <v-list-item-icon>
                    <v-icon>mdi-plus</v-icon>
                </v-list-item-icon>
                <v-list-item-content>{{
                    $t("components.navDrawer.add")
                }}</v-list-item-content>
            </v-list-item>
            <v-list-item-group v-model="selected">
                <template v-for="item in items">
                    <v-list-item
                        :key="item.id"
                        @click="selectCurrentStep(item.id)"
                        active-class="blue"
                    >
                        <v-list-item-icon>
                            <v-icon>mdi-pound</v-icon>
                            {{ item.position }}
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title>{{
                                item.name
                            }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </v-list-item-group>
        </v-list>
        <template v-slot:append>
            <about-dialog></about-dialog>
            <!-- <div class="pa-2">
                <v-btn icon :to="{ name: 'About' }">
                    <v-icon>mdi-information-outline</v-icon>
                </v-btn>
            </div> -->
        </template>
    </v-navigation-drawer>
</template>
<script>
import AboutDialog from "../dialogs/About.vue";
export default {
    components: { AboutDialog },
    data() {
        return {
            drawer: true,
            mini: true,
            selected: 0,
        };
    },
    computed: {
        currentStepId() {
            return this.$store.getters["transformation/currentStep"].id;
        },
        isDrawerVisible: {
            get() {
                if (!this.$vuetify.breakpoint.mobile) return true;
                return this.$store.getters["app/isDrawerVisible"];
            },
            set(val) {
                this.$store.commit("app/SET_DRAWER_VISIBLE", val);
            },
        },
        items() {
            return this.$store.getters["transformation/steps"];
        },
    },
    watch: {
        currentStepId() {
            this.selected = this.items.findIndex(
                (x) => x.id == this.currentStepId
            );
        },
    },
    methods: {
        selectCurrentStep(stepId) {
            this.$store.commit("transformation/setCurrentStep", stepId);
        },
    },
};
</script>