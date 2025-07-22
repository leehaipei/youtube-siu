interface RunObject {
    appRootPath?: string;
    url?: string;
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

export type { RunObject };
