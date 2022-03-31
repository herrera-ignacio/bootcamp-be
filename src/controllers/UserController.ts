import { IRequestHandler } from "../types/IRequestHandler";
import UserService from "../services/UserService";

class UserController {
  protected readonly userService;


  constructor(userService: UserService = new UserService()){
    this.userService = userService;
  }

  public getAll: IRequestHandler = async (req, res) => {
    const users = await this.userService.getAll();
    res.status(200).json({
      data: users,
    });
  };
}

export default UserController;