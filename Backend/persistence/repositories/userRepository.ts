import { supabase } from '../../config/supabaseClient'; // Cliente Supabase configurado
import { User } from '../models/User';

class UserRepository {
  async create(userData: Partial<User>): Promise<User> {
    const { data, error } = await supabase
      .from('users') // 'users' é o nome da sua tabela no Supabase
      .insert([userData])
      .select()
      .single(); // .single() para retornar um único objeto ou null

    if (error) {
      console.error('Erro ao criar usuário no Supabase:', error);
      throw new Error('Não foi possível criar o usuário.');
    }
    if (!data) {
        throw new Error('Nenhum dado retornado após a criação do usuário.');
    }
    return data as User;
  }

  async findByEmail(email: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .maybeSingle(); // .maybeSingle() retorna um único objeto ou null se não encontrar

    if (error) {
      console.error('Erro ao buscar usuário por email:', error);
      // Dependendo da sua política de erros, você pode querer lançar o erro ou apenas retornar null
    }
    return data ? (data as User) : null;
  }
  // Outros métodos: findById, update, delete, etc.
}
export const userRepository = new UserRepository();