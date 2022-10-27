<template>
    <q-toolbar class="bg-black text-white shadow-1 q-mb-sm">
        <q-toolbar-title>
            {{ user.name }} :: {{ user.app }}
        </q-toolbar-title>
        <div class="side-bar">
            <a target="_blank" :href="user.github" id="github-link">
                <font-awesome-icon icon="fa-brands fa-github" class="fa-2xl" />
            </a>
            <q-avatar>
                <img :src="user.avatar">
            </q-avatar>
        </div>
    </q-toolbar>
</template>

<script>
export default {
    name: 'CountryHeader',
    data() {
        return {
            user: {
                app: 'Countries Search',
                name: 'Diogo Gutierre',
                github: 'https://github.com/diogorg',
                avatar: 'https://avatars.githubusercontent.com/u/1072595?v=4'
            }
        }
    },
    components: {},

    setup() { }
}
</script>
<style scoped>
.side-bar {
    width: 100px;
    display: flex;
    justify-content: space-between;
    vertical-align: middle;
}

.side-bar>a {
    color: #fff;
    margin: auto 0px;
}
</style>
