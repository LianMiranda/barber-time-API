import { AppError } from "../errors/appError";

export function cpfValidator(cpf: string) {
  cpf = cpf.replace(/\D/g, "");

  if (cpf.length !== 11) throw new AppError(400, "Invalid CPF length");

  if (/^(\d)\1{10}$/.test(cpf)) {
    throw new AppError(400, "Invalid CPF");
  }

  const nextDigitVerifier = (incompleteCpf: string) => {
    let sum: number = 0;

    for (let i = 0; i < incompleteCpf.length; i++) {
      const actualDigit = incompleteCpf.charAt(i);
      const constant = incompleteCpf.length + 1 - i;

      sum += Number(actualDigit) * constant;
    }

    const rest = sum % 11;

    return rest < 2 ? "0" : (11 - rest).toString();
  };

  const firstDigit = nextDigitVerifier(cpf.substring(0, 9));
  const secoundDigit = nextDigitVerifier(cpf.substring(0, 9) + firstDigit);

  const cpfVerificated = cpf.substring(0, 9) + firstDigit + secoundDigit;

  if (cpf !== cpfVerificated) throw new AppError(400, "Invalid CPF");

  return true;
}
