"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _mongodb = require("mongodb");

_dotenv["default"].config();

var uri = "mongodb+srv://".concat(process.env.atlasuser, ":").concat(process.env.atlaspass, "@cluster0-zvexx.mongodb.net/latte?retryWrites=true&w=majority&appName=").concat(process.env.atlasAppId, ":mongodb-atlas:api-key");

var _default = new _mongodb.MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

exports["default"] = _default;