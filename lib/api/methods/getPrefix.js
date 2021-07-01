"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = setPrefix;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongodb = require("mongodb");

function setPrefix(_x) {
  return _setPrefix.apply(this, arguments);
}

function _setPrefix() {
  _setPrefix = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
    var db, user, guild, pref, updatedCb;
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
            pref = '>';
            _context.next = 6;
            return db.collection('guilds').findOne({
              id: guild
            });

          case 6:
            updatedCb = _context.sent;
            if (updatedCb) console.log(updatedCb.prefix);
            return _context.abrupt("return", ['prefix', updatedCb.prefix || pref]);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _setPrefix.apply(this, arguments);
}