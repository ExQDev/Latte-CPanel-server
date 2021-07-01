"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = saveTrigger;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongodb = require("mongodb");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function saveTrigger(_x) {
  return _saveTrigger.apply(this, arguments);
}

function _saveTrigger() {
  _saveTrigger = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
    var db, user, callback, updatedCb, _id, changes;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            db = _ref.db, user = _ref.user, callback = _ref.callback;
            console.log(user, callback);
            updatedCb = null;

            if (!callback._id) {
              _context.next = 11;
              break;
            }

            _id = callback._id, changes = (0, _objectWithoutProperties2["default"])(callback, ["_id"]);
            _context.next = 7;
            return db.collection('callbacks').findOneAndUpdate({
              _id: (0, _mongodb.ObjectID)(_id)
            }, {
              '$set': _objectSpread({}, changes)
            }, {
              upsert: true,
              returnNewDocument: true
            });

          case 7:
            updatedCb = _context.sent;
            console.log(updatedCb);
            _context.next = 14;
            break;

          case 11:
            _context.next = 13;
            return db.collection('callbacks').insertOne(callback);

          case 13:
            updatedCb = _context.sent;

          case 14:
            return _context.abrupt("return", ['callback', updatedCb.value]);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _saveTrigger.apply(this, arguments);
}