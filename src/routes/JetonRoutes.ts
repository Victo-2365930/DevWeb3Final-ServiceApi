import JetonService from '@src/services/JetonServices';
import { IReq, IRes } from './common/types';
import User, { IUserLogin } from '@src/models/User';

/******************************************************************************
                                Constants
******************************************************************************/

/**
 * Pour générer un jeton.
 * @param {IReq} req
 * @param {IRes} res
 */
async function generateToken(req: IReq, res: IRes) {
  const { userLogin } = req.body;
  const token = await JetonService.generateToken(userLogin as IUserLogin);
  return res.send({ token: token });
}

// **** Export default **** //

export default {
  generateToken,
} as const;
