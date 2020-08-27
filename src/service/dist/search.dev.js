"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.search = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _Constants = require("../Constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var instance = _axios["default"].create({
  baseURL: "".concat((0, _Constants.BASE_URL)(), "/products/search"),
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json'
  }
});

var search = function search(data) {
  var result;
  return regeneratorRuntime.async(function search$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log(data);
          _context.prev = 1;
          result = instance.get(instance.baseURL, {
            params: data
          }, {
            validateStatus: function validateStatus() {
              return true;
            }
          });
          console.log(result);
          return _context.abrupt("return", result);

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](1);
          console.log(_context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 7]]);
};

exports.search = search;