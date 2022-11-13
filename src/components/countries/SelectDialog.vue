<template>
    <q-dialog v-model="dialog" v-if="selected != null">
        <q-card class="dialog-card">
            <q-card-section class="bg-blue-grey-2 text-black q-mb-none dialog-header">
                <div vertical class="text-h4">{{ selected.name.common }} <span v-if="selected.cioc">({{ selected.cioc
                }})</span></div>
                <div>
                    <img v-if="selected.coatOfArms.png" class="q-ma-sm" :src="selected.coatOfArms.png"
                        style="height: 32px; width: auto;" />
                    <img class="q-ma-sm" :src="selected.flags.png" style="height: 32px; width: auto;" />
                </div>
            </q-card-section>
            <div class="dialog-content">
                <div class="maps">
                    <iframe style="height: 100%;" width="260" id="gmap_canvas"
                        :src="`https://maps.google.com/maps?q=${selected.name.common}&ie=UTF8&iwloc=&output=embed`"
                        frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
                </div>
                <div class="infos q-pb-lg">
                    <p>
                        <span class="head">Official Name</span>
                        <span class="info">{{ selected.name.official }}</span>
                    </p>
                    <p>
                        <span class="head">Region</span>
                        <span class="info">{{ selected.region }} <span v-if="selected.subregion">- ({{
                                selected.subregion
                        }})</span></span>
                    </p>
                    <p v-if="selected.languages">
                        <span class="head">Language</span>
                        <span class="info">{{ showLangs(selected) }}</span>
                    </p>
                    <p v-if="selected.capital">
                        <span class="head">Capital</span>
                        <span class="info">{{ selected.capital[0] }}</span>
                    </p>
                    <p v-if="selected.currencies">
                        <span class="head">Currency</span>
                    <ul class="info q-ma-none" style="padding-left: 10px;">
                        <li v-for="(c, index) in selected.currencies" :key="index">{{ c.name }} ({{ c.symbol || '-' }})
                        </li>
                    </ul>
                    </p>
                    <p>
                        <span class="head">Total Area</span>
                        <span class="info">{{ selected.area.toLocaleString('en-US') }}</span>
                    </p>
                    <p v-if="selected.population">
                        <span class="head">Population</span>
                        <span class="info">{{ selected.population.toLocaleString('en-US') }}</span>
                    </p>
                    <p>
                        <span class="head">Borders</span>
                    <ul class="info q-ma-none borders-list" style="padding-left: 10px;">
                        <li v-for="(b, index) in selected.borders" :key="index">{{ b }}</li>
                        <li v-if="!selected.borders">No one</li>
                    </ul>
                    </p>
                    <p v-if="selected.maps.openStreetMaps">
                        <span class="head">Details</span>
                        <span class="info">
                            <q-btn size="11px" target="_blank" :href="selected.maps.openStreetMaps" align="between"
                                class="btn-fixed-width" color="primary" label="Open Detail" icon="flight_takeoff" />
                        </span>
                    </p>
                </div>
            </div>

            <q-card-actions align="right" class="close-button">
                <q-btn flat label="close" color="primary" @click="closeDialog" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    name: 'SelectDialog',
    components: {},
    methods: {
        ...mapMutations(['closeDialog']),

        showLangs(country) {
            if (!country.languages) return '-'
            return Object.values(country.languages).join(' - ')
        },
    },
    computed: {
        ...mapState(['dialog', 'selected']),
    },
    setup() { }
}
</script>
<style lang="scss" scoped>
.dialog-card {
    max-height: max-content;
    min-width: 750px;
    min-height: 300px;
    overflow-y: hidden;
}

.dialog-card .dialog-header {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
}

.close-button {
    right: 0px;
    position: absolute;
    bottom: 0px;
}

.dialog-content {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: flex-start;
    width: fit-content;
    overflow-y: visible;
    align-items: stretch;
    justify-content: space-between;
}

.dialog-content>.maps {
    width: 260px;
    background-color: #666;
    margin-right: 15px;
}

.dialog-content>.infos {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: flex-start;
    align-items: stretch;
    justify-content: space-between;
    font-size: 13px;
}

.dialog-content>.infos p {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: flex-start;
    align-items: stretch;
    justify-content: flex-start;
}

.dialog-content>.infos .head {
    width: 100px;
    text-align: right;
    margin-right: 20px;
    font-weight: bold;
    color: $cyan-8;
}

.dialog-content>.infos .info {
    text-align: left;
}

.dialog-card .dialog-header .text-h4 {
    line-height: auto;
    vertical-align: middle;
}

.borders-list li {
    display: inline-flex;
    white-space: nowrap;
    margin: 2px 4px;
}
</style>
