import { Pool } from 'mysql2/promise';
import LoginInterface from '../interfaces/login.interface';

export default class LoginModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async userLogin(userData: LoginInterface): Promise<LoginInterface[]> {
    const { username } = userData;
    const verify = await this.connection
      .execute(
        'SELECT id, username, password FROM Trybesmith.Users WHERE username = ? ',
        [username],

      );
    const [result] = verify;
    console.log(result);
    return result as LoginInterface[];
  }
}