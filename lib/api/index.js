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

var _gettriggers = _interopRequireDefault(require("./methods/gettriggers"));

var _signin = _interopRequireDefault(require("./methods/signin"));

var _default = {
  auth: _auth_discord["default"],
  getoauthurl: _getoauthurl["default"],
  incomeUser: _incomeUser["default"],
  getGuilds: _getguilds["default"],
  getTriggers: _gettriggers["default"],
  getRoles: _getroles["default"],
  signin: _signin["default"]
};
exports["default"] = _default;