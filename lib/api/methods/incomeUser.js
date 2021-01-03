"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = incomeUser;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function incomeUser(_x) {
  return _incomeUser.apply(this, arguments);
}

function _incomeUser() {
  _incomeUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
    var db, user, incomeUser, token, updatedUser;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            db = _ref.db, user = _ref.user, incomeUser = _ref.incomeUser, token = _ref.token;
            console.log(user, incomeUser);
            _context.next = 4;
            return db.collection('users').findOneAndUpdate({
              id: incomeUser.id
            }, {
              '$set': _objectSpread(_objectSpread({}, incomeUser), {}, {
                token: token
              })
            }, {
              upsert: true,
              returnNewDocument: true
            });

          case 4:
            updatedUser = _context.sent;
            console.log(updatedUser);
            return _context.abrupt("return", ['user', updatedUser]);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _incomeUser.apply(this, arguments);
}