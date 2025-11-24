import mongoose, { Schema, model, Types } from 'mongoose';
/*
Basé sur le Livre Anima:Beyond Fantasy, Core Exxet version 2
*/

/******************************************************************************
                                   Enums
******************************************************************************/

export enum Classe {
  Guerrier = 'Guerrier',
  Guerrier_acrobate = 'Guerrier Acrobate',
  Paladin = 'Paladin',
  Paladin_noir = 'Paladin Noir',
  Maitre_arme = 'Maître d\'arme',
  Virtuose_martiale = 'Virtuose martiale',
  Tao = 'Tao',
  Explorateur = 'Explorateur',
  Ombre = 'Ombre',
  Voleur = 'Voleur',
  Assassin = 'Assassin',
  Sorcier = 'Sorcier',
  Mage_bataille = 'Mage de Bataille',
  Illusioniste = 'Illusioniste',
  Sorcier_mentaliste = 'Sorcier Mentaliste',
  Convocateur = 'Convocateur',
  Guerrier_convocateur = 'Guerrier Convocateur',
  Mentaliste = 'Mentaliste',
  Guerrier_mentaliste = 'Guerrier Mentaliste',
  Touche_a_tout = 'Touche à Tout',
}

export enum Race {
  Humain = 'Humain',
  Sylvain = 'Sylvain',
  Jayan = 'Jayan',
  Danjayni = 'D\'Anjayni',
  Evudan = 'Evudan',
  Dainah = 'Dainah',
  Dukzarist = 'Duk\'zarist',
  Devas = 'Devas',
  Vetalas = 'Vetalas',
  Tuandalyr = 'Tuan Dalyr',
}

/******************************************************************************
                                     Types
******************************************************************************/

export interface IStatistiques {
  agilite: number;
  constitution: number;
  dexterite: number;
  force: number;
  intelligence: number;
  perception: number;
  pouvoir: number;
  volonte: number;
  apparence: number;
}

export interface IPersonnage {
  _id?: string;
  niveau: number;
  nom: string;
  joueur: Types.ObjectId;
  vivant: boolean;
  date_premiere_partie: Date;
  classe: Classe;
  race: Race;
  statistique: IStatistiques;
}

/******************************************************************************
                                    Schemas
******************************************************************************/

const StatistiquesSchema = new Schema<IStatistiques>({
  force: {
    type: Number,
    required: [true, 'La statistique force est requise'],
    min: [1, 'La statistique force doit être supérieure à 0'],
    max: [20, 'La statistique force doit être au maximum de 20'],
  },
  dexterite: {
    type: Number,
    required: [true, 'La statistique dextérité est requise'],
    min: [1, 'La statistique dexterité doit être supérieure à 0'],
    max: [20, 'La statistique dexterité doit être au maximum de 20'],
  },
  agilite: {
    type: Number,
    required: [true, 'La statistique agilité est requise'],
    min: [1, 'La statistique agilité doit être supérieure à 0'],
    max: [20, 'La statistique agilité doit être au maximum de 20'],
  },
  constitution: {
    type: Number,
    required: [true, 'La statistique constitution est requise'],
    min: [1, 'La statistique constitution doit être supérieure à 0'],
    max: [20, 'La statistique constitution doit être au maximum de 20'],
  },
  intelligence: {
    type: Number,
    required: [true, 'La statistique intelligence est requise'],
    min: [1, 'La statistique intelligence doit être supérieure à 0'],
    max: [20, 'La statistique intelligence doit être au maximum de 20'],
  },
  pouvoir: {
    type: Number,
    required: [true, 'La statistique pouvoir est requise'],
    min: [1, 'La statistique pouvoir doit être supérieure à 0'],
    max: [20, 'La statistique pouvoir doit être au maximum de 20'],
  },
  volonte: {
    type: Number,
    required: [true, 'La statistique volonté est requise'],
    min: [1, 'La statistique volonté doit être supérieure à 0'],
    max: [20, 'La statistique volonté doit être au maximum de 20'],
  },
  perception: {
    type: Number,
    required: [true, 'La statistique perception est requise'],
    min: [1, 'La statistique perception doit être supérieure à 0'],
    max: [20, 'La statistique perception doit être au maximum de 20'],
  },
  apparence: {
    type: Number,
    required: [true, 'La statistique apparence est requise'],
    min: [1, 'La statistique apparence doit être supérieure à 0'],
    max: [10, 'La statistique apparence doit être au maximum de 10'],
  },
});

const PersonnageSchema = new Schema<IPersonnage>({
  niveau: {
    type: Number,
    required: [true, 'Le niveau est requis'],
    min: 0,
    max: 20,
  },
  nom: {
    type: String,
    required: [true, 'Nom du personnage requis'],
    maxlength: 100,
  },
  joueur: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'ID du joueur requis'],
  },
  vivant: { type: Boolean },
  date_premiere_partie: { type: Date },
  classe: {
    type: String,
    enum: Classe,
    required: [true, 'La classe est requise'],
  },
  race: {
    type: String,
    enum: Race,
    required: [true, 'La race est requise'],
  },
  statistique: {
    type: StatistiquesSchema,
    required: [true, 'Les statistiques sont requis'],
  },
});

/******************************************************************************
                                Export model
******************************************************************************/

mongoose.pluralize(null);
export const Personnage = model<IPersonnage>('Personnages', PersonnageSchema);
