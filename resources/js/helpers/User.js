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
            window.location = '/forum';
        }
    }
    hasToken(){
        const storedToken = AppStorage.getToken();
        if(storedToken){
            return Token.isValid(storedToken) ? true : this.logout();
        }
        return false;
    }
    loggin(){
        return this.hasToken();
    }
    logout(){
        AppStorage.clear();
        window.location = '/forum';
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
    own(id){
        return this.id() == id
    }

    admin(){
        return this.id() == 24
    }
}

export default User = new User();