/* eslint-disable */
import insertUrlParams from 'inserturlparams';
import { customDeepCompare } from 'jet-validators/utils';

import { User, IUser } from '@src/models/User';
import { USER_NON_TROUVE } from '@src/services/UserService';

import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { ValidationError } from '@src/common/util/route-errors';

import Paths from './common/Paths';
import { parseValidationErr, TRes } from './common/util';
import { agent } from './support/setup';

/******************************************************************************
                               Constants
******************************************************************************/
//Dummy

// Dummy users for GET req
const dbUsers: IUser[] = [
  {
    nom: 'John Coutu',
    email: 'moncourriel@jaimemoncourriel.ca',
    motDePasse: 'qwerty123',
    created: new Date(),
  },
  {
    nom: 'John Dark',
    email: 'EmailDeLavie@incroyableCourriel.ca',
    motDePasse: 'incroyablemdp123',
    created: new Date(),
  },
  {
    nom: 'John BobLeChef',
    email: 'wowuncourriel@leserveur.ca',
    motDePasse: 'mdppaschercher999',
    created: new Date(),
  },
] as const;

// Don't compare "id" and "created" cause those are set dynamically by the
// database
const compareUserArrays = customDeepCompare({
  onlyCompareProps: ['nom', 'email', 'motDePasse', 'created'],
});

const mockify = require('@jazim/mock-mongoose');

/******************************************************************************
                                 Tests
  IMPORTANT: Following TypeScript best practices, we test all scenarios that 
  can be triggered by a user under normal circumstances. Not all theoretically
  scenarios (i.e. a failed database connection). 
******************************************************************************/

describe('userRouter', () => {
  let dbUsers: IUser[] = [];

  // Tester l'ajout d'un user
  describe(`'POST:${Paths.Users.Add}'`, () => {
    // Ajout réussi
    it(
      `doit retourner le code '${HttpStatusCodes.CREATED}' si la ` +
        'transaction est réussie',
      async () => {
        const user: IUser = {
          nom: 'John',
          email: 'uncourriel@undomaine.net',
          motDePasse: 'Incroyable',
          created: new Date(),
        };
        // Préparer le simulacre de Mongoose
        mockify(user).toReturn(user, 'save');
        const res = await agent.post(Paths.Users.Add).send({ user });
        expect(res.status).toBe(HttpStatusCodes.CREATED);
      },
    );

    // Paramètre manquant
    it(
      'doit retourner un JSON avec les erreurs et un code de ' +
        `'${HttpStatusCodes.BAD_REQUEST}' si un paramètre est ` +
        'manquant.',
      async () => {
        const res: TRes = await agent
          .post(Paths.Users.Add)
          .send({ user: null });
        expect(res.status).toBe(HttpStatusCodes.BAD_REQUEST);
        expect(res.body.error).toBe('User requis');
      },
    );
  });

  // Supprimer le User
  describe(`'DELETE:${Paths.Users.Delete}'`, () => {
    const getPath = (id: string) => insertUrlParams(Paths.Users.Delete, { id });

    // Succès
    it(
      `doit retourner un code de '${HttpStatusCodes.OK}' si la ` +
        'suppression est réussie.',
      async () => {
        // Préparer le simulacre de Mongoose
        mockify(dbUsers)
          .toReturn(dbUsers[0], 'findOne')
          .toReturn(dbUsers[0], 'findOneAndRemove');
        if (dbUsers[0]._id) {
          const _id = dbUsers[0]._id,
            res = await agent.delete(getPath(_id));
          expect(res.status).toBe(HttpStatusCodes.OK);
        }
      },
    );

    // Réservation non trouvée
    it(
      'doit retourner un JSON avec erreur ' +
        `'${USER_NON_TROUVE}' et un code de  ` +
        `'${HttpStatusCodes.NOT_FOUND}' si la réservation est introuvable.`,
      async () => {
        // Préparer le simulacre de Mongoose
        mockify(dbUsers).toReturn(null, 'findOne');

        const res: TRes = await agent.delete(getPath('-1'));
        expect(res.status).toBe(HttpStatusCodes.NOT_FOUND);
        expect(res.body.error).toBe(USER_NON_TROUVE);
      },
    );
  });
});
