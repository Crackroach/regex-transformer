<template>
    <v-dialog
        v-model="showDialog"
        transition="dialog-bottom-transition"
        max-width="600"
        persistent
    >
        <template v-slot:default="dialog">
            <v-card>
                <v-toolbar color="warning" dark class="text-h5">
                    {{ $t("dialogs.removeTransformation.title") }}
                </v-toolbar>
                <v-card-text>
                    <div
                        class="text-h5"
                        v-html="$t('dialogs.removeTransformation.text')"
                    ></div>
                </v-card-text>
                <v-card-actions class="justify-end">
                    <v-btn text @click="submitResult(true)" color="primary">
                        {{ $t("shared.accept") }}
                    </v-btn>
                    <v-btn @click="submitResult(false)" color="error">
                        {{ $t("shared.cancel") }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>
<script>
export default {
    props: {
        value: Boolean,
    },
    components: {},
    data() {
        return {
            showDialog: this.value,
        };
    },
    computed: {},
    watch: {
        value(val) {
            this.showDialog = val;
        },
        showDialog() {
            this.$emit("input", this.showDialog);
        },
    },
    methods: {
        submitResult(isAccepted) {
            this.$emit("change", isAccepted);
            this.showDialog = false;
        },
    },
};
</script>