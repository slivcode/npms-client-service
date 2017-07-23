// @internal
export namespace NpmsClient {
  export interface Item {
    name: string
  }

  export interface RespSearch {
    total: number;
    results: Item[];
  }

  export interface Client {
    parseQuery?(arg: SearchArg): SearchQuery

    search(arg: SearchArg): Promise<RespSearch>;

    suggestion(arg: SearchArg): Promise<RespSearch>;

    info(names: string[]): Promise<Record<string, Info>>;
  }

  export interface PackageJson {
    name: string;
    version: string;

    [s: string]: any;
  }

  export type ValArr = (string | number)[];

  export interface SearchArg {
    q?: string;
    from?: number;
    size?: number;
    scope?: ValArr;
    author?: ValArr;
    maintainer?: ValArr;
    keywords?: ValArr;
    not?: ValArr;
    is?: ValArr;
    'boost-exact'?: ValArr;
    'score-effect'?: ValArr;
    'quality-weight'?: ValArr;
    'popularity-weight'?: ValArr;
    'maintenance-weight'?: ValArr;

    [s: string]: any;
  }

  export interface Info {
    analyzedAt: string,
    collected: object,
    evaluation: object,
    score: object,
    error: object
  }

  export interface SearchQuery {
    q?: string;
    from?: number;
    size?: number;
  }

  export interface Score {
    final: number;
    detail: {
      quality: number;
      popularity: number;
    }
  }
}