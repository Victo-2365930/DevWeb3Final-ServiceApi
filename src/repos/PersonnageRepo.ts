import ENV from '@src/common/constants/ENV';
import { IPersonnage, Personnage } from '@src/models/Personnage';

import mongoose from 'mongoose';

/******************************************************************************
                                Functions
******************************************************************************/

/**
 * Extraire un Personnage par son ID
 *
 * @param {string} id - ID du personnage à extraire
 *
 * @returns {IPersonnage} - Un personnage si trouvé
 */

async function getOne(id: string): Promise<IPersonnage | null> {
  const personnage = await Personnage.findOne({ id: id });
  return personnage;
}

/**
 * Extraire tous les personnage par niveau
 *
 * @param {number} niveau - Niveau de personnage à extraire
 *
 * @returns {IPersonnage[]} Un tableau de tous les personnages avec ce niveau
 */
async function getAllByLevel(niveau: number): Promise<IPersonnage[]> {
  const personnages = await Personnage.find({ niveau: niveau });
  return personnages;
}

/**
 * Extraire tous les personnages du joueur
 *
 * @param {string} nom_joueur - nom du joueur
 *
 * @returns {IPersonnage[]} Un tableau de tous les personnages du joueur
 */
async function getAllByJoueur(nom_joueur: string): Promise<IPersonnage[]> {
  const personnages = await Personnage.find({ nom_joueur: nom_joueur });
  return personnages;
}

/**
 * Extraire tous les Personnages.
 *
 * @returns {IPersonnage[]} Un tableau de tous les personnages
 */
async function getAll(): Promise<IPersonnage[]> {
  const Personnages = await Personnage.find();
  return Personnages;
}

/**
 * Ajouter un Personnage.
 *
 * @param {IPersonnage} personnage - Personnage à ajouter
 */

async function add(personnage: IPersonnage): Promise<void> {
  const nouveauPersonnage = new Personnage(personnage);
  await nouveauPersonnage.save();
}

/**
 * Mettre à jour un Personnage.
 *
 * @param {IPersonnage} personnage - Personnage à modifier
 */
async function update(personnage: IPersonnage): Promise<void> {
  const PersonnageAModifier = await Personnage.findOne({ id: personnage.id });
  if (PersonnageAModifier === null) {
    throw new Error('Personnage non trouvé');
  }
  PersonnageAModifier.niveau = personnage.niveau;
  await PersonnageAModifier.save();
}

/**
 * Supprimer un Personnage.
 *
 * @param {string} id -  id de l'Personnage à supprimer
 */
async function delete_(id: string): Promise<void> {
  await Personnage.deleteOne({ id: id });
}

/******************************************************************************
                                Export default
******************************************************************************/

export default {
  getOne,
  getAllByLevel,
  getAllByJoueur,
  getAll,
  add,
  update,
  delete: delete_,
} as const;
