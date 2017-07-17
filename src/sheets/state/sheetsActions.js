
import {Enum} from 'enumify';

export default class Actions extends Enum {};
Actions.initEnum([
  'CREATE_REQUEST',
  'CREATE_RESPONSE',
  'VIEW_REQUEST',
  'VIEW_RESPONSE',
  'TWEET_ALL_REQUEST',
  'TWEET_ALL_RESPONSE'
]);
