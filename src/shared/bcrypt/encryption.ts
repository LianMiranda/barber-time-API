import bcrypt from "bcrypt";
import { config } from "dotenv";
config();

export async function hash(password: string): Promise<string> {
  const saltRounds = process.env.SALT_ROUNDS;

  try {
      const salt = bcrypt.genSaltSync(Number(saltRounds));
      const hash = bcrypt.hashSync(password, salt);
    
      return hash;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
