<template>
    <v-app>
        <div>
            <toolbar></toolbar>
            <router-view></router-view>
            <app-footer></app-footer>
         </div>
    </v-app>
</template>

<script>

import toolbar from './Toolbar'
import AppFooter from './AppFooter'
import Login from './login/Login'

export default {
    components : {toolbar,AppFooter,Login}
}
</script>

<style>

</style>
