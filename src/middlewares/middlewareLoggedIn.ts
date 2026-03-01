import { CommandHandler, UserCommandHandler } from "src/commandHandler";
import { readConfig } from "src/lib/configurations/config";
import { getUser } from "src/lib/db/queries/users";

type middlewareLoggedIn = (handler: UserCommandHandler) => CommandHandler;

export const middlewareLoggedIn:middlewareLoggedIn = (handler:UserCommandHandler) =>
     async (cmdName:string,...args:string[]) => {
         const config = readConfig();
         const user = await getUser(config.currentUserName);
         if (!user) {
            throw new Error(`User not found`);
         }
         return handler(cmdName,user,...args);
     }