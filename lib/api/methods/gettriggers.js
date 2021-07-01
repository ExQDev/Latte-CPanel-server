"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = gettriggers;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

function gettriggers(_x) {
  return _gettriggers.apply(this, arguments);
}

function _gettriggers() {
  _gettriggers = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
    var db, user, guild, triggers;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            db = _ref.db, user = _ref.user, guild = _ref.guild;

            if (user) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", ['error', 'Not authorized']);

          case 3:
            _context.next = 5;
            return db.collection('callbacks').find({
              guild: guild
            });

          case 5:
            _context.next = 7;
            return _context.sent.toArray();

          case 7:
            triggers = _context.sent;
            return _context.abrupt("return", ['triggers', triggers]);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _gettriggers.apply(this, arguments);
}