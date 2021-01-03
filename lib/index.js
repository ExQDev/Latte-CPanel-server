"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _http = require("http");

var _socket = _interopRequireDefault(require("socket.io"));

var _mongodb = require("mongodb");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _index = _interopRequireDefault(require("./api/index"));

var _db = _interopRequireDefault(require("./utils/db"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var http = (0, _http.Server)(app);
var srv = (0, _socket["default"])(http);
var app = (0, _express["default"])();

_dotenv["default"].config();

function run() {
  return _run.apply(this, arguments);
}

function _run() {
  _run = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
    var db;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _db["default"].connect();

          case 2:
            db = _context4.sent.db('latte');
            console.log(__dirname);
            app.use(_express["default"]["static"](__dirname + '/public/'));
            app.get('/', function (req, res) {
              console.log('Its trying get me!');
              res.sendFile(__dirname + '/templates/successful_login.html');
            });
            app.get('/auth/discord', /*#__PURE__*/function () {
              var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
                var token;
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return _index["default"].auth_discord({
                          db: db,
                          code: req.query.code
                        });

                      case 2:
                        token = _context.sent;
                        console.log(token);
                        return _context.abrupt("return", token);

                      case 5:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x, _x2) {
                return _ref.apply(this, arguments);
              };
            }(), function (req, res) {
              res.sendFile(__dirname + '/templates/successful_login.html');
            }); // app.get('/auth/discord/callback', 
            // (req, res) => methods.auth_gitlab({from_gitlab: true, db, userId: req.query.state || req.query.userId})(req, res, async ({accessToken, refreshToken, profile, userId }, arg) => {
            //   console.log('And here!');
            //   // const uid = ObjectId(userId || state);
            //   // console.log(uid);
            //   // const gitlab_object = { accessToken, refreshToken, id: profile.id }
            //   // console.log(gitlab_object);
            //   // const user = await db.collection('users').findOne({ _id: uid });
            //   // console.log(user)
            //   // await db.collection('users').updateOne( { _id: uid }, 
            //   //     { "$set": 
            //   //       { 
            //   //         "gitlab": gitlab_object 
            //   //       } 
            //   //     }).catch(console.error)
            //   // console.log('And already done..!');
            //   // res.sendFile(__dirname+'/templates/successful_login.html');
            //   // console.log('And return..!');
            // }));

            console.log(_index["default"]);
            srv.on('error', function (reason) {
              console.error('SRV Error', reason);
            });
            srv.on('connect_error', function (err) {
              console.error('SRV Error', err);
            });
            srv.on('connection', function (socket) {
              console.log('..new connection');
              var user, activity;
              socket.on('error', function (reason) {
                console.error('Socket Error', reason);
              });
              socket.on('connect_error', function (err) {
                console.error('Socket Error', err);
              });
              socket.on('disconnect', /*#__PURE__*/function () {
                var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(reason) {
                  return _regenerator["default"].wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          console.error('Socket Disconnect', reason);

                          if (!user) {
                            _context2.next = 4;
                            break;
                          }

                          _context2.next = 4;
                          return db.collection('users').updateOne({
                            _id: user._id
                          }, {
                            $set: user
                          });

                        case 4:
                          if (!activity) {
                            _context2.next = 7;
                            break;
                          }

                          _context2.next = 7;
                          return db.collection('time').updateOne({
                            _id: activity._id
                          }, {
                            $set: activity
                          });

                        case 7:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2);
                }));

                return function (_x3) {
                  return _ref2.apply(this, arguments);
                };
              }());
              socket.on('action', /*#__PURE__*/function () {
                var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(originalPayload, cb) {
                  var payload, requireAuth, result;
                  return _regenerator["default"].wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          payload = _objectSpread(_objectSpread({}, originalPayload), {}, {
                            db: db,
                            id: user ? user._id : undefined,
                            user: originalPayload.user || user
                          });
                          console.log('method: ', payload.method); // console.log(cb)

                          requireAuth = ['getGuilds', 'getTriggers'];

                          if (!(requireAuth.includes(originalPayload.method) && !user)) {
                            _context3.next = 8;
                            break;
                          }

                          console.log('original:', originalPayload);
                          socket.emit('getuser', originalPayload);
                          if (cb) cb(originalPayload);
                          return _context3.abrupt("return");

                        case 8:
                          _context3.next = 10;
                          return _index["default"][payload.method](payload);

                        case 10:
                          result = _context3.sent;
                          if (result[0] == 'signin-ok' || result[0] == 'user') user = result[1];
                          if (result[0] == 'activity') activity = result[1];
                          if (result[0] == 'stopped') activity = null; // console.log('user:: ', user)

                          if (cb) cb(result);else socket.emit.apply(socket, (0, _toConsumableArray2["default"])(result));

                        case 15:
                        case "end":
                          return _context3.stop();
                      }
                    }
                  }, _callee3);
                }));

                return function (_x4, _x5) {
                  return _ref3.apply(this, arguments);
                };
              }());
            });
            app.listen(process.env.PORT || 80, function () {
              console.log("listening on *:".concat(process.env.PORT));
            });
            srv.listen(process.env.PORT_SOCK || 800);

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _run.apply(this, arguments);
}

run();