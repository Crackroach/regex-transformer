<template>
    <v-sheet>
        <v-toolbar dense flat max-height="24px" height="24px">
            <template v-if="$vuetify.breakpoint.mobile">
                <v-spacer></v-spacer>
                <p class="mt-4">Step #{{ currentStep.position }}</p>
            </template>

            <v-spacer></v-spacer>
            <v-tooltip bottom v-if="!canRemove">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        link
                        depressed
                        icon
                        small
                        v-bind="attrs"
                        v-on="on"
                        @click="showRemoveDialog(true)"
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </template>
                <span>{{ $t("components.transformationPanel.remove") }}</span>
            </v-tooltip>
            <!-- <v-row>
                <v-col offset="11" cols="1" class="">
                    
                </v-col>
            </v-row> -->
        </v-toolbar>
        <!-- <v-row>
        <v-col offset="1" sm="10" class="my-3"> -->
        <regex-panel class="my-1 mx-2"></regex-panel>
        <v-row class="ma-2">
            <v-col cols="12" md="6">
                <source-panel :source="true"></source-panel>
            </v-col>
            <v-col cols="12" md="6">
                <source-panel></source-panel>
            </v-col>
        </v-row>
        <!-- </v-col>
    </v-row> -->
        <remove-transformation-dialog
            v-model="isRemoveDialogShow"
            @change="removeTransformationStep"
        ></remove-transformation-dialog>
    </v-sheet>
</template>
<script>
import RegexPanel from "./shared/RegexPanel.vue";
import SourcePanel from "./shared/SourcePanel.vue";
import RemoveTransformationDialog from "./dialogs/RemoveTransformation.vue";
export default {
    components: {
        RegexPanel,
        SourcePanel,
        RemoveTransformationDialog,
    },
    data() {
        return {
            isRemoveDialogShow: false,
        };
    },
    computed: {
        currentStep() {
            return this.$store.getters["transformation/currentStep"];
        },
        isFirstTransformation() {
            return this.currentStep.id == 0 || this.currentStep.position == 0;
        },
        canRemove() {
            let stepCount = this.$store.getters["transformation/stepCount"];
            return !(!this.isFirstTransformation && stepCount > 1);
        },
    },
    watch: {},
    methods: {
        removeTransformationStep(isConfirmed) {
            if (isConfirmed) {
                this.$store.dispatch("transformation/removeCurrentStep");
            }
        },
        showRemoveDialog(val) {
            this.isRemoveDialogShow = val;
        },
    },
};
</script>