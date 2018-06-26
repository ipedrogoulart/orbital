import { setClassMetadata } from '../reflection/class';
import { tern } from '../util/util';

/**
 * Configuration for the `Command` decorator.
 */
export interface CommandMetadata {
    /**
     * The standard name for your command. This should be a full word, or a hyphenated phrase
     * and should succinctly describe the function that will be executed.
     *
     * Note: this will throw an error if the name is shared with another command
     */
    name: string;
    /**
     * An optional array of strings that serve as shorthands for the command. Typically an
     * abbreviation of the words or the first letter(s) of the command name.
     *
     * Note: this will throw an error if any of the aliases are duplicate with another command.
     */
    aliases?: string[];
    /**
     * A description for the command: what does it do?
     */
    description?: string;
}

/**
 * Decorator function defining a CLI command
 *
 * @param configuration configuration of the command
 */
export function Command(configuration: CommandMetadata): ClassDecorator {
    return (constructor: any) => {
        setClassMetadata(constructor, {
            name: configuration.name,
            aliases: tern(configuration.aliases, []),
            description: tern(configuration.description, 'No description provided.'),
            type: 'command'
        });
        return constructor;
    };
}
