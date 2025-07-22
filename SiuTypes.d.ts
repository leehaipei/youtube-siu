interface RunObject {
  appRootPath?: string;
  url?: HttpString;
  saveFloder?: string;
  dlpCommand?: string;
  cache_existence?: boolean;
  copy_existence?: boolean;
  readdir?: string[];
  suffixName?: string;
  cacheFileName?: string;
  saveFileName?: string;
  cacheFilePath?: string;
  copyFilePath?: string;
  cachePath?: string;
  ARGS?: string[];
}

type HttpString = `https://${string}`;

export type { RunObject, HttpString };
