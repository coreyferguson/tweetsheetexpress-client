
import axios from 'axios';
import config from 'config';

export class SheetService {

  constructor(options) {
    options = Object.assign({}, {
      url: `${config.api}/sheets`
    }, options);
    this._url = options.url;
    this._axios = axios;
  }

  save(sheet) {
    return this._axios({
      method: 'POST',
      url: this._url,
      data: sheet
    });
  }

  findOne(sheetId) {
    return this._axios({
      method: 'GET',
      url: this._url,
      params: {
        id: sheetId
      }
    });
  }

  tweetAll(sheetId) {
    return this._axios({
      method: 'POST',
      url: `${this._url}/tweet`,
      data: { sheetId },
      withCredentials: true
    });
  }

}

const singleton = new SheetService();
export default singleton;
