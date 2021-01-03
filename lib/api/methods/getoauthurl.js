"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = logout;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

function logout(_x) {
  return _logout.apply(this, arguments);
}

function _logout() {
  _logout = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
    var db, user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            db = _ref.db, user = _ref.user;
            console.log(process.env.OAUTH);
            return _context.abrupt("return", [process.env.OAUTH]);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _logout.apply(this, arguments);
}