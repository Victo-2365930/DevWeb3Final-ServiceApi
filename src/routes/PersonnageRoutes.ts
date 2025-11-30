import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import PersonnageService from '@src/services/PersonnageService';
import { IPersonnage } from '@src/models/Personnage';
import { IReq, IRes } from './common/types';

/******************************************************************************
                                Functions
******************************************************************************/

/**
 *
 *  Extraire un Personnage par son ID
 */
async function getOne(req: IReq, res: IRes) {
  const { id } = req.params;
  const personnage = await PersonnageService.getById(id as string);
  res.status(HttpStatusCodes.OK).json({ personnage });
}

/**
 * Extraire tous les personnages
 */
async function getAll(_: IReq, res: IRes) {
  const personnages = await PersonnageService.getAll();
  res.status(HttpStatusCodes.OK).json({ personnages });
}

/**
 * Extraire tous les personnages selon leur niveau
 */
async function getAllByLevel(req: IReq, res: IRes) {
  const { niveau } = req.params;
  const personnages = await PersonnageService.getAllByLevel(niveau as number);
  res.status(HttpStatusCodes.OK).json({ personnages });
}

/**
 * Extraire tous les personnages d'un joueur à partir de son ID
 */
async function getAllByJoueur(req: IReq, res: IRes) {
  const { id_joueur } = req.params;
  const personnages = await PersonnageService.getAllByJoueur(
    id_joueur as string,
  );
  res.status(HttpStatusCodes.OK).json({ personnages });
}

/**
 * Ajouter un personnage
 */
async function add(req: IReq, res: IRes) {
  const { personnage } = req.body;
  await PersonnageService.addOne(personnage as IPersonnage);
  res.status(HttpStatusCodes.CREATED).end();
}

/**
 * Mettre à jour un personnage
 */
async function update(req: IReq, res: IRes) {
  const { personnage } = req.body;
  await PersonnageService.updateOne(personnage as IPersonnage);
  res.status(HttpStatusCodes.OK).end();
}

/**
 * Supprimer un personnage
 */
async function delete_(req: IReq, res: IRes) {
  const { id } = req.params;
  await PersonnageService.delete(id as string);
  res.status(HttpStatusCodes.OK).end();
}

/******************************************************************************
                                Export default
******************************************************************************/

export default {
  getOne,
  getAll,
  getAllByLevel,
  getAllByJoueur,
  add,
  update,
  delete: delete_,
} as const;
