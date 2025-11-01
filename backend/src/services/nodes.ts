
import {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../models/nodes";
import {calculatePopularity} from '../utils/nodes'


export class nodesServices {

    public async getAllUsers(){
        return await getAllUsers();
    }

    public async createUser(user:any){
          const data = {
                ...user,
                popularityScore:calculatePopularity({
                   uniqueFriends:user?.friends.length||0,
                   totalHobbies:user?.hobbies.length||0
                })
              }

              return await createUser(data);
    }

}

export default new nodesServices();
