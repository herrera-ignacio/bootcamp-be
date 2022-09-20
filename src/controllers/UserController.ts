import {
  NextFunction,
  Request,
  Response,
} from "express";
import UserService from "../services/UserService";
import User from "../entities/User";
import { IController } from "../types/IController";
import { IRequestHandler } from "../types/IRequestHandler";
import {
  UserDto,
  UserMapper,
} from "../mappers/UserMapper";
import { IMapper } from "../mappers/IMapper";

class UserController implements IController {
  protected readonly userService;

  protected readonly userMapper;

  constructor(
    userService: UserService = new UserService(),
    userMapper: IMapper<User, UserDto> = new UserMapper(),
  ) {
    this.userService = userService;
    this.userMapper = userMapper;
  }

  public getAll: IRequestHandler = async (
    req: Request, res: Response, _next: NextFunction,
  ) => {
    const users = await this.userService.getAll();

    res.status(200).json({
      data: users.map((user) => new UserMapper().toDto(user)),
    });
  }

  public async getById(
    req: Request, res: Response, _next: NextFunction,
  ) {
    const id = Number(req.params.id);
    const user = await this.userService.getByKey(
      "id", id,
    );

    res.status(200).json({
      data: this.userMapper.toDto(user),
    });
  }

  public async create(
    req: Request, res: Response, _next: NextFunction,
  ) {
    const user = await this.userService.create(req.body);

    res.status(201).json({ data: this.userMapper.toDto(user) });
  }

  public async updateById(
    req: Request, res: Response, _next: NextFunction,
  ) {
    const user = await this.userService.updateById(
      Number(req.params.id), req.body,
    );

    res.status(200).json({ data: this.userMapper.toDto(user) });
  }

  public async deleteById(
    req: Request, res: Response, _next: NextFunction,
  ) {
    const id = Number(req.params.id);

    await this.userService.deleteById(id);
    res.sendStatus(204);
  }
}

export default UserController;
