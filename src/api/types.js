// @flow
import { Client, Message } from "discord.js";
import { MongoClient } from "mongodb";

export type Song = {|
  title: String,
  url: String,
  preview: {
    url: String,
    width: Number,
    heigth: Number,
  }
|};

export type Queue = {|
  textChannel: TextChannel,
  voiceChannel: VoiceChannel,
  connection: VoiceConnection,
  songs: [Song],
  volume: Number,
  playing: Boolean,
  currentSong: Song,
|};


export type User = {|
  id: String,
  nickname: String,
  roles: [Role],
  status: String,
|}

export type Action = {|
  id: String,
  type: 'AddRole' | 'RemoveRole' | 'Ban' | 'Kick' | 'Warn' | 'Rename' | 'React',
  target: String,
  condition: String,
  role: String,
  emoji: String,
|}

export type Callback = {|
  id: String,
  action: Action,
  trigger: 'OnReact' | 'OnUnreact' | 'OnMessage' | 'OnJoin' | 'OnLeave' | 'OnjoinChannel' | 'OnLeaveChannel' | 'OnGetBanned' | 'OnGetKicked',
  guild: String,
  messageId: String,
|}

export const UserSchema = {
  name: 'User',
  properties: {
    _id: 'objectId',
    _partition: 'string?',
    name: 'string',
    nickname: 'string',
    status: 'string',
    roles: 'string?',
  }
}

export const ActionSchema = {
  name: 'Action',
  properties: {
    _id: 'objectId',
    _partition: 'string?',
    id: 'string',
    type: 'string',
    target: 'string',
    condition: 'string',
    role: 'string',
    emoji: 'string',
  }
}

export type Guild = {
  id: String, 
  users: [User],
  channels: [String]
}

export type Role = {|
  id: String,
  name: String,  
|}

export interface ICommand {
  init(bot: Client, db: MongoClient): void;
  execute(msg: Message): void;
  shortDescription(): String;
  detailedDescription(): String;
}

export const Schemas = [
  UserSchema
];