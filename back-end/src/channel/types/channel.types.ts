export interface IChatUser {
  id: number;
  username: string;
  profilePicture: string;
  status: string;
}

export interface IChannel {
  id: number;
  isPrivate: boolean;
  isProtected: boolean;
  isDM: boolean;
  ownerId: number;
  users: IChannelUser[];
  bannedUserIds: number[];
  createdAt?: Date;
  lastMessageId?: number | null;
}

export interface IMessage {
  id: number;
  channelId: number;
  userId: number;
  user: IChatUser;
  message: string;
  gameId: number | null;
  own?: boolean;
}

export interface IChannelUser {
  channelId: number;
  userId: number;
  user: IChatUser;
  isAdmin: boolean;
  mutedUntil?: Date | null;
  lastReadMessageId?: number | null;
}

export interface IMessagePage {
  messages: IMessage[];
  page: number;
  limit: number;
  hasNextPage: boolean;
  totalCount: number;
}

export interface IChannelPage {
  channels: IChannel[];
  page: number;
  limit: number;
  hasNextPage: boolean;
  totalCount: number;
}

export enum Sanction {
  KICK = 'kick',
  BAN = 'ban',
  UNBAN = 'unban',
  MUTE = 'mute',
  UNMUTE = 'unmute',
  PROMOTE = 'promote',
  DEMOTE = 'demote',
}
