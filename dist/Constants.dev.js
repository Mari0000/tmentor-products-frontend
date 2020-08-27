"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BASE_URL = void 0;

var BASE_URL = function BASE_URL() {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  } else {
    return "http://localhost:3000";
  }
};

exports.BASE_URL = BASE_URL;