import logger from 'pino'
import dayjs from "dayjs";

// const timestamp = () => `,"time": "${dayjs().format()}"`

const log = logger({
    // transport: {
    //   target: 'pino-pretty',
    //     options: {
    //       colorize: true
    //     }
    // },
    prettifier: true,
    // prettyPrint: true,
    base: {
        pid: false,
    },
    // timestamp: timestamp
    timestamp: () => `,"time": "${dayjs().format()}"`,
});

export default log;