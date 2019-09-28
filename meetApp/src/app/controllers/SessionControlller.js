import jwt from 'jsonwebtoken';

import User from '../models/User';
import authConfig from '../../config/auth';
import UserValidation from './validations/UserValidation';

class SessionController {
  async store(req, res) {
    if (!(await UserValidation.validUserSchemaOnLogin().isValid(req.body))) {
      return res.status(400).json({ error: 'Validation faild' });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'User Not found' });
    }
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }
    const { id, name } = user;
    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}
export default new SessionController();
