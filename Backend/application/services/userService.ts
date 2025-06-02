import { userRepository } from '../../persistence/repositories/userRepository'; // Supondo que você exporte uma instância
import { CreateUserDTO } from '../dtos/createUserDTO';
import { User } from '../../persistence/models/User';
import bcrypt from 'bcryptjs';

class UserService {
  async registerUser(userData: CreateUserDTO): Promise<User> {
    const existingUser = await userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('Email já cadastrado.');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const userToCreate: Partial<User> = {
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
    };

    const newUser = await userRepository.create(userToCreate);

    return newUser;
  }
}
export const userService = new UserService();