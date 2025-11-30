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
 * Trouver un user par son ID
 */
async function getById(id: string): Promise<IPersonnage | null> {
  return PersonnageRepo.getOne(id);
}

/**
 * Extraire tous les personnages.
 */
function getAll(): Promise<IPersonnage[]> {
  return PersonnageRepo.getAll();
}

/**
 * Extraire tous les personnages par leur niveau
 */
function getAllByLevel(niveau: number): Promise<IPersonnage[]> {
  return PersonnageRepo.getAllByLevel(niveau);
}

/**
 * Extraire tous les personnages par leur nom de joueur
 */
function getAllByJoueur(id_joueur: string): Promise<IPersonnage[]> {
  return PersonnageRepo.getAllByJoueur(id_joueur);
}

/**
 * Ajouter un Personnage.
 */
function addOne(personnage: IPersonnage): Promise<void> {
  return PersonnageRepo.add(personnage);
}

/**
 * Mets à jour un personnage.
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
 * Supprimer un personnage par son id
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
  getAllByLevel,
  getAllByJoueur,
  addOne,
  updateOne,
  delete: _delete,
} as const;
