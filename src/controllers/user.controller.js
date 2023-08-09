import { UserGetDto } from "../daos/dto/user.dto.js";
import { UsersService } from "../services/users.service.js";

export class UserController {
    static get = async(req,res)=>{
        try {
            const users = await UsersService.get();
            const newUsers = users.map(user => new UserGetDto(user));
            res.json({status:"success", data:newUsers});
        } catch (error) {
            res.json({status:"error", message:error.message});
        }
    };

    static modifyRole = async(req,res)=>{
        try {
            const userId = req.params.uid;
            const user = await UsersService.getUserById(userId);
            const userRole = user.role;
            if(userRole === "user"){
                user.role = "premium";
            }else if (userRole === "premium"){
                user.role = "user";
            }else{
                res.send("No es posible cambiar el role del usuario")
            };
            const result = await UsersService.updateUser(userId, user);
            res.send("Rol del usuario modificado");
        } catch (error) {
            res.send(error.message)
        }
    };
}