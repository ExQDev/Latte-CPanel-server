"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = setGreets;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongodb = require("mongodb");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function setGreets(_x) {
  return _setGreets.apply(this, arguments);
}

function _setGreets() {
  _setGreets = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
    var db, user, guild, greets, updatedCb, _updatedCb$value, greet, bye, greetChannel, byeChannel, cGuild;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            db = _ref.db, user = _ref.user, guild = _ref.guild, greets = _ref.greets;

            if (guild) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", ['error', 'No guild provided']);

          case 3:
            _context.next = 5;
            return db.collection('guilds').findOneAndUpdate({
              id: guild
            }, {
              '$set': _objectSpread({}, greets)
            }, {
              returnOriginal: false
            });

          case 5:
            updatedCb = _context.sent;
            _updatedCb$value = updatedCb.value, greet = _updatedCb$value.greet, bye = _updatedCb$value.bye, greetChannel = _updatedCb$value.greetChannel, byeChannel = _updatedCb$value.byeChannel, cGuild = (0, _objectWithoutProperties2["default"])(_updatedCb$value, ["greet", "bye", "greetChannel", "byeChannel"]);
            return _context.abrupt("return", ['greets', {
              greet: greet,
              bye: bye,
              greetChannel: greetChannel,
              byeChannel: byeChannel
            }]);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _setGreets.apply(this, arguments);
}