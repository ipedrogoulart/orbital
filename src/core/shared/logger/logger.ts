import chalk from 'chalk';
import { Logger as winstonLogger, transports } from 'winston';
import winston from 'winston';
import { format } from './format';

/**
 * Static logger to use throughout the application
 */
export class Logger {

    private static prefix = 'Orbital';

    // Wrap third party code so we are not heavily dependent upon it.
    private static logger = new winstonLogger({
        transports: [
            new transports.Console({
                colorize: true,
                formatter: (opts) => format(opts.message, opts.level, Logger.prefix),
            }),
        ],
    });

    private constructor() { }

    public static info(message: string): void {
        this.logger.info(message);
    }

    public static warn(message: string): void {
        this.logger.warn(message);
    }

    public static error(message: string): void {
        this.logger.error(message);
    }
}
