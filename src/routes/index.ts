import { Request, Response, NextFunction, Router } from 'express';

import Paths from '@src/common/constants/Paths';
import PersonnageRoutes from './PersonnageRoutes';
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { Personnage } from '@src/models/Personnage';

/******************************************************************************
                                Setup
******************************************************************************/

const apiRouter = Router();

// ** Add PersonnageRoutes ** //

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

// Init router
const personnageRouter = Router();

// Get all users
personnageRouter.get(Paths.Users.Get, PersonnageRoutes.getAll);
personnageRouter.get(Paths.Users.GetAllByLevel, PersonnageRoutes.getAll);
personnageRouter.get(Paths.Users.GetAllByJoueur, PersonnageRoutes.getAll);
personnageRouter.post(
  Paths.Users.Add,
  validatePersonnage,
  PersonnageRoutes.add,
);
personnageRouter.put(Paths.Users.Update, PersonnageRoutes.update);
personnageRouter.delete(Paths.Users.Delete, PersonnageRoutes.delete);

// Add personnageRouter
apiRouter.use(Paths.Users.Base, personnageRouter);

/******************************************************************************
                                Export default
******************************************************************************/

export default apiRouter;
