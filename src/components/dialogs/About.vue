<template>
    <v-dialog
        v-model="dialog"
        transition="dialog-bottom-transition"
        persistent
        scrollable
    >
        <template v-slot:activator="{ on, attrs }">
            <div class="pa-2">
                <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-information-outline</v-icon>
                </v-btn>
            </div>
        </template>
        <v-card class="ma-4" style="overflow: hidden">
            <v-card-title>
                <v-spacer></v-spacer>
                <h4>
                    <v-btn icon @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </h4>
            </v-card-title>
            <!-- <h4>
            <v-btn link text :to="{ name: 'Home' }" exact>
                <v-icon class="pr-1">mdi-arrow-left</v-icon>
                {{ $t("navigation.back") }}
            </v-btn>
        </h4> -->
            <v-card-text>
                <div>
                    <h1>{{ $t("pages.about.title") }}</h1>
                    <p v-html="$t('pages.about.paragraph1')"></p>
                    <p>{{ $t("pages.about.paragraph2") }}</p>
                    <p v-html="$t('pages.about.paragraph3')"></p>
                    <p v-html="$t('pages.about.paragraph4')"></p>
                    <p v-html="$t('pages.about.contactMe')"></p>

                    <h3>{{ $t("pages.about.whatsNext") }}</h3>
                    <p v-html="$t('pages.about.whatsNextParagraph1')"></p>

                    <h3>Changes</h3>
                    <ul>
                        <li>1.1.0 - Update app responsiveness</li>
                        <li>1.0.0 - Initial build</li>
                    </ul>
                </div>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    data() {
        return {
            dialog: false,
        };
    },
};
</script>