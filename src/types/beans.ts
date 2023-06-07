export interface TextMessageBean {
  text: string;
}

export interface Message {
  id: string;
  from: string; // 消息的发送方
  channelId: string; // 消息频道
  type: number; // 消息类型
  body: object; // 消息内容
  time: number; // 消息时间, 毫秒

  user: User; // 不入数据库, 只用来查询出来以后，补充发消息用户的数据
}

export interface User {
  id: string; // ID
  createTime: number; // 创建时间
  // 可修改
  name: string; // 名称
  avatar: string; // 头像
  intro: string; // 个人介绍
}

export interface GuildRole {
  id: string; // ID
  guildId: string; // 行会id
  system: boolean;// 是否是系统默认角色

  // 可修改
  color: number; // 文字组颜色
  name: string; // 角色名称
  role: number; // 角色
  permissions: number;// 权限
}



export interface UserGuild {
  id: string; // ID
  userId: string; // 用户id
  guildId: string; // 行会id
  createTime: number; // 创建时间
  activeTime: number; // 最近在线时间
  // 可修改
  role: number; // 角色
}

export interface Guild {
  id: string; // ID
  ownerId: string; // 所有者id
  createTime: number; // 创建时间
  // 可修改
  name: string;
  avatar: string;
  cover: string;
  intro: string;
  defaultChannelId: string;
  memberCount: number;
}

//
export interface GuildChannelsDTO {
  channelGroups: ChannelGroup[];
  channels: Channel[];
  guild: Guild;
}

export interface Channel {
  id: string; // ID
  createTime: number; // 创建时间
  guildId: string; // 行会id

  // 可修改
  name: string; // 名称
  intro: string; // 简介
  isPrivate: boolean; // 是否是隐私频道
  readonly: boolean; // 是否是只读频道
  type: number; // 频道类型
  channelGroupId: string; // 频道组Id
}

export interface ChannelGroup {
  id: string; // ID
  guildId: string; // 行会id

  // 可修改
  name: string; // 名称
}