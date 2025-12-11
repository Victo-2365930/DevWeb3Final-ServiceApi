// **** Variables **** //

import { IUserLogin } from '@src/models/User';
import UserService from './UserService';
import jwt from 'jsonwebtoken';
import ENV from '@src/common/constants/ENV';

export const UTILISATEUR_NOT_FOUND_ERR = 'Utilisateur non trouvé';

/**
 * Générer un jeton pour un utilisateur
 *
 * @param {IUserLogin} utilisateur - L'utilisateur demandant le jeton
 * @returns {Promise} - Le jeton signé
 */
async function generateToken(utilisateur: IUserLogin): Promise<string> {
  const utilisateursBD = (await UserService.getAll()).filter(
    (user) => user.email === utilisateur.email,
  );

  if (
    utilisateursBD &&
    utilisateursBD.length > 0 &&
    utilisateursBD[0].motDePasse === utilisateur.motDePasse
  ) {
    const user = utilisateursBD[0];
    const userId = user._id;
    return jwt.sign(userId!, ENV.Jwtsecret);
  } else {
    return '';
  }
}

// **** Export default **** //
export default {
  generateToken,
} as const;
