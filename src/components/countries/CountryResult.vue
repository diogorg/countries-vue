<template>
    <SelectDialog />
    <div class="q-pa-sm countries" style="">
        <q-card class="my-card q-ma-sm" v-for="(c, index) in countries" :key="index">
            <q-img :src="c.flags.png" class="flag">
                <div class="text-h6">{{ c.name.common }}</div>
            </q-img>

            <q-card-actions vertical align="center">
                <q-btn icon-right="open_in_new" label="Open" flat @click="selectCountry(c)" />
            </q-card-actions>
        </q-card>
        <div class="empty" v-if="countries.length == 0">Nothing found</div>
        <div class="total q-pr-xl" v-if="countries.length > 0">
            <q-chip color="deep-orange" text-color="white" icon="filter_alt">
                Total: <b class="q-pa-sm">{{ countries.length }}</b>
            </q-chip>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import SelectDialog from './SelectDialog.vue'
export default {
    name: 'CountryResult',
    components: {
        SelectDialog
    },
    methods: {
        selectCountry(country) {
            this.$store.commit('selectCountry', { country })
        },
    },
    computed: {
        ...mapState(['countries']),
    },
}
</script>

<style lang="scss" scoped>
.countries {
    min-height: 100px;
    display: flex;
    align-items: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
    width: fit-content;
    overflow: auto;
    min-width: calc(100% - 300px);
    max-width: calc(100% - 300px);
    height: max-content;
}

.countries .flag {
    display: flex;
    max-height: 90px;
}

.my-card {
    width: 100%;
    max-width: 200px;
}

.empty {
    width: 100%;
    margin: 50px auto;
    text-align: center;
    color: $red-10;
    font-weight: bold;
    font-size: large;
}

.total {
    width: 100%;
    text-align: right;
}
</style>