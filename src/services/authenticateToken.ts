import jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import ENV from '@src/common/constants/ENV';
/**
 * Intergiciel pour authentifier le jeton de l'utilisateur
 *
 * @param {Request} req - La requête au serveur
 * @param {Response} res - La réponse du serveur
 * @param {NextFunction} next -La fonction a appeler pour continuer le processus
 */
function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const lastPartOfUrl = req.url.split('/').at(-1);
  if (lastPartOfUrl === 'generatetoken') {
    next();
    return;
  }

  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  //console.log(token);

  if (token == null) return res.sendStatus(HttpStatusCodes.UNAUTHORIZED);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  jwt.verify(token, ENV.Jwtsecret, (err: any) => {
    //console.log(err);

    if (err) return res.sendStatus(HttpStatusCodes.FORBIDDEN);

    next();
  });
}

export default authenticateToken;
