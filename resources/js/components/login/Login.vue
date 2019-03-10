<template>
  <v-form @submit.prevent = "login">
    <v-container>
        <v-layout row wrap>
            <v-flex xs12>
                <v-text-field
                    v-model="form.email"
                    label="Email"
                    type="email"
                    required
                ></v-text-field>
            </v-flex>
            <v-flex xs12>
                <v-text-field
                    v-model="form.password"
                    label="Password"
                    type="password"
                    required
                ></v-text-field>
            </v-flex>
            <v-flex xs12>
                <v-btn 
                    type="submit"
                    color="green"
                >Login</v-btn>
            </v-flex>
        </v-layout>
    </v-container>
  </v-form>
</template>
<script>
export default {
    data(){
        return {
            form : {
                email : null,
                password : null
            }
        }
    },
    methods:{
        login(){
           User.login(this.form);
        }
    }
}
</script>

<style>

</style>
