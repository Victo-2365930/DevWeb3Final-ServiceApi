import { IUser, User } from '@src/models/User';
import { getRandomInt } from '@src/common/util/misc';

import orm from './MockOrm';

/******************************************************************************
                                Functions
******************************************************************************/

/**
 * Get one user.
 */
async function getOne(id: string): Promise<IUser | null> {
  const user = await User.findOne({ id: id });
  return user;
}

/**
 * Ajouter un user
 */
async function add(user: IUser): Promise<void> {
  const nouveauUser = new User(user);
  await nouveauUser.save();
}

/**
 * Mettre à jour un user - Ne sera pas implémenté
 *
async function update(user: IUser): Promise<void> {
}
*/

/**
 * Delete one user.
 */
async function delete_(id: string): Promise<void> {
  await User.deleteOne({ id: id });
}

/**
 * See if a user with the given id exists.

async function persists(id: string): Promise<boolean> {
  const db = await orm.openDb();
  for (const user of db.users) {
    if (user._id === id) {
      return true;
    }
  }
  return false;
}
*/

/******************************************************************************
                                Export default
******************************************************************************/

export default {
  getOne,
  //persists,
  add,
  //update,
  delete: delete_,
} as const;
