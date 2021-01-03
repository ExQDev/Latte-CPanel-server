"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getroles;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

function getroles(_x) {
  return _getroles.apply(this, arguments);
}

function _getroles() {
  _getroles = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
    var db, user, guild, userId, body, roles;
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
            console.log("".concat(user.tokenType, " ").concat(user.accessToken));
            body = {
              method: 'getRoles',
              guildId: guild // userId

            };
            console.log(body);
            _context.next = 8;
            return (0, _nodeFetch["default"])("http://localhost:9099/api", {
              headers: {
                'Content-Type': 'application/json'
              },
              method: 'post',
              body: JSON.stringify(body)
            });

          case 8:
            _context.next = 10;
            return _context.sent.json();

          case 10:
            roles = _context.sent;
            return _context.abrupt("return", ['roles', roles]);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getroles.apply(this, arguments);
}