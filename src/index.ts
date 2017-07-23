import { inject, injectable, optional } from 'inversify';
import * as _fetch from 'isomorphic-fetch';
import { resolve } from 'url';
import { NpmsClient } from './interface';
import { compactObject, QsUrl, toPairs } from './util';
import Client = NpmsClient.Client;
import Info = NpmsClient.Info;
import RespSearch = NpmsClient.RespSearch;
import SearchArg = NpmsClient.SearchArg;
import SearchQuery = NpmsClient.SearchQuery;

@injectable()
export class NpmsClientService implements Client {

  private api: typeof _fetch;

  constructor (@optional() @inject('fetch') private fetch: typeof _fetch = window['fetch']) {
    const endPoint = 'https://api.npms.io/v2';
    this.api = (url: string, opt = {}) => fetch(resolve(endPoint, url), opt);
  }

  parseQuery (arg: SearchArg): SearchQuery {
    let { q = '', from, size, ...rest } = arg;
    q = q + ' ' + toPairs(rest).map(([k, v]) => v.map(x => `${k}:${v}`).join(' ')).join(' ');
    return compactObject({ q, from, size });
  }

  async search (arg: SearchArg): Promise<RespSearch> {
    const resp = await this.api(QsUrl('search', this.parseQuery(arg)), {});
    return resp.json();
  }

  async suggestion (arg: SearchArg): Promise<RespSearch> {
    const resp = await this.api(QsUrl('suggestion', this.parseQuery(arg)), {});
    return resp.json();
  }

  async info (names: string[]): Promise<Record<string, Info>> {
    const { json } = await this.api('package/mget', { method: 'POST', body: { names } });
    return json();
  }
}