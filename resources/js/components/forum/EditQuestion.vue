<template>
     <v-app>
        <v-form @submit.prevent = "update">
            <v-container fluid>
                <v-card>
                    <v-layout row wrap>
                    <v-flex xs12>
                        <v-text-field
                            v-model="form.title"
                            label="Title"
                            type="text"
                            v-validate="'required'"
                            :error-messages="errors.collect('title')"
                            data-vv-name="title"
                            required
                        ></v-text-field>
                    </v-flex>             
                    <v-flex xs12>
                        <markdown-editor 
                            v-model="form.body" 
                            ref="markdownEditor"
                            v-validate="'required'"
                            :error-messages="errors.collect('body')"
                            data-vv-name="body"
                        ></markdown-editor>
                    </v-flex>
                    <v-flex xs12>
                        <v-btn 
                            type="submit"
                            color="green"
                        >Save</v-btn>
                        <v-btn 
                            color="yellow"
                            @click="cancel()"
                        >Cancel</v-btn>
                    </v-flex>
                </v-layout>     
                </v-card>               
            </v-container>
        </v-form>
    </v-app>
</template>

<script>
export default {
    props:['data'],
    data(){
        return{
            form:{
                title : null,
                body : null
            }
        }
    },
    created(){
        this.form = this.data
    },
    methods:{
        update(){
            axios.patch(`/api/question/${this.form.slug}`,this.form)
            .then(res => {
                this.cancel()
            })
        },
        cancel(){
             EventBus.$emit('cancelEditing')   
        }
    }
}
</script>

<style>

</style>
