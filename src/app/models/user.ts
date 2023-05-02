export interface User {
    id?:any
    email?: String;
    password?: String;
    newPassword?: String;
    token?: String;
    data?:{
        token?:String;
        userId?: String
    }
    message?:String
}
