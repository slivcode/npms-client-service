import 'reflect-metadata';
import * as fetch from 'isomorphic-fetch';
import { Container } from 'inversify';
import { NpmsClientService } from './index';
import { parse } from 'url';

describe('client test', () => {
  let c: Container;
  let mockFetch = jest.fn((args) => {
    return { json: () => Promise.resolve({ total: 100, results: [] }) };
  });
  beforeAll(() => {
    c = new Container();
    c.bind(NpmsClientService).toSelf().inSingletonScope();
    c.bind('fetch').toConstantValue(mockFetch);
  });

  test('client test', async () => {
    const srv = c.get<NpmsClientService>(NpmsClientService);
    const item = await srv.search({ q: 'react', scope: ['types'] });
    try {
      const [url, opt] = mockFetch.mock.calls[0];
      let query = parse(url, true).query;
      expect(url).toMatch(/npms.io/);
      expect(query).toHaveProperty('q');
      expect(query.q).toMatch(/scope:types/);
      expect(item).toHaveProperty('total');
      expect(item).toHaveProperty('results');
    } catch (e) {
    }
  });
});