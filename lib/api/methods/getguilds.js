"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getguilds;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

function getguilds(_x) {
  return _getguilds.apply(this, arguments);
}

function _getguilds() {
  _getguilds = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
    var db, user, guilds, owned;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            db = _ref.db, user = _ref.user;

            if (user) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", ['error', 'Not authorized']);

          case 3:
            console.log("".concat(user.tokenType, " ").concat(user.accessToken));
            _context.next = 6;
            return (0, _nodeFetch["default"])('https://discord.com/api/users/@me/guilds', {
              headers: {
                authorization: "".concat(user.tokenType, " ").concat(user.accessToken)
              }
            });

          case 6:
            _context.next = 8;
            return _context.sent.json();

          case 8:
            guilds = _context.sent;
            owned = guilds.filter(function (g) {
              return g.owner;
            });
            return _context.abrupt("return", ['guilds', owned]);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getguilds.apply(this, arguments);
}