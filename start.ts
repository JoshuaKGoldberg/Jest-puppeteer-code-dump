/*!
 * Copyright Microsoft Corporation. All rights reserved.
 */

"use strict";

import chalk from "chalk";
const checkRequiredFiles = require("react-dev-utils/checkRequiredFiles");

import { paths } from "./paths";

import { createDevServer, readyAnnouncement } from "./createDevServer";

/**
 * Allowed argv CLI arguments to start.
 */
export interface IStartArgv {
    /**
     * http or https protocol to use, if not "https".
     */
    protocol?: string;
}

// Makes the script crash on unhandled rejections instead of silently ignoring them.
// In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
process.on("unhandledRejection", (err) => {
    throw err;
});

// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.appHtml, ...Object.keys(paths.clientIndex).map(key => paths.clientIndex[key])])) {
    process.exit(1);
}

createDevServer(preferredProtocol)
    .then(async ({ devServer, host, port, urls }) => {
        for (const signal of ["SIGINT", "SIGTERM"]) {
            process.on(signal as NodeJS.Signals, () => {
                devServer.close();
                process.exit();
            });
        }

        await new Promise((resolve, reject) => {
            devServer.listen(port, host, (error: Error | undefined) => {
                if (error) {
                    reject(error);
                    return;
                }

                console.log(chalk.cyan(`${readyAnnouncement} ⚙️💻🖥...\n`));

                resolve();
            });
        });
    })
    .catch((error) => {
        if (error && error.message) {
            console.error(error.message);
        }

        process.exit(1);
    });
