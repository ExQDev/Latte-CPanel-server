"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = singin;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

function singin(_x) {
  return _singin.apply(this, arguments);
}

function _singin() {
  _singin = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
    var db, user, setuser, _user;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            db = _ref.db, user = _ref.user, setuser = _ref.setuser;

            if (!(setuser && !user)) {
              _context.next = 6;
              break;
            }

            _context.next = 4;
            return db.collection('users').findOne({
              id: setuser.id
            });

          case 4:
            _user = _context.sent;
            return _context.abrupt("return", ['user', _user]);

          case 6:
            if (!user) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", ['user', user]);

          case 8:
            if (!(!user && !setuser)) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", ['signin-fail', 'not authorized']);

          case 10:
            return _context.abrupt("return", ['error', 'Something went wrong']);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _singin.apply(this, arguments);
}