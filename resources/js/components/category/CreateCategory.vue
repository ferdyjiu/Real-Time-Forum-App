<template>
    <v-app>
        <v-form @submit.prevent = "submit">
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-text-field
                            v-model="form.name"
                            label="Category Name"
                            type="text"
                            v-validate="'required'"
                            :error-messages="errors.collect('name')"
                            data-vv-name="name"
                            required
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-btn type="submit" color="pink" v-if="editSlug">Update</v-btn>
                        <v-btn type="submit" color="green" v-else >Create</v-btn>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-form>
        <v-container>
            <v-card>
                <v-toolbar color="indigo" dark dense class="mt-2">
                    <v-toolbar-title>Categories</v-toolbar-title>
                </v-toolbar>
                <div>
                    <v-list>
                        <v-list-tile v-for="(category,index) in categories" :key="category.id">
                            <v-list-tile-action>
                                <v-btn icon small @click="edit(index)" >
                                    <i class="fas fa-pencil-alt" style="color:orange" ></i>
                                </v-btn>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>{{category.name}}</v-list-tile-title> 
                            </v-list-tile-content>
                            <v-list-tile-action>
                                <v-btn icon small @click="destroy(category.slug,index)" >
                                    <i class="fas fa-trash-alt" style="color:red" ></i>
                                </v-btn>
                            </v-list-tile-action>
                        </v-list-tile>
                    </v-list>
                </div>
            </v-card>
        </v-container>
    
    </v-app>
</template>

<script>
export default {
    data(){
        return{
            form:{
                'name' : null
            },
            categories : {},
            editSlug : null,
        }
    },
    created(){
        if(!User.admin()){
            this.$router.push('/forum');
        }
        axios.get('api/category')
        .then(res => {
            this.categories = res.data.data;
        })
        .catch(err => {
            console.error(err); 
        })
    },
    methods:{
        submit(){
            this.$validator.validateAll().then((result) => {
                if(result){
                    this.editSlug ? this.update() : this.create();
                }
            })
        },
        update(){
            axios.patch(`/api/category/${this.editSlug}`,this.form)
            .then(res => {
                this.categories.unshift(res.data);
                this.form.name = null;
                this.editSlug = null;
            })
            .catch(err => {
                console.error(err); 
            })
        },
        create(){
            axios.post('/api/category',this.form)
            .then(res => {
                this.categories.unshift(res.data);
                this.form.name = null;
            })
            .catch(err => {
                console.error(err); 
            })
        },
        destroy(slug,index){
            axios.delete(`/api/category/${slug}`)
            .then(res => {
                this.categories.splice(index,1);
            })
            .catch(err => {
                console.error(err); 
            })
        },
        edit(index){
            this.form.name = this.categories[index].name;
            this.editSlug = this.categories[index].slug;
            this.categories.splice(index,1);
        }
    }
}
</script>

<style>

</style>
