import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { IUser } from '@src/models/User';
import { IReq, IRes } from './common/types';
import UserService from '@src/services/UserService';

/******************************************************************************
 *                                 Functions
 ******************************************************************************/

/**
 * Extraire tous les utilisateurs.
 */
async function getAll(_: IReq, res: IRes) {
  const users = await UserService.getAll();
  res.status(HttpStatusCodes.OK).json({ users });
}

/**
 * Ajouter un utilisateur.
 */
async function add(req: IReq, res: IRes) {
  const { user } = req.body;
  await UserService.addOne(user as IUser);
  res.status(HttpStatusCodes.CREATED).end();
}

/**
 * Mettre à jour un utilisateur.
 */
async function update(req: IReq, res: IRes) {
  const { user } = req.body;
  await UserService.updateOne(user as IUser);
  res.status(HttpStatusCodes.OK).end();
}

/**
 * Supprimer un utilisateur.
 */
async function delete_(req: IReq, res: IRes) {
  const { id } = req.params;
  await UserService.delete(id as string);
  res.status(HttpStatusCodes.OK).end();
}

/******************************************************************************
 *                                 Export default
 ******************************************************************************/

export default {
  getAll,
  add,
  update,
  delete: delete_,
} as const;
