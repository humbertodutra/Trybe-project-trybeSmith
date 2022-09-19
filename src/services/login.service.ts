import connection from '../models/connection';
import LoginModel from '../models/login.model';
import LoginInterface from '../interfaces/login.interface';

class LoginService {
  public model: LoginModel;

  constructor() {
    this.model = new LoginModel(connection);
  }

  public async UserLogin(loginData: LoginInterface): Promise<LoginInterface[]> {
    const result = await this.model.userLogin(loginData);
    return result;
  }
}

export default LoginService;