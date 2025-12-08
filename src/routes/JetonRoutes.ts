import JetonService from '@src/services/JetonServices';
import { IReq, IRes } from './common/types';
import { parseReq } from './common/util';
import { isString } from 'jet-validators';
import { parseObject, TParseOnError } from 'jet-validators/utils';
import User from '@src/models/User';

/******************************************************************************
                                Constants
******************************************************************************/
const Validators = {
  generatetoken: parseReq({ userLogin: User.testlogin }),
} as const;

/**
 * Pour générer un jeton.
 * @param {IReq} req
 * @param {IRes} res
 */
async function generateToken(req: IReq, res: IRes) {
  const { userLogin } = Validators.generatetoken(req.body);
  const token = await JetonService.generateToken(userLogin);
  return res.send({ token: token });
}

// **** Export default **** //

export default {
  generateToken,
} as const;
