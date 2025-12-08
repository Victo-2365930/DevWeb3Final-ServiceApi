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
 * Pour extraire un user à partir de son id
 * @param id id du user à extraire
 * @returns Un user ou null si non trouvé
 */
async function getById(id: string): Promise<IUser | null> {
  return UserRepo.getOne(id);
}

/**
 * Pour extraire tous les User
 * @returns une liste de User, peut être vide
 */
async function getAll(): Promise<IUser[]> {
  return UserRepo.getAll();
}

/**
 * Pour ajouter un user
 * @param user User à ajouter
 * @returns VOID
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
 * Pour supprimer un user
 * @param id id du user à supprimer
 * @returns VOID
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
  getAll,
  addOne,
  //updateOne,
  delete: _delete,
} as const;
