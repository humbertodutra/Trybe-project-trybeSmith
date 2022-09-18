import connection from '../models/connection';
import UserModel from '../models/user.model';
import User from '../interfaces/user.interface';

class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public async createNewUser(user: User): Promise<User> {
    const result = await this.model.createNewUser(user);
    return result;
  }
}

export default UserService;