
import axios from 'axios';
import config from 'config';

export class SessionService {

  constructor(options) {
    options = options || {};
    this._url = options.url || `${config.api}/session`;
    this._axios = options.axios || axios;
  }

  findMe() {
    return this._axios({
      method: 'GET',
      url: this._url,
      params: {
        redirectUrl: window.location.href
      },
      withCredentials: true
    });
  }

}

const singleton = new SessionService();
export default singleton;
