"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _auth_discord = _interopRequireDefault(require("./methods/auth_discord"));

var _getoauthurl = _interopRequireDefault(require("./methods/getoauthurl"));

var _incomeUser = _interopRequireDefault(require("./methods/incomeUser"));

var _getguilds = _interopRequireDefault(require("./methods/getguilds"));

var _getroles = _interopRequireDefault(require("./methods/getroles"));

var _getChannels = _interopRequireDefault(require("./methods/getChannels"));

var _gettriggers = _interopRequireDefault(require("./methods/gettriggers"));

var _saveTrigger = _interopRequireDefault(require("./methods/saveTrigger"));

var _getPrefix = _interopRequireDefault(require("./methods/getPrefix"));

var _setPrefix = _interopRequireDefault(require("./methods/setPrefix"));

var _deleteTrigger = _interopRequireDefault(require("./methods/deleteTrigger"));

var _signin = _interopRequireDefault(require("./methods/signin"));

var _generateInvite = _interopRequireDefault(require("./methods/generateInvite"));

var _getGreets = _interopRequireDefault(require("./methods/getGreets"));

var _setGreets = _interopRequireDefault(require("./methods/setGreets"));

var _default = {
  auth: _auth_discord["default"],
  getoauthurl: _getoauthurl["default"],
  incomeUser: _incomeUser["default"],
  getGuilds: _getguilds["default"],
  getTriggers: _gettriggers["default"],
  getRoles: _getroles["default"],
  getChannels: _getChannels["default"],
  getPrefix: _getPrefix["default"],
  setPrefix: _setPrefix["default"],
  getGreets: _getGreets["default"],
  setGreets: _setGreets["default"],
  saveTrigger: _saveTrigger["default"],
  deleteTrigger: _deleteTrigger["default"],
  signin: _signin["default"],
  generateInvite: _generateInvite["default"]
};
exports["default"] = _default;