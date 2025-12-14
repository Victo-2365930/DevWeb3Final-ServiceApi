/* eslint-disable */
import insertUrlParams from 'inserturlparams';
import { customDeepCompare } from 'jet-validators/utils';

import { PERSONNAGE_NON_TROUVE } from '@src/services/PersonnageService';

import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';

import Paths from './common/Paths';
import { parseValidationErr, TRes } from './common/util';
import { agent } from './support/setup';
import { Classe, IPersonnage, Personnage, Race } from '@src/models/Personnage';
import { Types } from 'mongoose';

/******************************************************************************
                               Constants
******************************************************************************/

// Données bidon pour les personnages (simulacre de GET)
const DB_Personnages: IPersonnage[] = [
  {
    niveau: 5,
    nom: 'Aldren le Juste',
    joueur: new Types.ObjectId('64f1a1a1a1a1a1a1a1a1a1a1'),
    vivant: true,
    date_premiere_partie: new Date('2024-01-15'),
    classe: Classe.Paladin,
    race: Race.Humain,
    statistique: {
      force: 16,
      dexterite: 12,
      agilite: 11,
      constitution: 15,
      intelligence: 10,
      pouvoir: 14,
      volonte: 15,
      perception: 11,
      apparence: 8,
    },
  },
  {
    niveau: 7,
    nom: 'Lyssira Ombreflèche',
    joueur: new Types.ObjectId('64f1b2b2b2b2b2b2b2b2b2b2'),
    vivant: true,
    date_premiere_partie: new Date('2023-11-02'),
    classe: Classe.Assassin,
    race: Race.Sylvain,
    statistique: {
      force: 11,
      dexterite: 18,
      agilite: 17,
      constitution: 10,
      intelligence: 13,
      pouvoir: 9,
      volonte: 12,
      perception: 16,
      apparence: 9,
    },
  },
  {
    niveau: 10,
    nom: 'Kaelor le Voilé',
    joueur: new Types.ObjectId('64f1c3c3c3c3c3c3c3c3c3c3'),
    vivant: false,
    date_premiere_partie: new Date('2022-06-18'),
    classe: Classe.Sorcier_mentaliste,
    race: Race.Dainah,
    statistique: {
      force: 8,
      dexterite: 10,
      agilite: 9,
      constitution: 11,
      intelligence: 18,
      pouvoir: 19,
      volonte: 17,
      perception: 14,
      apparence: 6,
    },
  },
];

// Don't compare 'id' and 'created' cause those are set dynamically by the
// database
const comparePersonnageArrays = customDeepCompare({
  onlyCompareProps: [
    'nom',
    'niveau',
    'classe',
    'race',
    'vivant',
    'statistique',
  ],
});

const mockify = require('@jazim/mock-mongoose');
/******************************************************************************
                                 Tests
  IMPORTANT: Following TypeScript best practices, we test all scenarios that 
  can be triggered by a user under normal circumstances. Not all theoretically
  scenarios (i.e. a failed database connection). 
******************************************************************************/

