import { Request, Response } from 'express';
import { userService } from '../application/services/userService';
import { CreateUserDTO } from '../application/dtos/createUserDTO';

class UserController {
  async register(req: Request, res: Response) {
    try {
      const createUserDTO: CreateUserDTO = req.body;
      const newUser = await userService.registerUser(createUserDTO);
      return res.status(201).json(newUser);
    } catch (error: any) {
      return res.status(400).json({ message: error.message || 'Erro ao registrar usuário.' });
    }
  }
}
export const userController = new UserController();