import { Request, Response, NextFunction, Router } from 'express';

import Paths from '@src/common/constants/Paths';
import PersonnageRoutes from './PersonnageRoutes';
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { Personnage } from '@src/models/Personnage';
import UserRoutes from './UserRoutes';
import { User } from '@src/models/User';
import JetonRoutes from './JetonRoutes';

/******************************************************************************
                                Setup
******************************************************************************/

const apiRouter = Router();

//JWT Token
const tokenRouter = Router();
tokenRouter.post(Paths.GenerateToken.Post, JetonRoutes.generateToken);

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
      .send({ error: 'Tous les paramètres d\'un User sont requis' })
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

const leRouterPersonnage = Router();
const leRouterUser = Router();

// Personnage Routes
leRouterPersonnage.get(Paths.Personnage.GetAll, PersonnageRoutes.getAll);
leRouterPersonnage.get(
  Paths.Personnage.GetAllByJoueur,
  PersonnageRoutes.getAllByJoueur,
);
leRouterPersonnage.get(Paths.Personnage.GetById, PersonnageRoutes.getOne);

leRouterPersonnage.post(
  Paths.Personnage.Add,
  validatePersonnage,
  PersonnageRoutes.add,
);
leRouterPersonnage.put(
  Paths.Personnage.Update,
  validatePersonnage,
  PersonnageRoutes.update,
);
leRouterPersonnage.delete(Paths.Personnage.Delete, PersonnageRoutes.delete);

// User Routes
leRouterUser.get(Paths.Users.GetById, UserRoutes.getOne);
leRouterUser.post(Paths.Users.Add, validateUser, UserRoutes.add);
leRouterUser.delete(Paths.Users.Delete, UserRoutes.delete);

// Add leRouter
apiRouter.use(Paths.Users.Base, leRouterUser);
apiRouter.use(Paths.Personnage.Base, leRouterPersonnage);
apiRouter.use(Paths.GenerateToken.Base, tokenRouter);

/******************************************************************************
                                Export default
******************************************************************************/

export default apiRouter;
