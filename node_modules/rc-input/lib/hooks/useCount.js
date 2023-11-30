"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof3 = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useCount;
exports.inCountRange = inCountRange;
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var React = _interopRequireWildcard(require("react"));
var _excluded = ["show"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof3(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Cut `value` by the `count.max` prop.
 */
function inCountRange(value, countConfig) {
  if (!countConfig.max) {
    return true;
  }
  var count = countConfig.strategy(value);
  return count <= countConfig.max;
}
function useCount(count, showCount) {
  return React.useMemo(function () {
    var mergedConfig = {};
    if (showCount) {
      mergedConfig.show = (0, _typeof2.default)(showCount) === 'object' && showCount.formatter ? showCount.formatter : !!showCount;
    }
    mergedConfig = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, mergedConfig), count);
    var _ref = mergedConfig,
      show = _ref.show,
      rest = (0, _objectWithoutProperties2.default)(_ref, _excluded);
    return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, rest), {}, {
      show: !!show,
      showFormatter: typeof show === 'function' ? show : undefined,
      strategy: rest.strategy || function (value) {
        return value.length;
      }
    });
  }, [count, showCount]);
}