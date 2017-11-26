
import {Enum} from 'enumify';

export default class Actions extends Enum {};
Actions.initEnum([
  'GET_SESSION_REQUEST',
  'GET_SESSION_RESPONSE',
  'SIGN_OUT_REQUEST',
  'SIGN_OUT_RESPONSE'
]);
