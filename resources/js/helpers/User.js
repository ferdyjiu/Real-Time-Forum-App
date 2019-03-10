import Token from './Token'
import AppStorage from './AppStorage'
class User {
    login(data){
        axios.post('/api/auth/login',data)
        .then(res => this.responseAfterLogin(res))
        .catch(error => console.log(error.response.data))
    }
    responseAfterLogin(res){
        const token = res.data.access_token;
        const username = res.data.user;
        if(Token.isValid(token)){
            AppStorage.store(token,username);
        }
    }
    hasToken(){
        const storedToken = AppStorage.getToken();
        if(storedToken){
            return Token.isValid(storedToken) ? true : false;
        }
        return false;
    }
    loggin(){
        return this.hasToken();
    }
    logout(){
        AppStorage.clear();
    }
    name(){
        if(this.loggin()){
            return AppStorage.getUser();
        }
    }
    id(){
        if(this.loggin()){
            const payload = Token.payload(AppStorage.getToken());
            return payload.sub
        }
    }
}

export default User = new User();