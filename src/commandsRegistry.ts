import { CommandHandler } from "./commandHandler";

export type CommandsRegistry = Record<string,CommandHandler>;
export function runCommand(commandsRegistry:CommandsRegistry,cmdName:string,...args:string[]){
    if(commandsRegistry[cmdName]){
        commandsRegistry[cmdName](cmdName,...args);
    }
}