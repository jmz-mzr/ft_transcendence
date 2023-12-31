import { Status } from '@/api/user/user.types';

export interface IChatUser {
  id: number;
  username: string;
  profilePicture: string;
  status: Status;
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

export interface IChannelPage {
  channels: IChannel[];
  page: number;
  limit: number;
  hasNextPage: boolean;
  totalCount: number;
}

export interface IChannelSendMessagePostParams {
  message: string;
  channelId: number;
}

export interface IChannelPutParams {
  channelId: number;
  withPassword: boolean;
  password?: string;
}

export interface IMessagePost {
  channelId: number;
  message: string;
}

export interface IChannelPostParams {
  users: number[];
  password?: string;
  isPrivate: boolean;
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

export interface IChannelUpdateParams {
  sanction: Sanction;
  userId: number;
  channelId: number;
  minutesToMute?: number;
}

export interface IChannelJoinParams {
  channelId: number;
  password?: string;
  invitedId?: number;
}

export interface IJoinDMParams {
  otherUserId: number;
}
