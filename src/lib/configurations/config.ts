import fs from "fs";
import os from "os";
import path from "path";
export type Config ={
    dbUrl:string,
    currentUserName:string
}
function getConfigFilePath(): string{
    return path.join(os.homedir(),".gatorconfig.json");
}
function WriteConfig(config:Config):void{
    const fullpath = getConfigFilePath();
    fs.writeFileSync(fullpath,JSON.stringify(config));
}
export function setUser(username:string):void{
    let config:Config={
        dbUrl:"postgres://postgres:postgres@localhost:5432/gator?sslmode=disable",
        currentUserName:username
    };
    WriteConfig(config);
}
export function  readConfig(): Config{
    const fullpath = getConfigFilePath();
    let bytes = fs.readFileSync(fullpath,'utf-8');
    var config = JSON.parse(bytes.toString()) as Config;
    return config;
}