<template>
    <v-container grid-list-md fluid>
        <v-layout row wrap>
             <v-flex xs8>
                 <question
                  v-for = "question in questions"
                  :key="question.path"
                  :data=question>
                 </question>
            </v-flex>
            Sidabar
        </v-layout>
    </v-container>

</template>

<script>
import question from './question';
export default {
    components:{question},
    data(){
        return{
            questions:{}
        }
    },
    created(){
        axios.get('/api/question')
        .then(res => {
            this.questions = res.data.data
        })
        .catch(error => {
            console.log(error.response.data); 
        })
    }
}
</script>

<style>

</style>
