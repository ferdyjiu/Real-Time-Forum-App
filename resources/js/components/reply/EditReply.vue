<template>
    <div>
        <markdown-editor v-model="reply.reply"></markdown-editor>
        <v-card-actions>
            <v-btn small @click="update()" color="green" >
                Save
            </v-btn>
            <v-btn small @click="cancel()" color="yellow" >
                Cancel
            </v-btn>
        </v-card-actions>
    </div>
   
    
</template>

<script>
export default {
    props:['reply'],
    methods:{
        update(){
            axios.patch(`/api/question/${this.reply.question_slug}/reply/${this.reply.id}`,{body : this.reply.reply})
            .then(res => {
                this.cancel();
            })
            .catch(err => {
                console.error(err); 
            })
        },
        cancel(){
            EventBus.$emit('cancelEditing');
        }
    }
}
</script>

<style>

</style>
