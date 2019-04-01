import User from './User';

class Exception{
    handle(error){
        this.isExipred(error.response.data.error)
    }

    isExipred(error){
        if(error == 'Token is expired'){
            User.logout()
        }
    }
}

export default Exception = new Exception()