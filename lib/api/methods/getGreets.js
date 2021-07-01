"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = setPrefix;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongodb = require("mongodb");

var template = {
  greet: false,
  bye: false,
  greetChannel: {
    id: null,
    name: null
  },
  byeChannel: {
    id: null,
    name: null
  }
};

function setPrefix(_x) {
  return _setPrefix.apply(this, arguments);
}

function _setPrefix() {
  _setPrefix = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
    var db, user, guild, updatedCb, greet, bye, greetChannel, byeChannel, cGuild, greets;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            db = _ref.db, user = _ref.user, guild = _ref.guild;

            if (guild) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", ['error', 'No guild provided']);

          case 3:
            _context.next = 5;
            return db.collection('guilds').findOne({
              id: guild
            });

          case 5:
            updatedCb = _context.sent;

            if (!updatedCb) {
              _context.next = 11;
              break;
            }

            greet = updatedCb.greet, bye = updatedCb.bye, greetChannel = updatedCb.greetChannel, byeChannel = updatedCb.byeChannel, cGuild = (0, _objectWithoutProperties2["default"])(updatedCb, ["greet", "bye", "greetChannel", "byeChannel"]);
            greets = {
              greet: greet ? greet : template.greet,
              bye: bye ? bye : template.bye,
              greetChannel: greetChannel ? greetChannel : template.greetChannel,
              byeChannel: byeChannel ? byeChannel : template.byeChannel
            };
            console.log(greets);
            return _context.abrupt("return", ['greets', greets]);

          case 11:
            return _context.abrupt("return", ['error', 'No greets data for this guild']);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _setPrefix.apply(this, arguments);
}