<template>
    <v-sheet>
        <v-expansion-panels v-model="panels" accordion>
            <v-expansion-panel>
                <v-expansion-panel-header>{{
                    $t("components.regexpanel.regex")
                }}</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <Formula></Formula>
                    <v-text-field
                        :value="replaceValue"
                        :label="$t('components.regexpanel.replace')"
                        persistent-placeholder
                        outlined
                        dense
                        @input="replaceValue = $event"
                    ></v-text-field>
                </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
                <v-expansion-panel-header>{{
                    $t("components.regexpanel.options")
                }}</v-expansion-panel-header>
                <v-expansion-panel-content>
                    options coming soon
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-sheet>
</template>
<script>
import Formula from "../RegexPanel/Formula.vue";
export default {
    props: {},
    components: {
        Formula,
    },
    data() {
        return {
            debounceReplaceValue: null,
            panels: 0,
        };
    },
    computed: {
        // formula: {
        //     get() {
        //         console.log(this.$store.getters["transformation/currentStep"]);
        //         return this.$store.getters["transformation/currentStep"].regex;
        //     },
        //     set(val) {
        //         this.$store.dispatch("transformation/updateCurrentStep", {
        //             regex: val,
        //         });
        //     },
        // },
        replaceValue: {
            get() {
                return this.$store.getters["transformation/currentStep"]
                    .replaceValue;
            },
            set(val) {
                if (this.debounceReplaceValue)
                    clearTimeout(this.debounceReplaceValue);
                this.debounceReplaceValue = setTimeout(() => {
                    this.$store.dispatch("transformation/updateCurrentStep", {
                        replaceValue: val,
                    });
                }, 500);
            },
        },
    },
    watch: {
        // formula(val) {
        // },
        // replaceValue() {
        //     if (this.debounceReplaceValue)
        //         clearTimeout(this.debounceReplaceValue);
        //     this.debounceReplaceValue = setTimeout(() => {
        //         this.$store.dispatch("transformation/updateCurrentStep", {
        //             replaceValue: this.replaceValue,
        //         });
        //     }, 500);
        // },
    },
    methods: {},
};
</script>