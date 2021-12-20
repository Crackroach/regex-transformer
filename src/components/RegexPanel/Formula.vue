<template>
    <v-text-field
        :value="formula"
        :label="$t('components.regexpanel.regularExpression')"
        :placeholder="$t('components.regexpanel.insertRegexHere')"
        outlined
        dense
        persistent-placeholder
        prepend-inner-icon="mdi-slash-forward"
        spellcheck="false"
        :error-messages="formulaErrors"
        @input="formula = $event"
    >
        <template v-slot:append>
            <div class="mt-1">
                <v-menu offset-y :close-on-content-click="false">
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon>mdi-slash-forward</v-icon>
                        <v-btn icon class="pa-0" v-bind="attrs" v-on="on">
                            {{ displayFlags }}
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item
                            v-for="(item, index) in possibleFlags"
                            :key="index"
                        >
                            <v-list-item-action>
                                <v-checkbox
                                    :input-value="flags"
                                    :value="item"
                                    @change="updateFlags"
                                ></v-checkbox>
                            </v-list-item-action>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-list-item-content
                                        v-on="on"
                                        v-bind="attrs"
                                    >
                                        <v-list-item-title>
                                            {{ item }}
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <span
                                    v-html="$t(`shared.regex.${item}`)"
                                ></span>
                            </v-tooltip>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>
        </template>
    </v-text-field>
</template>
<script>
export default {
    // props: {
    //     value: String,
    // },
    data() {
        return {
            formulaDebounce: null,
            //formula: this.value,
            formulaErrors: [],
            panels: 0,
            possibleFlags: ["g", "i", "m", "u", "y", "s"],
        };
    },
    computed: {
        currentStep() {
            return this.$store.getters["transformation/currentStep"];
        },
        displayFlags: {
            get() {
                return this.currentStep.flags || "";
            },
        },
        flags: {
            get() {
                return this.currentStep.flags.split("");
            },
            //     set(v) {
            //         console.log(v);
            //     },
        },
        formula: {
            get() {
                return this.currentStep.regex;
            },
            set(val) {
                // if (this.formulaDebounce != null)
                //     clearTimeout(this.formulaDebounce);
                // this.formulaDebounce = setTimeout(() => {
                if (!this.validateFormula(this.formula)) {
                    this.formulaErrors = ["Invalid RegExp"];
                    return;
                }
                this.formulaErrors = [];

                this.$store.dispatch("transformation/updateCurrentStep", {
                    regex: val,
                });
                // }, 500);
            },
        },
    },
    methods: {
        // handleRegexFormula(e) {
        //     if (this.formulaDebounce != null)
        //         clearTimeout(this.formulaDebounce);
        //     this.formulaDebounce = setTimeout(() => {
        //         if (!this.validateFormula(this.formula)) {
        //             this.formulaErrors = ["Invalid RegExp"];
        //             return;
        //         }
        //         this.formulaErrors = [];

        //         this.$emit("input", this.formula);
        //     }, 500);
        // },
        /**
         * @param {Array} event
         */
        updateFlags(event, item) {
            let flags = event.join("");
            console.log(flags);
            this.$store.dispatch("transformation/updateCurrentStep", {
                flags,
            });
        },

        validateFormula(reg) {
            try {
                let regex = new RegExp(reg);
                regex.test("a");
                return true;
            } catch (e) {
                return false;
            }
        },
    },
    watch: {
        // flags(v) {
        //     this.$store.dispatch("transformation/updateCurrentStep", {
        //         flags: v,
        //     });
        // },
    },
    mounted() {
        //this.flags = this.currentStep.flags.split("");
    },
};
</script>
<style lang="scss">
.v-input__append-inner {
    margin-top: 0px !important;
}
</style>