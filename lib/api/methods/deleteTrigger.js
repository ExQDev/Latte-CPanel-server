"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = deleteTrigger;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongodb = require("mongodb");

function deleteTrigger(_x) {
  return _deleteTrigger.apply(this, arguments);
}

function _deleteTrigger() {
  _deleteTrigger = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
    var db, user, callback, updatedCb;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            db = _ref.db, user = _ref.user, callback = _ref.callback;
            console.log(user, callback);
            updatedCb = null;

            if (!callback._id) {
              _context.next = 9;
              break;
            }

            _context.next = 6;
            return db.collection('callbacks').deleteOne({
              _id: (0, _mongodb.ObjectID)(callback._id)
            });

          case 6:
            updatedCb = _context.sent;
            _context.next = 12;
            break;

          case 9:
            _context.next = 11;
            return db.collection('callbacks').deleteMany({
              guild: callback.guild
            });

          case 11:
            updatedCb = _context.sent;

          case 12:
            return _context.abrupt("return", ['deleted-callback', callback._id]);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _deleteTrigger.apply(this, arguments);
}