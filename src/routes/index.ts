import { Request, Response, NextFunction, Router } from 'express';

import Paths from '@src/common/constants/Paths';
import PersonnageRoutes from './PersonnageRoutes';
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { Personnage } from '@src/models/Personnage';
import UserRoutes from './UserRoutes';
import { User } from '@src/models/User';

/* eslint-disable */

/******************************************************************************
                                Setup
******************************************************************************/

const apiRouter = Router();

function validatePersonnage(req: Request, res: Response, next: NextFunction) {
  if (req.body === null) {
    res
      .status(HttpStatusCodes.BAD_REQUEST)
      .send({ error: 'Personnage requis' })
      .end();
    return;
  }

  if (req.body.personnage === null) {
    res
      .status(HttpStatusCodes.BAD_REQUEST)
      .send({ error: 'Personnage requis' })
      .end();
    return;
  }

  const nouveauPersonnage = new Personnage(req.body.personnage);
  const error = nouveauPersonnage.validateSync();
  if (error !== null && error !== undefined) {
    res.status(HttpStatusCodes.BAD_REQUEST).send(error).end();
  } else {
    next();
  }
}

function validateUser(req: Request, res: Response, next: NextFunction) {
  if (req.body === null) {
    res
      .status(HttpStatusCodes.BAD_REQUEST)
      .send({ error: 'User requis' })
      .end();
    return;
  }

  if (req.body.user === null) {
    res
      .status(HttpStatusCodes.BAD_REQUEST)
      .send({ error: "Tous les paramètres d'un User sont requis" })
      .end();
    return;
  }

  const nouveauUser = new User(req.body.user);
  const error = nouveauUser.validateSync();
  if (error !== null && error !== undefined) {
    res.status(HttpStatusCodes.BAD_REQUEST).send(error).end();
  } else {
    next();
  }
}

// Init router
const leRouter = Router();

leRouter.get(Paths.Users.GetById, UserRoutes.getOne);
leRouter.get(Paths.Personnage.GetAll, PersonnageRoutes.getAll);
leRouter.get(Paths.Personnage.GetAllByLevel, PersonnageRoutes.getAllByLevel);
leRouter.get(Paths.Personnage.GetAllByJoueur, PersonnageRoutes.getAllByJoueur);
leRouter.post(Paths.Users.Add, UserRoutes.add);
leRouter.post(Paths.Personnage.Add, validatePersonnage, PersonnageRoutes.add);
leRouter.put(
  Paths.Personnage.Update,
  validatePersonnage,
  PersonnageRoutes.update,
);
leRouter.delete(Paths.Users.Delete, validateUser, UserRoutes.delete);
leRouter.delete(Paths.Personnage.Delete, PersonnageRoutes.delete);

// Add leRouter
apiRouter.use(Paths.Users.Base, leRouter);

/******************************************************************************
                                Export default
******************************************************************************/

export default apiRouter;
