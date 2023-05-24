import {reactive} from "vue";
import {defineStore} from "pinia";
import type {Channel, ChannelGroup, Guild, GuildChannelsDTO, UserGuild, UserGuildsDTO} from "@/types/beans";

export const useGuildStore = defineStore("guild", () => {

        // 我的服务器
        const guildData = reactive<UserGuildsDTO>({userGuilds: [], guilds: []});

        const updateGuilds = (userGuilds: UserGuild[], guilds: Guild[]) => {
            guildData.userGuilds = userGuilds;
            guildData.guilds = guilds;
        };

        const appendGuild = (userGuild: UserGuild, guild: Guild) => {
            guildData.userGuilds.push(userGuild);
            guildData.guilds.push(guild);
        };
        const getGuild = (guildId: string = ""): Guild | undefined => {
            for (const guild of guildData.guilds) {
                if (guild.id === guildId) {
                    return guild;
                }
            }
            return undefined;
        };

        // 当前服务器、当前频道
        const channelData = reactive<GuildChannelsDTO>({channelGroups: [], channels: [], guild: null});

        const updateChannels = (channelGroups: ChannelGroup[], channels: Channel[], guild: Guild) => {
            channelData.channelGroups = channelGroups;
            channelData.channels = channels;
            channelData.guild = guild
        };

        const getChannels = (channelGroupId: string = ""): Channel[] => {
            const res: Channel[] = [];
            channelData.channels.forEach(channel => {
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
            for (const channel of channelData.channels) {
                if (channel.id === channelId) {
                    return channel;
                }
            }
            return undefined;
        };

        return {guildData, appendGuild, updateGuilds, getGuild, channelData, updateChannels, getChannels, getChannel};
    }, {
        persist: true
    }
);

