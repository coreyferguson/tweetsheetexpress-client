
import {Enum} from 'enumify';

export default class Actions extends Enum {};
Actions.initEnum([
  'CREATE_REQUEST',
  'CREATE_RESPONSE',
  'VIEW_REQUEST',
  'VIEW_RESPONSE',
  'TWEET_BATCH_START',
  'TWEET_BATCH_STOP',
  'TWEET_REQUEST',
  'TWEET_RESPONSE'
]);
