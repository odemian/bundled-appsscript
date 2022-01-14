import fs from "fs-extra";
import path from "path";
import {createApiMap} from "./plugins/createApiMap";
import typescript from '@rollup/plugin-typescript';

export default () => {
    const PARENT_PACKAGE = fs.readJsonSync(path.join("..", "..", "package.json"));

    return {
        input: 'src/main.ts',
        plugins: [ typescript() ],
        output: {
            file: 'build/bundle.js',
            format: 'iife',
            name: `Bundle`,
            plugins: [
                createApiMap(PARENT_PACKAGE.version),
            ]
        }
    }
};
