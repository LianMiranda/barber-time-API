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

export async function compare(new_password: string, current_password: string){
  try {
    const verification = await bcrypt.compare(new_password, current_password);
    return verification;
  }catch (err) {
    console.error(err);
    throw err;
  }
}
