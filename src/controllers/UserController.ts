import { IRequestHandler } from "../types/IRequestHandler";
import UserService from "../services/UserService";
import { IController } from "../types/IController";


class UserController implements IController{
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

  public getById: IRequestHandler = async (req, res) => {
    const id = Number(req.params.id);
    const user = await this.userService.getById(id);
    if (!user) res.sendStatus(404);
    
    res.status(200).json({
      data:user,
    });
  };

  public create: IRequestHandler = async (req, res) => {
    const user = await this.userService.create(req.body);
    res.status(201).json({ data: user });
  };
}

export default UserController;