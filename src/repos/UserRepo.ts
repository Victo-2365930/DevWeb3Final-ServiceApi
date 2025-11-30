import { IUser, User } from '@src/models/User';

/******************************************************************************
                                Functions
******************************************************************************/

/**
 * POur extraire un user par son ID
 * @param id du user
 * @returns Un user ou null
 */
async function getOne(id: string): Promise<IUser | null> {
  const user = await User.findOne({ _id: id });
  return user;
}

/**
 * Pour ajouter un user
 * @param user User à ajouter
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
 * Pour supprimer un user
 * @param id Id du suer à supprimer
 */
async function delete_(id: string): Promise<void> {
  await User.deleteOne({ _id: id });
}

/**
 * See if a user with the given id exists.
 * Ne sera pas utilisé

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
  add,
  //update,
  delete: delete_,
} as const;
