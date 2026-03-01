import { read } from "node:fs";
import { readConfig,setUser } from "./lib/configurations/config.js";
import { CommandsRegistry, runCommand } from "./CommandsRegistry.js";
import { handlerLogin } from "./handlerLogin.js";
import { argv } from 'node:process';
import { handlerRegister } from "./handlerRegister.js";
import { handlerReset } from "./handlerReset.js";
import { users } from "./lib/db/schema.js";
import { handlerUsers } from "./handlerUsers.js";
import { handlerAgg } from "./handlerAgg.js";
import { handlerAddFeed } from "./handlerAddFeed.js";
import { handlerFeeds } from "./handlerFeeds.js";
import { handlerFollow } from "./handlerFollow.js";
import { handlerFollowing } from "./handlerFollowing.js";
import { middlewareLoggedIn } from "./middlewares/middlewareLoggedIn.js";
import { handlerUnfollow } from "./handlerUnfollow.js";
import { handlerBrowse } from "./handlerBrowse.js";
async function main() {

    const commandRegistry:CommandsRegistry = {
        login:handlerLogin,
        register:handlerRegister,
        reset:handlerReset,
        users:handlerUsers,
        agg:handlerAgg,
        addfeed:middlewareLoggedIn(handlerAddFeed),
        feeds:handlerFeeds,
        follow:middlewareLoggedIn(handlerFollow),
        following:middlewareLoggedIn(handlerFollowing),
        unfollow:middlewareLoggedIn(handlerUnfollow),
        browse:middlewareLoggedIn(handlerBrowse)
    };


    let [skip1,skip2,command,...args] = argv;
    try{
    await runCommand(commandRegistry,command,...args);
    }catch(e){
        if(e instanceof Error){
            console.log(e.message);
            process.exit(1);
        }
    }
    process.exit(0);
}

main();
