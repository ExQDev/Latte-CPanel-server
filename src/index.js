// @flow
import Discord, { Guild, Message, TextChannel } from 'discord.js';
import { Server } from 'http'; 
import sock from 'socket.io';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
import { ObjectId } from 'mongodb'
import commands from './commands';
import api from './api'

import methods from './api/index';
import client from './utils/db';

var app = express();
const http = Server(app);
var srv = sock(http, {
  cors: {
    origin: true,
    methods: ["GET", "POST"]
  }
});

dotenv.config();

async function run () {
  const db = (await client.connect()).db('latte');
  const bot = new Discord.Client();

  
  app.use(bodyParser.json());
  app.use(express.static(__dirname+'/public/'));
  
  for(const cmd in commands) {
    commands[cmd].init(bot, db);
  }
  let token = process.env.TOKEN;


  app.get('/', function(req, res){
    console.log('Its trying get me!')
    res.sendFile(__dirname+'/templates/successful_login.html');
  });

  app.get('/auth/discord', async (req, res) => { 
   const token = await methods.auth_discord({db, code: req.query.code })
   console.log(token) 
   return token
  }, function(req, res){
    res.sendFile(__dirname+'/templates/successful_login.html')
  });

  app.post('/api', async (req, res) => {
    console.log(req.body)
    const resp = (await api(req, res, db, bot));
    // console.log(resp)
    res.send(resp);
  })

  // app.get('/auth/discord/callback', 
  // (req, res) => methods.auth_gitlab({from_gitlab: true, db, userId: req.query.state || req.query.userId})(req, res, async ({accessToken, refreshToken, profile, userId }, arg) => {
  //   console.log('And here!');
  //   // const uid = ObjectId(userId || state);
  //   // console.log(uid);
  //   // const gitlab_object = { accessToken, refreshToken, id: profile.id }
  //   // console.log(gitlab_object);
  //   // const user = await db.collection('users').findOne({ _id: uid });
  //   // console.log(user)
  //   // await db.collection('users').updateOne( { _id: uid }, 
  //   //     { "$set": 
  //   //       { 
  //   //         "gitlab": gitlab_object 
  //   //       } 
  //   //     }).catch(console.error)
  //   // console.log('And already done..!');
  //   // res.sendFile(__dirname+'/templates/successful_login.html');
  //   // console.log('And return..!');
  // }));

  console.log(methods);

  srv.on('error', (reason) => {
    console.error('SRV Error', reason);
  })
  srv.on('connect_error', function(err) {
    console.error('SRV Error', err);
  });


  srv.on('connection', (socket) => {
    console.log('..new connection')
    let user, activity;

    socket.on('error', (reason) => {
      console.error('Socket Error', reason);
    })
    socket.on('connect_error', function(err) {
      console.error('Socket Error', err);
    });

    socket.on('disconnect', async (reason) => {
      console.error('Socket Disconnect', reason);
      if(user)
        await db.collection('users').updateOne( { _id: user._id }, { $set: user } );

      if(activity)
        await db.collection('time').updateOne({_id: activity._id}, { $set: activity });
    })

    socket.on('action', async (originalPayload, cb) => {
      const payload = { ...originalPayload, db, id: user ? user._id : undefined, user: originalPayload.user || user };
      console.log('method: ', payload.method)
      
      // console.log(cb)
      const requireAuth = [
        'getGuilds',
        'getTriggers'
      ]

      if(requireAuth.includes(originalPayload.method) && !user)
      {
        console.log('original:', originalPayload)
        socket.emit('getuser', originalPayload)
        if(cb)
          cb(originalPayload)
        return
      }

      let result = await methods[payload.method](payload);
      
      if(result[0] == 'signin-ok' || result[0] == 'user')
        user = result[1];

      if(result[0] == 'activity')
        activity = result[1];

      if(result[0] == 'stopped')
        activity = null;

      // console.log('user:: ', user)
      if(cb)
        cb(result);
      else
        socket.emit(...result);
    })
  });
  bot.on('ready', () => { 
    console.log(`Запустился бот ${bot.user.username}`);
    bot.user.setActivity(`Latte | ${config.prefix}help`, {
      type: 'PLAYING',
      url: 'https://google.com'
    });
    bot.generateInvite({
      permissions: 8
    }).then(link => { 
        console.log(`Use that link to add me to your server: ${link}`);
    });
    
  });

  bot.on('message', async (msg: Message) => {
    if (msg.author.bot) return;
    const triggersOnMessage = await (await db.collection('callbacks').find({
      guild: msg.guild.id,
      trigger: 'OnMessage'
    })).toArray()
    const guildPrefix = (await db.collection('guilds').findOne({
      id: msg.guild.id
    })).prefix
    if(guildPrefix)
      prefix = guildPrefix
    // console.log('guild prefix', prefix)
    if (!msg.content.startsWith(prefix) && triggersOnMessage.length === 0) return;
    if(triggersOnMessage.length > 0) {
      commands.admin.onMessage(msg, triggersOnMessage)
    }
    // console.log(msg.guild.id);
    const commandBody = msg.content.slice(prefix.length);
    // console.log(commandBody)
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
    if(commands[command]) {
      commands[command].execute(msg)(args);
    }
  });

  bot.on('guildCreate', guild => {
    let defaultChannel = "";
    guild.channels.cache.forEach((channel) => {
      if(channel.type == "text" && defaultChannel == "") {
        if(channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
          defaultChannel = channel;
        }
      }
    })
    defaultChannel.send(`Hello, I'm Latte bot. Thanks for inviting me, here are a list of all my commands!`, 
    {
      embed:
        {
          title: 'Hello!',
          color: 0x0099ff, 
          description: `The prefix for all my commands is \'${prefix}\', e.g: \'>help\'.`,
          fields:[],
          footer: {
              text: 'Latte Bot created and developed by ExQDev.'
          }
        }
    })
  })


  bot.on("guildDelete", function(guild){
    console.log(`the client deleted/left a guild`);
  });

  // channelCreate
  /* Emitted whenever a channel is created.
  PARAMETER    TYPE        DESCRIPTION
  channel      Channel     The channel that was created    */
  bot.on("channelCreate", function(channel){
    console.log(`channelCreate: ${channel}`);
  });

  // channelDelete
  /* Emitted whenever a channel is deleted.
  PARAMETER   TYPE      DESCRIPTION
  channel     Channel   The channel that was deleted    */
  bot.on("channelDelete", function(channel){
    console.log(`channelDelete: ${channel}`);
  });

  // channelPinsUpdate
  /* Emitted whenever the pins of a channel are updated. Due to the nature of the WebSocket event, not much information can be provided easily here - you need to manually check the pins yourself.
  PARAMETER    TYPE         DESCRIPTION
  channel      Channel      The channel that the pins update occurred in
  time         Date         The time of the pins update    */
  bot.on("channelPinsUpdate", function(channel, time){
    console.log(`channelPinsUpdate: ${channel}:${time}`);
  });
    
  // channelUpdate
  /* Emitted whenever a channel is updated - e.g. name change, topic change.
  PARAMETER        TYPE        DESCRIPTION
  oldChannel       Channel     The channel before the update
  newChannel       Channel     The channel after the update    */
  bot.on("channelUpdate", function(oldChannel, newChannel){
    console.log(`channelUpdate -> a channel is updated - e.g. name change, topic change`);
  });

  bot.on('guildMemberAdd', member => {
    console.log(`${member} joined` )
    commands.admin.onJoin(member);
  })

  bot.on('guildMemberRemove', member => {
    commands.admin.onLeft(member);
  })

  bot.on('guildMemberUpdate', (oldMember, newMember) => {
    commands.admin.onMemberUpdated(oldMember, newMember);
  })

  // messageDelete
  /* Emitted whenever a message is deleted.
  PARAMETER      TYPE           DESCRIPTION
  message        Message        The deleted message    */
  bot.on("messageDelete", function(message, w){
    console.log(`message is deleted -> ${message.member} -> ${message.member.nickname}(${message.member.user.username}) -> ${message}`);
  });

  // messageDeleteBulk
  /* Emitted whenever messages are deleted in bulk.
  PARAMETER    TYPE                              DESCRIPTION
  messages     Collection<Snowflake, Message>    The deleted messages, mapped by their ID    */
  bot.on("messageDeleteBulk", function(messages){
    console.log(`messages are deleted -> ${messages}`);
  });

  bot.on('raw', async packet => {
    // We don't want this to run on unrelated packets
    if (!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)) return;
    // Grab the channel to check the message from
    const channel : TextChannel = bot.channels.cache.get(packet.d.channel_id);
    // There's no need to emit if the message is cached, because the event will fire anyway for that
    if (channel.messages.cache.has(packet.d.message_id)) return;
    // Since we have confirmed the message is not cached, let's fetch it
    const message = await channel.messages.fetch(packet.d.message_id);
    {
        // Emojis can have identifiers of name:id format, so we have to account for that case as well
        const emoji = packet.d.emoji.id ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name;
        // This gives us the reaction we need to emit the event properly, in top of the message object
        const reaction = message.reactions.cache.get(emoji);
        // console.log(reaction);
        // Adds the currently reacting user to the reaction's users collection.
        if (reaction) reaction.users.cache.set(packet.d.user_id, bot.users.resolve(packet.d.user_id));
        // Check which type of event it is before emitting
        if (packet.t === 'MESSAGE_REACTION_ADD') {
            bot.emit('messageReactionAdd', reaction, bot.users.cache.get(packet.d.user_id));
        }
        if (packet.t === 'MESSAGE_REACTION_REMOVE') {
            bot.emit('messageReactionRemove', reaction, bot.users.cache.get(packet.d.user_id));
        }
    };
  });

  // messageReactionAdd
  /* Emitted whenever a reaction is added to a message.
  PARAMETER              TYPE                   DESCRIPTION
  messageReaction        MessageReaction        The reaction object
  user                   User                   The user that applied the emoji or reaction emoji     */
  bot.on("messageReactionAdd", async function(messageReaction, user){
    return commands.admin.onReact(user, messageReaction);
    console.log(`a reaction is added to a message`);
  });

  // messageReactionRemove
  /* Emitted whenever a reaction is removed from a message.
  PARAMETER              TYPE                   DESCRIPTION
  messageReaction        MessageReaction        The reaction object
  user                   User                   The user that removed the emoji or reaction emoji     */
  bot.on("messageReactionRemove", function(messageReaction, user){
    return commands.admin.onUndoReact(user, messageReaction);
    console.log(`a reaction is removed from a message`);
  });

  // messageReactionRemoveAll
  /* Emitted whenever all reactions are removed from a message.
  PARAMETER          TYPE           DESCRIPTION
  message            Message        The message the reactions were removed from    */
  bot.on("messageReactionRemoveAll", function(message){
    console.error(`all reactions are removed from a message`);
  });

  bot.on('messageUpdate', (oldMessage, newMessage) => {
    console.log(`a message is updated`);
  });

  bot.on("presenceUpdate", async (oldMember, newMember) => {
    let status = newMember.status;
    let activities = newMember.activities
      .map(({name, type, url, applicationID, emoji, flags, state, timestamps, createdTimestamp}) => ({
        name,
        status,
        type,
        url,
        state,
        applicationID,
        emoji,
        flags,
        timestamps,
        createdTimestamp,
      }));
    // console.log(activities);
    const acts = await db.collection('activities');
    const insrted = await acts.insertMany(activities).catch(err => console.error);
    // console.log(`${JSON.stringify(insrted)}`);
  });

  bot.on("roleCreate", function(role){
    console.error(`a role is created`);
  });

  // roleDelete
  /* Emitted whenever a guild role is deleted.
  PARAMETER    TYPE        DESCRIPTION
  role         Role        The role that was deleted    */
  bot.on("roleDelete", function(role){
    console.error(`a guild role is deleted`);
  });

  // roleUpdate
  /* Emitted whenever a guild role is updated.
  PARAMETER      TYPE        DESCRIPTION
  oldRole        Role        The role before the update
  newRole        Role        The role after the update    */
  bot.on("roleUpdate", function(oldRole, newRole){
    console.error(`a guild role is updated`);
  });

  // typingStart
  /* Emitted whenever a user starts typing in a channel.
  PARAMETER      TYPE            DESCRIPTION
  channel        Channel         The channel the user started typing in
  user           User            The user that started typing    */
  bot.on("typingStart", function(channel, user){
    console.log(`${user.tag} has started typing`);
  });

  // typingStop
  /* Emitted whenever a user stops typing in a channel.
  PARAMETER       TYPE           DESCRIPTION
  channel         Channel        The channel the user stopped typing in
  user            User           The user that stopped typing    */
  bot.on("typingStop", function(channel, user){
    console.log(`${user.tag} has stopped typing`);
  });

  // userNoteUpdate
  /* Emitted whenever a note is updated.
  PARAMETER      TYPE          DESCRIPTION
  user           User          The user the note belongs to
  oldNote        String        The note content before the update
  newNote        String        The note content after the update    */
  bot.on("userNoteUpdate", function(user, oldNote, newNote){
    console.log(`a member's note is updated`);
  });

  // userUpdate
  /* Emitted whenever a user's details (e.g. username) are changed.
  PARAMETER      TYPE        DESCRIPTION
  oldUser        User        The user before the update
  newUser        User        The user after the update    */
  bot.on("userUpdate", function(oldUser, newUser){
    console.log(`user's details (e.g. username) are changed`);
  });


  // voiceStateUpdate
  /* Emitted whenever a user changes voice state - e.g. joins/leaves a channel, mutes/unmutes.
  PARAMETER    TYPE             DESCRIPTION
  oldMember    GuildMember      The member before the voice state update
  newMember    GuildMember      The member after the voice state update    */
  bot.on("voiceStateUpdate", function(oldMember, newMember){
    console.log(`a user changes voice state`);
  });

  bot.login(token);

  app.listen(process.env.PORT || 80, function(){
    console.log(`listening on 82.193.104.224:${process.env.PORT}`);
  });

  srv.listen(process.env.PORT_SOCK || 800)
  // http.listen(process.env.PORT, () => {
  //   console.log(`listening on *:${process.env.PORT || 80}`)
  // })
}

run()