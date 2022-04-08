import { IRequestHandler } from "../types/IRequestHandler";
import UserService from "../services/UserService";
import User from "../entities/User";
import { IController } from "../types/IController";
import { UserDto, UserMapper } from "../mappers/UserMapper";
import { IMapper } from "../mappers/IMapper";



class UserController implements IController{
  protected readonly userService;


  constructor(userService: UserService = new UserService(), userMapper: IMapper<User, UserDto> = new UserMapper()) {
    this.userService = userService;
    this.userMapper = userMapper;
  }

  protected readonly userMapper;
  
  public getAll: IRequestHandler = async (req, res) => {
    const users = await this.userService.getAll();
    res.status(200).json({
      data: users,
    });
  };

  public getById: IRequestHandler = async (req, res) => {
    const id = Number(req.params.id);
    const user = await this.userService.getById(id);
    
    res.status(200).json({
      data:this.userMapper.toDto(user),
    });
  };

  public create: IRequestHandler = async (req, res) => {
    const user = await this.userService.create(req.body);
    res.status(201).json({ data: this.userMapper.toDto(user) });
  };

  public updateById: IRequestHandler = async (req, res) => {
    const user = await this.userService.updateById(Number(req.params.id), req.body);
    res.status(200).json({ data: this.userMapper.toDto(user) });
  };

  public deleteById: IRequestHandler = async (req, res) => {
    const id = Number(req.params.id);
    await this.userService.deleteById(id);
    res.sendStatus(204);
  };
}

export default UserController;