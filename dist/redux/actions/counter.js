"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.minus = exports.add = undefined;
exports.asyncAdd = asyncAdd;

var _counter = require("../constants/counter.js");

var add = exports.add = function add() {
  return {
    type: _counter.ADD
  };
};
var minus = exports.minus = function minus(num) {
  return {
    type: _counter.MINUS,
    payload: num
  };
};
// 异步的action
function asyncAdd() {
  return function (dispatch) {
    setTimeout(function () {
      dispatch(add());
    }, 2000);
  };
}
/**
 * 为了让减速器知道要放入哪些新数据，他们需要访问负载（payload）。
 * 这个负载通过所谓"动作"（Action）的操作发送到减速器
 */
/**
 * 应用可以访问动作。这些动作会携带应用数据（通常也称为有效负载）。
 * 动作具有与减速器共享的类型。每当动作类型被触发时，它就会拾取负载并通知存储，
 * 告诉后者新版存储应该是什么样的——这里我们指的是数据对象在更新后应该是什么样子。
 */