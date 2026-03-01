import { CommandHandler } from "./commandHandler";

export type CommandsRegistry = Record<string,CommandHandler>;
export function registerCommand(registry: CommandsRegistry, cmdName: string, handler: CommandHandler){
    registry[cmdName] = handler;
}
export async function runCommand(registry: CommandsRegistry, cmdName: string, ...args: string[]) {
    if(!registry[cmdName]){
        throw Error("not enough arguments were provided");
    }
    await registry[cmdName](cmdName,...args);
}