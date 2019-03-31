<template>
     <div>
         <v-btn icon @click="likeIt">
             <i class="fas fa-heart"  v-bind:style="liked ? {color:'red'} : {color:'#FFCDD2'} "></i>{{count}}
         </v-btn>
     </div>
</template>

<script>
export default {
    props:["content"],
    data(){
        return{
            liked:this.content.liked,
            count:this.content.like_count,
        }

    },
    created(){
        Echo.channel('likeChannel')
        .listen('LikeEvent', (e) => {
            if(this.content.id == e.id){
                e.type == 1 ? this.count++ : this.count--
            }
        });
    },
    computed:{
        clor(){
            return 'red'
        }
    },
    methods:{
        likeIt(){
            if(User.loggin()){
                this.liked ? this.decr() : this.incr()
                this.liked = !this.liked;
            }
        },
        incr(){
            axios.post(`/api/like/${this.content.id}`)
            .then(res => {
                this.count ++
            })
            
        },
        decr(){
            axios.delete(`/api/like/${this.content.id}`)
            .then(res => {
                this.count --
            })
        }
    }
}
</script>

<style>

</style>
