"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = counter;

var _counter = require("../constants/counter.js");

var INITIAL_STATE = {
  num: 0
};
function counter() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
  var action = arguments[1];

  console.log('🍎 action = ', action);
  switch (action.type) {
    case _counter.ADD:
      return {
        num: state.num + 1
      };
    case _counter.MINUS:
      var n = action.payload || 1;
      return {
        num: state.num - n
      };
    default:
      return state;
  }
}
/**
 * 我们的存储是通过“减速器”（Reducer）更新的
 *
 */