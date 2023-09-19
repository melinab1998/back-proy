
export default class userDTO{
    constructor(user){
        this.Nombre = user.first_name;
        this.Email = user.email;
        this.Rol = user.role;
    }
}