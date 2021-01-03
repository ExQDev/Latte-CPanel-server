// @flow
import express from 'express';
import { Server } from 'http'; 
import sock from 'socket.io';
import { ObjectId } from 'mongodb'
import dotenv from 'dotenv'

import methods from './api/index';
import client from './utils/db';

const http = Server(app);
var srv = sock(http);
var app = express();

dotenv.config();

async function run () {
  const db = (await client.connect()).db('latte');

  console.log(__dirname);
  app.use(express.static(__dirname+'/public/'));
   
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

  app.listen(process.env.PORT || 80, function(){
    console.log(`listening on *:${process.env.PORT}`);
  });

  srv.listen(process.env.PORT_SOCK || 800)
}

run()