import { config } from "dotenv";
import jwt, { SignOptions } from "jsonwebtoken";
import { Customer } from "../../Customer/entity/customer";
config();

export async function sign(user: Customer): Promise<string> {
  const secret = process.env.JWT_SECRET as string;
  const options = { expiresIn: "3h" };

  if (!secret) {
    throw new Error("JWT secret is not defined in the environment variables.");
  }

  try {
    const token = jwt.sign({ id: user.id }, secret, options as SignOptions);
    return token;
  } catch (err) {
    console.error("Error signing JWT:", err);
    throw new Error("Failed to sign JWT");
  }
}
