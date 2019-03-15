<template>
    <v-card>
        <v-container fluid>
            <v-card-title >
                <div>
                    <div class="headline">
                        {{data.title}}
                    </div>
                    <span class="grey--text">{{data.user}} said {{data.created_at}}</span>
                </div>
                <v-spacer></v-spacer>
                <v-btn color="teal">5 Replies</v-btn>
            </v-card-title>
            <v-card-text v-html="body"> </v-card-text>
            <v-card-actions v-if="own">
                <v-btn  @click="edit()" icon small >
                    <i class="fas fa-pencil-alt" style="color:orange" ></i>
                </v-btn>
                <v-btn @click="destroy()" icon small>
                    <i class="fas fa-trash-alt" style="color:red"></i>
                </v-btn>
            </v-card-actions>
        </v-container>
    </v-card>
</template>

<script>
export default {
    props:['data'],
    data(){
        return{
            own : User.own(this.data.user_id),
        }
    },
    computed:{
        body(){
            return md.parse(this.data.body)
        }
    },
    methods:{
        destroy(){
            axios.delete(`/api/question/${this.data.slug}`)
            .then(res => {
                this.$router.push('/forum')
            })
            .catch(err => {
                console.log(error.response.data)
            })
        },
        edit(){
            EventBus.$emit('startEditing')   
        }
    }
}
</script>

<style>

</style>
