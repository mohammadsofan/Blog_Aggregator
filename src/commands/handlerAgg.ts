import { fetchFeed } from "../api/feed";
import { parseDuration } from "../helpers/parseDuration";
import { scrapeFeeds } from "../helpers/scrapeFeeds";

export async function handlerAgg(cmdName:string,...args:string[]){
    if(args.length === 0 ){
        console.log("Not enough arguments provided");
    }
    const durationInput = args[0];
    const duration = parseDuration(durationInput);
    console.log(`Collecting feeds every ${duration/1000}s`);
    await scrapeFeeds();
    console.log("Collecting new feeds.");
    const interval = setInterval(async()=>{
        await scrapeFeeds();
        console.log("Collecting new feeds.");
    },duration);
    await new Promise<void>((resolve) => {
    process.on("SIGINT", () => {
        console.log("Shutting down feed aggregator...");
        clearInterval(interval);
        resolve();
    });
    });
}