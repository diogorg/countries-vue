<template>
    <div class="filter-col q-pa-sm">
        <form class="filter-form q-pa-sm q-pb-md shadow-1">
            <h3 class="q-pa-sm">Filter Countries</h3>
            <q-input outlined v-model="name" label="Country Name" class="q-ma-sm" />
            <q-select outlined v-model="region" :options="regions" label="Region" class="q-ma-sm" />
            <q-select outlined v-model="lang" :options="langs" label="Languages" class="q-ma-sm" />
            <q-btn @click="filterCountries" class="glossy q-ma-sm" color="deep-orange" icon="search" label="Filter" />
        </form>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'CountryForm',
    data: () => ({
        name: '',
        region: null,
        lang: null
    }),
    methods: {
        async filterCountries() {
            this.$q.loading.show({
                message: 'Filtering the countries',
                boxClass: 'bg-grey-2 text-grey-9',
                spinnerColor: 'primary'
            })
            setTimeout(() => {
                this.$store.commit('filterCountries', { name: this.name, region: this.region, lang: this.lang })
                this.$q.loading.hide()
            }, 700)
        }
    },
    computed: {
        ...mapState(['regions', 'langs']),
    },
    components: {},
    setup() { }
}
</script>

<style scoped>
.filter-col {
    width: 300px;
    position: relative;
}

.filter-form {
    background: #fff;
    width: fit-content;
    min-height: 100px;
    border: 1px dashed #bbb;
    text-align: center;
    position: fixed;
}

.filter-form h3 {
    text-align: center;
    width: 100%;
    font-size: 21px;
    margin: 0px;
}
</style>