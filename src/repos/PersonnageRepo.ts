import { IPersonnage, Personnage } from '@src/models/Personnage';

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
  const personnage = await Personnage.findById(id);
  return personnage;
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
  const PersonnageAModifier = await Personnage.findById(personnage._id);

  if (PersonnageAModifier === null) {
    throw new Error('Personnage non trouvé');
  }
  PersonnageAModifier.niveau = personnage.niveau;
  PersonnageAModifier.nom = personnage.nom;
  PersonnageAModifier.joueur = personnage.joueur;
  PersonnageAModifier.vivant = personnage.vivant;
  PersonnageAModifier.date_premiere_partie = personnage.date_premiere_partie;
  PersonnageAModifier.classe = personnage.classe;
  PersonnageAModifier.race = personnage.race;
  PersonnageAModifier.statistique.agilite = personnage.statistique.agilite;
  PersonnageAModifier.statistique.constitution =
    personnage.statistique.constitution;
  PersonnageAModifier.statistique.dexterite = personnage.statistique.dexterite;
  PersonnageAModifier.statistique.force = personnage.statistique.force;
  PersonnageAModifier.statistique.intelligence =
    personnage.statistique.intelligence;
  PersonnageAModifier.statistique.perception =
    personnage.statistique.perception;
  PersonnageAModifier.statistique.pouvoir = personnage.statistique.pouvoir;
  PersonnageAModifier.statistique.volonte = personnage.statistique.volonte;
  PersonnageAModifier.statistique.apparence = personnage.statistique.apparence;

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
  getAllByJoueur,
  getAll,
  add,
  update,
  delete: delete_,
} as const;
