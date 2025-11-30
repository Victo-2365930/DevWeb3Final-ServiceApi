import { RouteError } from '@src/common/util/route-errors';
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import PersonnageRepo from '@src/repos/PersonnageRepo';
import { IPersonnage, Personnage } from '@src/models/Personnage';

/******************************************************************************
                                Constants
******************************************************************************/

export const PERSONNAGE_NON_TROUVE = 'Personnage non trouvé';

/******************************************************************************
                                Functions
******************************************************************************/

/**
 * Pour extraire un personnage à partir de son id
 * @param id du personnage à extraire
 * @returns Retour un personnage ou null si non trouvé
 */
async function getById(id: string): Promise<IPersonnage | null> {
  return PersonnageRepo.getOne(id);
}

/**
 * Pour extraire tous les personnages
 * @returns une lste de tous les personnages, peut être vide
 */
function getAll(): Promise<IPersonnage[]> {
  return PersonnageRepo.getAll();
}

/**
 * Extraire tous les personnages du joueur à partir de son id
 * @param id_joueur id du joueur
 * @returns Une liste de personnages appartenant au joueur, peut être vide
 */
function getAllByJoueur(id_joueur: string): Promise<IPersonnage[]> {
  return PersonnageRepo.getAllByJoueur(id_joueur);
}

/**
 * Pour ajouter un personnage
 * @param personnage Personnage à ajouter
 * @returns VOID
 */
function addOne(personnage: IPersonnage): Promise<void> {
  return PersonnageRepo.add(personnage);
}

/**
 * Pour modifier un personnage
 * @param personnage Personnage à modifier
 * @returns VOID
 */
async function updateOne(personnage: IPersonnage): Promise<void> {
  if (personnage._id == undefined) {
    return;
  }

  const persists = await PersonnageRepo.getOne(personnage._id);
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, PERSONNAGE_NON_TROUVE);
  }
  // Return personnage
  return PersonnageRepo.update(personnage);
}

/**
 * Pour supprimer un personnage à partir de son id
 * @param id id du personnage à supprimer
 * @returns VOID
 */
async function _delete(id: string): Promise<void> {
  const persists = await PersonnageRepo.getOne(id);
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, PERSONNAGE_NON_TROUVE);
  }

  return PersonnageRepo.delete(id);
}

/******************************************************************************
                                Export default
******************************************************************************/

export default {
  getById,
  getAll,
  getAllByJoueur,
  addOne,
  updateOne,
  delete: _delete,
} as const;
