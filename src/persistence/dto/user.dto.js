
export default class userDTO{
    constructor(user){
        this.Nombre = user.first_name;
        this.Apellido = user.last_name;
        this.Rol = user.role;
    }
}