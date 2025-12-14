import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { IUser } from '@src/models/User';
import { IReq, IRes } from './common/types';
import UserService from '@src/services/UserService';

/**
 * Pour extraire un user par son id
 * @param req
 * @param res
 */
async function getOne(req: IReq, res: IRes) {
  const { id } = req.params;
  const user = await UserService.getById(id as string);
  res.status(HttpStatusCodes.OK).json({ user });
}

/**
 * Pour ajouter un user
 * @param req
 * @param res
 */
async function add(req: IReq, res: IRes) {
  const { user } = req.body;
  await UserService.addOne(user as IUser);
  res.status(HttpStatusCodes.CREATED).end();
}

/**
 * Mettre à jour un utilisateur. - Ne sera pas implémenté
 *
async function update(req: IReq, res: IRes) {
  const { user } = req.body;
  await UserService.updateOne(user as IUser);
  res.status(HttpStatusCodes.OK).end();
}
  */

/**
 * Pour supprimer un user
 * @param req
 * @param res
 */
async function delete_(req: IReq, res: IRes) {
  const { id } = req.params;
  await UserService.delete(id as string);
  res.status(HttpStatusCodes.OK).end();
}

/**
 * Export default
 */
export default {
  getOne,
  add,
  //update,
  delete: delete_,
} as const;
