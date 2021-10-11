import bcrypt from 'bcryptjs'

export class HashHelper {
  private static salt = 10

  static async encrypt(str: string): Promise<string> {
    return await bcrypt.hash(str, HashHelper.salt)
  }

  static async compare(plain: string, encrypted: string): Promise<boolean> {
    return await bcrypt.compare(plain, encrypted)
  }
}
