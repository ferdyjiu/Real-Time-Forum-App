<template>
   <div class="mt-3">
       <v-card>
            <v-card-title>
                <div class="headline">{{data.user}}</div>
                <div class="ml-2">said {{data.created_at}}</div>
                <v-spacer></v-spacer>
                <like :content = "data"></like>
            </v-card-title>
            <v-divider></v-divider>
            <edit-reply v-if="editing" :reply=data></edit-reply>
            <v-card-text v-html="reply" v-else></v-card-text>
            <v-divider></v-divider>
            <div v-if="!editing">
                <v-card-actions v-if="own">
                    <v-btn icon small @click="edit()" >
                        <i class="fas fa-pencil-alt" style="color:orange" ></i>
                    </v-btn>
                    <v-btn icon small @click="destroy()" >
                        <i class="fas fa-trash-alt" style="color:red" ></i>
                    </v-btn>
                </v-card-actions>
            </div>
           
       </v-card>
       
   </div>
</template>

<script>
import EditReply from './EditReply'
import Like from '../likes/Like'
export default {
    components:{EditReply,Like},
    props:['data','index'],
    data(){
        return{
            editing:false
        }
    },
    created(){
        this.listen();
    },
    computed:{
        own(){
            return User.own(this.data.user_id);
        },
        reply(){
            return md.parse(this.data.reply);
        }
    },
    methods:{
        destroy(){
            EventBus.$emit('deleteReply',this.index);
        },
        edit(){ 
            this.editing = true;
        },
        listen(){
            EventBus.$on('cancelEditing',()=>{
                this.editing = false;
            })
        }
    }
}
</script>

<style>

</style>
