const log4js = require("log4js");

const MAX_MSG_LENGTH = 1500;
// log4js configuration
log4js.configure({
    appenders: {
        Scuti: {
            type: "file",
            filename: ".\\Logs\\user-management.txt",
            maxLogSize: 5 * 1024 * 1024,
            backups: 5,
            layout: { type: "pattern", pattern: "[%z] [%d] [%p] %c - %m" },
        },
        Output: {
            type: "stdout",
        },
    },
    categories: {
        default: { appenders: ["Scuti", "Output"], level: "debug" },
    },
});

const logger = log4js.getLogger("User-Management");
const info = (message) => {
    logger.info(ellipsis(message));
};

const error = (message) => {
    logger.error(ellipsis(message));
};

const debug = (message) => {
    logger.debug(ellipsis(message));
};

const ellipsis = (message) => {
    const msgmod = message;
    if (message.split) {
        const msgmod = message.split("  ").join("");
        if (msgmod.length > MAX_MSG_LENGTH) {
            return `${msgmod.substring(0, MAX_MSG_LENGTH)}...`;
        }
    }
    return msgmod;
};

module.exports = {
    log: {
        info: info,
        error: error,
        debug: debug,
    },
};
