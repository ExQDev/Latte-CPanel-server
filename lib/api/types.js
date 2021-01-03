"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Schemas = exports.ActionSchema = exports.UserSchema = void 0;

var _discord = require("discord.js");

var _mongodb = require("mongodb");

var UserSchema = {
  name: 'User',
  properties: {
    _id: 'objectId',
    _partition: 'string?',
    name: 'string',
    nickname: 'string',
    status: 'string',
    roles: 'string?'
  }
};
exports.UserSchema = UserSchema;
var ActionSchema = {
  name: 'Action',
  properties: {
    _id: 'objectId',
    _partition: 'string?',
    id: 'string',
    type: 'string',
    target: 'string',
    condition: 'string',
    role: 'string',
    emoji: 'string'
  }
};
exports.ActionSchema = ActionSchema;
var Schemas = [UserSchema];
exports.Schemas = Schemas;