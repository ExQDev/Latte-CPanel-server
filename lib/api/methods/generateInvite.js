"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = generateInvite;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongodb = require("mongodb");

var _axios = _interopRequireDefault(require("axios"));

function generateInvite(_x) {
  return _generateInvite.apply(this, arguments);
}

function _generateInvite() {
  _generateInvite = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
    var db, user, guild, body, link;
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
            body = {
              method: 'generateInvite',
              guildId: guild
            };
            _context.next = 6;
            return _axios["default"].post("http://localhost:9099/api", body);

          case 6:
            _context.next = 8;
            return _context.sent.data;

          case 8:
            link = _context.sent;
            console.log(link);
            return _context.abrupt("return", ['invite', link]);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _generateInvite.apply(this, arguments);
}