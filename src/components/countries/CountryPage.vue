<template>
    <CountryHeader />
    <div class="main q-pb-md">
        <CountryForm />
        <CountryResult />
    </div>
</template>

<script>
import CountryHeader from './CountryHeader.vue'
import CountryForm from './CountryForm.vue'
import CountryResult from './CountryResult.vue'
export default {
    name: 'CountryPage',
    components: {
        CountryHeader,
        CountryForm,
        CountryResult
    },
    data: () => ({}),
    beforeCreate() {
        const quasar = this.$q
        this.$store.commit('getAllCountriesAndRegions', { quasar })
    },
    setup() { }
}
</script>

<style scoped>
.main {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    vertical-align: top;
    flex-direction: row;
    align-items: stretch;
    overflow: auto;
    align-items: stretch;
}
</style>