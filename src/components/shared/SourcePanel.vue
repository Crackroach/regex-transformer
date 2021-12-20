<template>
    <v-sheet>
        <v-textarea
            v-model="text"
            :label="label"
            outlined
            dense
            spellcheck="false"
            :rows="rows"
            :readonly="!source"
            persistent-placeholder
            @click="copyContent"
            hide-details
        ></v-textarea>
    </v-sheet>
</template>
<script>
export default {
    props: {
        source: {
            type: Boolean,
            default: false,
        },
    },
    components: {},
    data() {
        return {
            textDebouce: null,
        };
    },
    computed: {
        currentStep() {
            return this.$store.getters["transformation/currentStep"];
        },
        isFirstTransformation() {
            return this.currentStep.position == 0;
        },
        label() {
            if (this.source) {
                return this.$t("components.sourcePanel.source");
            }
            return this.$t("components.sourcePanel.result");
        },
        rows() {
            if (this.$vuetify.breakpoint.mobile) {
                return 5;
            }
            return 20;
        },
        text: {
            get() {
                let step = this.currentStep;
                let result;
                if (this.source) {
                    if (this.isFirstTransformation) {
                        result = step.source;
                    } else {
                        let t =
                            this.$store.getters["transformation/previousStep"];
                        result = t.result;
                    }
                } else {
                    result = step.result;
                }

                return result;
            },
            set(val) {
                // if (this.textDebouce != null) clearTimeout(this.textDebouce);

                // this.textDebouce = setTimeout(() => {
                this.$store.dispatch("transformation/updateCurrentStep", {
                    source: val,
                });
                // }, 500);
            },
        },
    },
    watch: {},
    methods: {
        copyContent() {
            if (!this.source) {
                navigator.clipboard.writeText(this.text);
            }
        },
    },
};
</script>