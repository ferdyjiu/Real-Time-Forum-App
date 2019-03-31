<template>
    <div class="text-xs-center">
        <v-menu offset-y >
        <v-btn icon slot="activator">
            <div v-bind:style="(unreadCount > 0) ? {color:'red'} :  {color:'#FFCDD2'} ">
                <i class="fas fa-bell"></i>{{unreadCount}}
            </div>
           
        </v-btn>
        <v-list :z-index="100">
            <v-list-tile v-for="item in unread" :key="item.id">
                <router-link :to="item.path">
                    <v-list-tile-title @click="readNotif(item)">{{item.question}}</v-list-tile-title>
                </router-link>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile v-for="item in read" :key="item.id">
                <v-list-tile-title>{{item.question}}</v-list-tile-title>
            </v-list-tile>
        </v-list>
        </v-menu>
    </div>
</template>

<script>
export default {
    data(){
        return {
            read : {},
            unread : {},
            unreadCount : 0
        }
    },
    created(){
        if(User.loggin()){
            this.getNotifications()
        }
    },
    methods:{
        getNotifications(){
            axios.post('/api/notifications')
            .then(res => {
                this.read = res.data.read;
                this.unread = res.data.unread;
                this.unreadCount = res.data.unread.length;
            })
            .catch(err => {
                console.error(err); 
            })
        },
        readNotif(notification){
            axios.post('/api/markAsRead',{id:notification.id})
            .then(res => {
                this.unread.splice(notification,1)
                this.read.push(notification)
                this.unreadCount--
            })
            .catch(err => {
                console.error(err); 
            })
        }
    }
}
</script>

<style>

</style>
