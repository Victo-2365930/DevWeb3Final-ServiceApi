import { RouteError } from '@src/common/util/route-errors';
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { IUser, User } from '@src/models/User';
import UserRepo from '@src/repos/UserRepo';

/******************************************************************************
                                Constants
******************************************************************************/

export const USER_NON_TROUVE = 'Utilisateur non trouvé';

/******************************************************************************
                                Functions
******************************************************************************/

/**
 * Trouver un user par son ID
 */
async function getById(id: string): Promise<IUser> {
  const user = await User.findById(id).exec();
  if (!user) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, USER_NON_TROUVE);
  }
  return user;
}

/**
 * Ajouter un user
 */
async function addOne(user: IUser): Promise<void> {
  return UserRepo.add(user);
}

/**
 * Mettre à jour un user - Ne sera pas implémenté
 *
async function updateOne(user: IUser): Promise<void> {
  if (user._id == undefined) {
    return;
  }
  const persists = await UserRepo.persists(user._id);
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, USER_NOT_FOUND_ERR);
  }

  return UserRepo.update(user);
}
*/

/**
 * Delete a user by their id.
 */
async function _delete(id: string): Promise<void> {
  const persists = await UserRepo.getOne(id);
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, USER_NON_TROUVE);
  }

  return UserRepo.delete(id);
}

/******************************************************************************
                                Export default
******************************************************************************/

export default {
  getById,
  addOne,
  //updateOne,
  delete: _delete,
} as const;
