import {XMLParser} from "fast-xml-parser";
type RSSFeed = {
    channel: {
        title: string;
        link: string;
        description: string;
        item: RSSItem[];
    };
};

type RSSItem = {
    title: string;
    link: string;
    description: string;
    pubDate: string;
};

export async function fetchFeed(feedURL: string) {
    const response = await fetch(feedURL,{
        method:"GET",
        headers:{
            "User-Agent":"gator"
        }
    });
    if (!response.ok) {
         throw new Error(`HTTP error: ${response.status}`);
    }
    const toText = await response.text();
    const xmlParser = new XMLParser();
    const data = xmlParser.parse(toText);


    const RssFeed:RSSFeed = {channel:{title:"",description:"",link:"",item:[]}};
    if(!data.rss){
         throw new Error("invalid data, no rss found");       
    }
    const channel = data.rss.channel;
    if(!channel){
        throw new Error("invalid data, no channel found");
    }
    if(channel.title){
        RssFeed.channel.title=channel.title;
    }
    if(channel.link){
        RssFeed.channel.link = channel.link;
    }
    if(channel.description){
        RssFeed.channel.description = channel.description;
    }
    if(channel.item){
        if(Array.isArray(channel.item)){
            for(const i of channel.item){
                if(i.title&&i.description&&i.link&&i.pubDate){
                    RssFeed.channel.item.push({title:i.title,description:i.description,link:i.link,pubDate:i.pubDate});
                }
            }
        }else{
            const i = channel.item;
            if(i.title&&i.description&&i.link&&i.pubDate){
                RssFeed.channel.item.push({title:i.title,description:i.description,link:i.link,pubDate:i.pubDate});
            }
        }
    }

    return RssFeed;
}