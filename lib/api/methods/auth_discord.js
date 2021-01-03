"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = auth_discord;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _btoa = _interopRequireDefault(require("btoa"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function auth_discord(_x) {
  return _auth_discord.apply(this, arguments);
}

function _auth_discord() {
  _auth_discord = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
    var db, user, accessToken, tokenType, incomeUser, updatedUser;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            db = _ref.db, user = _ref.user, accessToken = _ref.accessToken, tokenType = _ref.tokenType;
            console.log('Oauth callback');
            _context.next = 4;
            return (0, _nodeFetch["default"])('https://discord.com/api/users/@me', {
              headers: {
                authorization: "".concat(tokenType, " ").concat(accessToken)
              }
            });

          case 4:
            _context.next = 6;
            return _context.sent.json();

          case 6:
            incomeUser = _context.sent;
            _context.next = 9;
            return db.collection('users').findOneAndUpdate({
              id: incomeUser.id
            }, {
              '$set': _objectSpread(_objectSpread({}, incomeUser), {}, {
                accessToken: accessToken,
                tokenType: tokenType
              })
            }, {
              upsert: true,
              returnNewDocument: true
            });

          case 9:
            updatedUser = _context.sent.value;
            console.log(updatedUser);
            return _context.abrupt("return", ['user', updatedUser]);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _auth_discord.apply(this, arguments);
}