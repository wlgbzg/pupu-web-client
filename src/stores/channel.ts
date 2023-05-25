import {reactive} from "vue";
import {defineStore} from "pinia";
import type {Channel, ChannelGroup, Guild, GuildChannelsDTO, UserGuild, UserGuildsDTO} from "@/types/beans";

export const useChannelStore = defineStore("channel", () => {

        // 当前服务器、当前频道
        const channelInfo = reactive<GuildChannelsDTO>({channelGroups: [], channels: [], guild: null});

        const updateChannels = (channelGroups: ChannelGroup[], channels: Channel[], guild: Guild) => {
            channelInfo.channelGroups = channelGroups;
            channelInfo.channels = channels;
            channelInfo.guild = guild
        };

        const getChannels = (channelGroupId: string = ""): Channel[] => {
            const res: Channel[] = [];
            channelInfo.channels.forEach(channel => {
                if (channel.channelGroupId === channelGroupId) {
                    res.push(channel);
                }
                if (channelGroupId === "" && channel.channelGroupId === undefined) {
                    res.push(channel);
                }
            });
            return res;
        };

        const getChannel = (channelId: string): Channel | undefined => {
            for (const channel of channelInfo.channels) {
                if (channel.id === channelId) {
                    return channel;
                }
            }
            return undefined;
        };

        return {channelData: channelInfo, updateChannels, getChannels, getChannel};
    }
);