describe('PersonnageRouter', () => {
  const dbPersonnages: IPersonnage[] = [];

  // Extraire tous les Personnages
  describe(`'GET:${Paths.Personnage.GetAll}'`, () => {
    // Succès
    it(
      'doit retourner un JSON avec tous les Personnages et un code de ' +
        `of '${HttpStatusCodes.OK}' si réussi.`,
      async () => {
        // Préparer le simulacre de Mongoose
        const data = [...DB_Personnages];
        mockify(Personnage).toReturn(data, 'find');
        const res: TRes<{ Personnages: IPersonnage[] }> = await agent.get(
          Paths.Personnage.GetAll,
        );
        expect(res.status).toBe(HttpStatusCodes.OK);
        expect(
          comparePersonnageArrays(res.body.Personnages, DB_Personnages),
        ).toBeTruthy();
      },
    );
  });

  // Tester l'ajout d'un Personnage
  describe(`'POST:${Paths.Personnage.Add}'`, () => {
    // Ajout réussi
    it(
      `doit retourner le code '${HttpStatusCodes.CREATED}' si la ` +
        'transaction est réussie',
      async () => {
        const personnageTest: IPersonnage = {
          nom: 'Beasley',
          niveau: 1,
          joueur: new Types.ObjectId(),
          vivant: true,
          date_premiere_partie: new Date(),
          classe: Classe.Explorateur,
          race: Race.Humain,
          statistique: {
            force: 10,
            dexterite: 10,
            agilite: 10,
            constitution: 10,
            intelligence: 10,
            pouvoir: 10,
            volonte: 10,
            perception: 10,
            apparence: 5,
          },
        };
        // Préparer le simulacre de Mongoose
        mockify(Personnage).toReturn(Personnage, 'save');
        const res = await agent
          .post(Paths.Personnage.Add)
          .send({ Personnage: personnageTest });
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
          .post(Paths.Personnage.Add)
          .send({ Personnage: null });
        expect(res.status).toBe(HttpStatusCodes.BAD_REQUEST);
        expect(res.body.error).toBe('Personnage requis');
      },
    );
  });

  // Mise à jour d'un Personnage
  describe(`'PUT:${Paths.Personnage.Update}'`, () => {
    // Succès
    it(
      `doit retourner un code de '${HttpStatusCodes.OK}' si la mise à jour ` +
        'est réussie.',
      async () => {
        const LePersonnage = DB_Personnages[0];
        LePersonnage.nom = 'Johnny B. Good';

        // Préparer le simulacre de Mongoose
        mockify(Personnage).toReturn(LePersonnage, 'save');

        const res = await agent
          .put(Paths.Personnage.Update)
          .send({ Personnage });
        expect(res.status).toBe(HttpStatusCodes.OK);
      },
    );

    // Réservation non trouvée
    it(
      'doit retourner un JSON avec erreur ' +
        `'${PERSONNAGE_NON_TROUVE}' et un code de ` +
        `'${HttpStatusCodes.NOT_FOUND}' si l'id n'est pas trouvé.`,
      async () => {
        // Préparer le simulacre de Mongoose pour ne retourner aucun personnage
        mockify(Personnage).toReturn(null, 'findOne');

        const personnageInconnu = {
          // Utiliser un _id de Mongoose non trouvé
          _id: new Types.ObjectId('64f1c3c3c3c3c3c3c3c3c2c2'),
          nom: 'Inconnu',
          niveau: 1,
          joueur: new Types.ObjectId(),
          vivant: true,
          date_premiere_partie: new Date(),
          classe: Classe.Explorateur,
          race: Race.Humain,
          statistique: {
            force: 10,
            dexterite: 10,
            agilite: 10,
            constitution: 10,
            intelligence: 10,
            pouvoir: 10,
            volonte: 10,
            perception: 10,
            apparence: 5,
          },
        };

        const res: TRes = await agent
          .put(Paths.Personnage.Update)
          .send({ personnage: personnageInconnu });

        expect(res.status).toBe(HttpStatusCodes.NOT_FOUND);
        expect(res.body.error).toBe(PERSONNAGE_NON_TROUVE);
      },
    );
  });

  // Supprimer le personnage
  describe(`'DELETE:${Paths.Personnage.Delete}'`, () => {
    const getPath = (id: string) =>
      insertUrlParams(Paths.Personnage.Delete, { id });

    // Succès
    it(
      `doit retourner un code de '${HttpStatusCodes.OK}' si la ` +
        'suppression est réussie.',
      async () => {
        // Préparer le simulacre de Mongoose
        mockify(Personnage)
          .toReturn(DB_Personnages[0], 'findOne')
          .toReturn(DB_Personnages[0], 'findOneAndRemove');
        if (DB_Personnages[0]._id) {
          const _id = DB_Personnages[0]._id,
            res = await agent.delete(getPath(_id));
          expect(res.status).toBe(HttpStatusCodes.OK);
        }
      },
    );

    // Personnage non trouvée
    it(
      'doit retourner un JSON avec erreur ' +
        `'${PERSONNAGE_NON_TROUVE}' et un code de  ` +
        `'${HttpStatusCodes.NOT_FOUND}' si la réservation est introuvable.`,
      async () => {
        // Préparer le simulacre de Mongoose
        mockify(Personnage).toReturn(null, 'findOne');

        const res: TRes = await agent.delete(getPath('-1'));
        expect(res.status).toBe(HttpStatusCodes.NOT_FOUND);
        expect(res.body.error).toBe(PERSONNAGE_NON_TROUVE);
      },
    );
  });
});
