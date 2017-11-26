
import axios from 'axios';
import config from 'config';

export class SessionService {

  constructor(options) {
    options = options || {};
    this._url = options.url || `${config.api}`;
    this._axios = options.axios || axios;
  }

  findMe() {
    return this._axios({
      method: 'GET',
      url: `${this._url}/session`,
      params: {
        redirectUrl: window.location.href
      },
      withCredentials: true
    });
  }

  signOut() {
    return this._axios({
      method: 'GET',
      url: `${this._url}/signOut`,
      withCredentials: true
    });
  }

}

const singleton = new SessionService();
export default singleton;
