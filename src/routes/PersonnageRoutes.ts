import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import PersonnageService from '@src/services/PersonnageService';
import { IPersonnage } from '@src/models/Personnage';
import { IReq, IRes } from './common/types';

/******************************************************************************
                                Functions
******************************************************************************/

/**
 * Pour extraire un personnage par son ID
 * @param req
 * @param res
 */
async function getOne(req: IReq, res: IRes) {
  const { id } = req.params;
  const personnage = await PersonnageService.getById(id as string);
  res.status(HttpStatusCodes.OK).json({ personnage });
}

/**
 * Pour extraire tous les personnages
 * @param _
 * @param res
 */
async function getAll(_: IReq, res: IRes) {
  const personnages = await PersonnageService.getAll();
  res.status(HttpStatusCodes.OK).json({ personnages });
}

/**
 * Pour extraire tous les personnages d'un joueur
 * @param req
 * @param res
 */
async function getAllByJoueur(req: IReq, res: IRes) {
  const { idJoueur } = req.params;
  const personnages = await PersonnageService.getAllByJoueur(
    idJoueur as string,
  );
  res.status(HttpStatusCodes.OK).json({ personnages });
}

/**
 * Pour ajouter un personnage
 * @param req
 * @param res
 */
async function add(req: IReq, res: IRes) {
  const { personnage } = req.body;
  await PersonnageService.addOne(personnage as IPersonnage);
  res.status(HttpStatusCodes.CREATED).end();
}

/**
 * Pour mettre à jour un personnage
 * @param req
 * @param res
 */
async function update(req: IReq, res: IRes) {
  const { personnage } = req.body;
  await PersonnageService.updateOne(personnage as IPersonnage);
  res.status(HttpStatusCodes.OK).end();
}

/**
 * Pour supprimer un personnage
 * @param req
 * @param res
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
  getAllByJoueur,
  add,
  update,
  delete: delete_,
} as const;
