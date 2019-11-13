"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = configureStore;

var _redux = require("../../npm/redux/lib/redux.js");

var _index = require("../reducers/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { createStore, applyMiddleware, compose } from 'redux'
// import thunkMiddleware from 'redux-thunk'
// import rootReducer from '../reducers'
// const composeEnhancers =
//   typeof window === 'object' &&
//   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//       // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
//     }) : compose
// const middlewares = [
//   thunkMiddleware
// ]
// if (process.env.NODE_ENV === 'development' && process.env.TARO_ENV !== 'quickapp') {
//   middlewares.push(require('redux-logger').createLogger())
// }
// const enhancer = composeEnhancers(
//   applyMiddleware(...middlewares),
//   // other store enhancers if any
// )
// export default function configStore () {
//   const store = createStore(rootReducer, enhancer)
//   return store
// }
/*
  存储（Store）也被称为单一可信源（single source of truth）。
  它在本质上只是你以某种状态初始化的对象，然后每当我们要更新它时，我们都会用新版本覆盖原有的存储。
  通常人们认为最佳实践是重新创建状态而不是突变它。
  比如：如果我们有一个数组，并且想要将一个新项目推送进去，
  我们更新存储时不会直接把新项目塞进去，而是会用包含新项目的数组新版本覆盖原来的存储。
*/
function configureStore() {
  return (0, _redux.createStore)(_index2.default);
}