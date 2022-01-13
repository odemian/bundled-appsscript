import fs from "fs-extra";
import path from "path";
import {createApiMap} from "./plugins/createApiMap";
import replace from "@rollup/plugin-replace";
import typescript from '@rollup/plugin-typescript';

function convertConfigToEnv(config) {
    const data = {};

    for(const key in config) {
        data[`process.env.${key}`] = JSON.stringify(config[key]);
    }

    return data;
}

function getDeploymentVersionFolder(version) {
    return version.replace(/\./g, '_');
}

export default (args) => {
    const PARENT_PACKAGE = fs.readJsonSync(path.join("..", "..", "package.json"));
    const PACKAGE = fs.readJsonSync(path.join(".", "package.json"));

    return {
        input: 'src/main.ts',
        plugins: [
            replace({
                include: ['src/config.ts'],
                values: {
                    ...convertConfigToEnv({
                        addonVersion: PARENT_PACKAGE.version,
                        version: PACKAGE.version,
                        deploymentVersion: getDeploymentVersionFolder(PARENT_PACKAGE.version),
                    }),
                },
            }),
            typescript(),
        ],
        output: {
            file: 'build/bundle.js',
            format: 'iife',
            name: `Api.${getDeploymentVersionFolder(PARENT_PACKAGE.version)}`,
            plugins: [
                createApiMap(PARENT_PACKAGE.version),
            ]
        }
    }
};
