<template>
    <div class="filter-col q-pa-sm">
        <form v-on:keyup.enter="filterCountries" class="filter-form q-pa-sm q-pb-md shadow-1">
            <h3 class="q-pa-sm">Filter Countries</h3>
            <q-input outlined v-model="name" label="Country Name" class="q-ma-sm" />
            <q-select outlined v-model="region" :options="regions" label="Region" class="q-ma-sm" />
            <q-select class="q-ma-sm" outlined v-model="lang" use-input hide-selected fill-input input-debounce="0"
                :options="options" @filter="filterLangs" label="Languages" emit-value map-options>
                <template v-slot:no-option>
                    <q-item>
                        <q-item-section class="text-grey">
                            No results
                        </q-item-section>
                    </q-item>
                </template>
            </q-select>
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
        lang: null,
        options: []
    }),
    mounted() {
        this.options = this.langs
    },
    methods: {
        filterLangs(val, update) {
            update(() => {
                if (!val) {
                    this.options = this.langs
                    return
                }
                const needle = val.toLowerCase()
                this.options = this.langs.filter(v => v.toLowerCase().indexOf(needle) > -1)
            })
        },
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