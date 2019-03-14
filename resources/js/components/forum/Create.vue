<template>
   <v-app>
        <v-form @submit.prevent = "create">
            <v-container>
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
                        <v-autocomplete 
                            :items="categories" 
                            item-text="name"
                            item-value="id"
                            label="category"
                            v-model="form.category_id" 
                            v-validate="'required'"
                            :error-messages="errors.collect('category')"
                            data-vv-name="category"
                             
                        ></v-autocomplete>
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
                        >Create</v-btn>
                        
                    </v-flex>
                </v-layout>     
            </v-container>
        </v-form>
    </v-app>
</template>

<script>
export default {
    data(){
        return{
            form : {
                title : null,
                category_id : null,
                body : null
             },
            categories:{},
            erors:{}
        }
    },
    created(){
        axios.get('/api/category')
        .then(res => {
            this.categories = res.data.data;
        })
        .catch(err => {
            console.log(err); 
        })
    },
    methods:{
          
        create(){
            this.$validator.validateAll().then((result) => {
                if(result){
                    axios.post('/api/question',this.form)
                    .then(res => {
                        this.$router.push(res.data.path);
                    })
                    .catch(err => {
                        console.log(this.erors = err.response.data.error); 
                    })
                }
            })    
        }
    }
}
</script>

<style>

</style>
