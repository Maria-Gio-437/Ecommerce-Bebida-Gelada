export interface User {
  id: string; // ou number, dependendo da sua PK no Supabase
  name: string;
  email: string;
  password?: string; // Senha não deve ser retornada em todas as consultas
  created_at: Date;
  updated_at: Date;
}