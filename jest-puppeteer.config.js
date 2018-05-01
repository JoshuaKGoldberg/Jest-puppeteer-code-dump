/*!
 * Copyright Microsoft Corporation. All rights reserved.
 */

const port = 3000;

module.exports = {
    launch: {
        args: [
            "--allow-insecure-localhost",
            "--ignore-certificate-errors",
            "--reduce-security-for-testing",
        ],
        ignoreHTTPSErrors: true,
    },
    server: {
        command: `node config/start.js --port=${port} --protocol http`,
        port,
    },
};
