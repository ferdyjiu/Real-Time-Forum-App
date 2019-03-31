<template>
     <v-toolbar>
        <v-toolbar-side-icon></v-toolbar-side-icon>
            <v-toolbar-title>Bitfumes</v-toolbar-title>
        <v-spacer></v-spacer>
        <app-notification v-if="loggedIn"></app-notification>
        <div class="hidden-sm-and-down">
            <router-link 
            v-for="item in items"
            :key="item.title"
            :to="item.to"
           >
                <v-btn  v-if="item.show" flat>{{item.title}}</v-btn>
            </router-link>
          
        </div>
    </v-toolbar>
</template>

<script>
import AppNotification from './AppNotification'
export default {
    components:{AppNotification},
    data(){
        return{
            loggedIn : User.loggin(),
            items: [
                {title : 'forum', to:'/forum', show:true},
                {title : 'Ask Question', to:'/ask', show:User.loggin()},
                {title : 'Category', to:'/category', show:User.admin()},
                {title : 'Login', to:'/login', show:!User.loggin()},
                {title : 'Logout', to:'/logout', show:User.loggin()},
            ]
        }
    },
    created(){
        EventBus.$on('logout',()=>{
            User.logout();
        })
    }
}
</script>

<style>

</style>
