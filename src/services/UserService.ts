import { RouteError } from '@src/common/util/route-errors';
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { IUser, User } from '@src/models/User';

/******************************************************************************
                                Constants
******************************************************************************/

export const USER_NOT_FOUND_ERR = 'Utilisateur non trouvé';

/******************************************************************************
                                Functions
******************************************************************************/

/**
 * Get tous les user
 */
function getAll(): Promise<IUser[]> {
  return User.find().exec();
}

/**
 * Ajouter un user
 */
async function addOne(user: IUser): Promise<void> {
  const newUser = new User(user);
  await newUser.save();
}

/**
 * Mettre à jour un user
 */
async function updateOne(user: IUser): Promise<void> {
  const persists = await UserRepo.persists(user._id);
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, USER_NOT_FOUND_ERR);
  }
  // Return user
  return UserRepo.update(user);
}

/**
 * Delete a user by their id.
 */
async function _delete(id: string): Promise<void> {
  const persists = await UserRepo.persists(id);
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, USER_NOT_FOUND_ERR);
  }
  // Delete user
  return UserRepo.delete(id);
}

/******************************************************************************
                                Export default
******************************************************************************/

export default {
  getAll,
  addOne,
  updateOne,
  delete: _delete,
} as const;
