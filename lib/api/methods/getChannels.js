"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getChannels;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _axios = _interopRequireDefault(require("axios"));

function getChannels(_x) {
  return _getChannels.apply(this, arguments);
}

function _getChannels() {
  _getChannels = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
    var db, user, guild, userId, body, channels;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            db = _ref.db, user = _ref.user, guild = _ref.guild, userId = _ref.userId;

            if (user) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", ['error', 'Not authorized']);

          case 3:
            body = {
              method: 'getChannels',
              guildId: guild // userId

            }; // console.log(body)

            _context.next = 6;
            return _axios["default"].post("http://localhost:9099/api", body);

          case 6:
            _context.next = 8;
            return _context.sent.data;

          case 8:
            channels = _context.sent;
            return _context.abrupt("return", ['channels', channels]);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getChannels.apply(this, arguments);
}