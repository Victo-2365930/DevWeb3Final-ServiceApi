import { transIsDate } from '@src/common/util/validators';
import { isString } from 'jet-validators';
import { parseObject, TParseOnError } from 'jet-validators/utils';
import { model, Schema } from 'mongoose';

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

export interface IUserLogin {
  email: string;
  motDePasse: string;
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
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
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
                                  Setup
******************************************************************************/

// Initialize the "parseUser" function
const parseUser = parseObject<IUser>({
  _id: isString,
  nom: isString,
  email: isString,
  motDePasse: isString,
  created: transIsDate,
});

// Initialize the "parseUserLogin" function
const parseUserLogin = parseObject<IUserLogin>({
  email: isString,
  motDePasse: isString,
});

/******************************************************************************
                                Functions
******************************************************************************/

const DEFAULT_USER_VALS = (): IUser => ({
  _id: '-1',
  nom: '',
  email: '',
  motDePasse: '',
  created: new Date(),
});

/**
 * New user object.
 */
function __new__(user?: Partial<IUser>): IUser {
  const retVal = { ...DEFAULT_USER_VALS(), ...user };
  return parseUser(retVal, (errors) => {
    throw new Error('Setup new user failed ' + JSON.stringify(errors, null, 2));
  });
}

/**
 * Check is a user object. For the route validation.
 */
function test(arg: unknown, errCb?: TParseOnError): arg is IUser {
  return !!parseUser(arg, errCb);
}

/**
 * Check is a user login object. For the route validation.
 */
function testlogin(arg: unknown, errCb?: TParseOnError): arg is IUserLogin {
  return !!parseUserLogin(arg, errCb);
}
/******************************************************************************
                                Export default
******************************************************************************/

// mongoose.pluralize(null);
export const User = model<IUser>('user', UserSchema);
export default {
  new: __new__,
  test,
  testlogin,
} as const;
