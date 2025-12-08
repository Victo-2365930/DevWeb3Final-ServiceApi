import { IPersonnage, Personnage } from '@src/models/Personnage';

/******************************************************************************
                                Functions
******************************************************************************/

/**
 * Extraire un seul Personnage par son id
 *
 * @param id
 * @returns un personnage à partir du id ou un personnage null
 */

async function getOne(id: string): Promise<IPersonnage | null> {
  const personnage = await Personnage.findOne({ _id: id });
  return personnage;
}

/**
 * Pour extraire tous les personnages de la BD
 * @returns Un tableau de tous les personnages
 */
async function getAll(): Promise<IPersonnage[]> {
  const Personnages = await Personnage.find();
  return Personnages;
}

/**
 * Pour extraire la liste de personnages appartenant à un joueur
 * @param id_joueur id du joueur
 * @returns La liste du personnages du joueur, peut être vide
 */
async function getAllByJoueur(id_joueur: string): Promise<IPersonnage[]> {
  const personnages = await Personnage.find({
    joueur: id_joueur,
  });

  return personnages;
}

/**
 *  Pour ajouter un personnage
 * @param personnage Personnage à ajouter
 */

async function add(personnage: IPersonnage): Promise<void> {
  const nouveauPersonnage = new Personnage(personnage);
  await nouveauPersonnage.save();
}

/**
 * Pour mettre à jour un Personnage
 * @param personnage Personnage à mettre à jour
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
  await Personnage.deleteOne({ _id: id });
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
