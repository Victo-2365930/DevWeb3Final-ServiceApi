import { Request, Response, NextFunction, Router } from 'express';

import Paths from '@src/common/constants/Paths';
import PersonnageRoutes from './PersonnageRoutes';
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { Personnage } from '@src/models/Personnage';

/* eslint-disable */

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

personnageRouter.get(Paths.Personnage.GetAll, PersonnageRoutes.getAll);
personnageRouter.get(
  Paths.Personnage.GetAllByLevel,
  PersonnageRoutes.getAllByLevel,
);
personnageRouter.get(
  Paths.Personnage.GetAllByJoueur,
  PersonnageRoutes.getAllByJoueur,
);
personnageRouter.post(
  Paths.Personnage.Add,
  validatePersonnage,
  PersonnageRoutes.add,
);
personnageRouter.put(
  Paths.Personnage.Update,
  validatePersonnage,
  PersonnageRoutes.update,
);
personnageRouter.delete(Paths.Personnage.Delete, PersonnageRoutes.delete);

// Add personnageRouter
apiRouter.use(Paths.Users.Base, personnageRouter);

/******************************************************************************
                                Export default
******************************************************************************/

export default apiRouter;
