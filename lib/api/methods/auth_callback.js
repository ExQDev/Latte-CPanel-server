"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = callback;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _discordOauth = _interopRequireDefault(require("discord-oauth2"));

function callback(_x) {
  return _callback.apply(this, arguments);
}

function _callback() {
  _callback = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
    var db, user, code;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            db = _ref.db, user = _ref.user, code = _ref.code;
            console.log('Oauth callback'); // const user = db.collection('users').find()

            return _context.abrupt("return", ['discord_token']);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _callback.apply(this, arguments);
}