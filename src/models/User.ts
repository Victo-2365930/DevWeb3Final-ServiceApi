import mongoose, { model, Schema } from 'mongoose';

/******************************************************************************
                                  Types
******************************************************************************/

export interface IUser {
  _id?: string;
  nom: string;
  email: string;
  motDePasse: string;
  created: Date;
}

/******************************************************************************
                                    Schemas
******************************************************************************/

const UserSchema = new Schema<IUser>({
  nom: {
    type: String,
    minlength: 1,
    maxlength: 100,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, //original: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      'Le courriel doit être valide (x@y.zz) .',
    ],
    required: [true, 'Le courriel est requis'],
  },
  motDePasse: {
    type: String,
    required: [true, 'Le mot de passe est requis'],
    minlength: [8, 'Le mot de passe doit avoir au moins 8 caractères'],
  },

  created: {
    type: Date,
    default: Date.now,
  },
});

/******************************************************************************
                                Export default
******************************************************************************/

mongoose.pluralize(null);
export const User = model<IUser>('User', UserSchema);
