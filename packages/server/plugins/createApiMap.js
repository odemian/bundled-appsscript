export const createApiMap = (version) => {
    return {
        generateBundle(options, bundle) {
            const apis = [];
            for(const name in bundle) {
                apis.push(...bundle[name].exports);
            }
            this.emitFile({
                name: "apis.json",
                fileName: "apis.json",
                type: "asset",
                source: JSON.stringify({
                    version,
                    apis,
                })
            });
        }
    }
}