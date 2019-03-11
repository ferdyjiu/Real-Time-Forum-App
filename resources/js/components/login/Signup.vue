<template>
    <v-app>
        <v-form @submit.prevent = "signup">
        <v-container>
            <v-layout row wrap>
                <v-flex xs12>
                    <v-text-field
                        v-model="form.name"
                        label="Name"
                        type="text"
                        v-validate="'required'"
                        :error-messages="errors.collect('name')"
                        data-vv-name="name"
                        required
                    ></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-text-field
                        v-model="form.email"
                        label="Email"
                        type="email"
                        v-validate="'required|email'"
                        :error-messages="errors.collect('email')"
                        data-vv-name="email"
                        required
                    ></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-text-field
                        v-model="form.password"
                        label="Password"
                        type="password"
                        v-validate="'required'"
                        :error-messages="errors.collect('password')"
                        data-vv-name="password"
                        ref="password"
                        required
                    ></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-text-field
                        v-model="form.password_confirmation"
                        label="Password Confirmation"
                        type="password"
                        v-validate="'required|confirmed:password'"
                        :error-messages="errors.collect('password_confirmation')"
                        data-vv-name="password_confirmation"
                        required
                    ></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-btn 
                        type="submit"
                        color="green"
                    >Sign up</v-btn>
                    <router-link to="/login">
                        <v-btn color="blue">login</v-btn>
                    </router-link>
                </v-flex>
            </v-layout>     
        </v-container>
    </v-form>
    </v-app>
</template>

<script>
export default {
  
    data(){
        return {
            form : {
                name : null,
                email : null,
                password : null,
                password_confirmation:null
            },
            //errors : {}
        }
    },
    created(){
        if(User.loggin()){
            this.$router.push({ name: 'forum'});
        }
    },
    methods:{
        signup(){
            this.$validator.validateAll().then((result) => {
                if(result){
                    axios.post('/api/auth/signup',this.form)
                    .then(response => {
                        User.responseAfterLogin(response);
                    })
                    .catch(error => {
                        //this.errors = error.response.data.errors;
                    })
                }
            })
           
        }
    }
}
</script>

<style>

</style>
