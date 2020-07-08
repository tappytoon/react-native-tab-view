"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _TouchableItem = _interopRequireDefault(require("./TouchableItem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const DEFAULT_ACTIVE_COLOR = 'rgba(255, 255, 255, 1)';
const DEFAULT_INACTIVE_COLOR = 'rgba(255, 255, 255, 0.7)';

class TabBarItem extends React.Component {
  render() {
    const {
      route,
      navigationState,
      renderLabel: renderLabelPassed,
      renderIcon,
      renderBadge,
      getLabelText,
      getTestID,
      getAccessibilityLabel,
      getAccessible,
      activeColor = DEFAULT_ACTIVE_COLOR,
      inactiveColor = DEFAULT_INACTIVE_COLOR,
      pressColor,
      pressOpacity,
      labelStyle,
      style,
      onLayout,
      onPress,
      onLongPress
    } = this.props;
    const tabIndex = navigationState.routes.indexOf(route);
    const isFocused = navigationState.index === tabIndex;
    const labelText = getLabelText({
      route
    });
    const currentColor = isFocused ? activeColor : inactiveColor;
    let icon = null;
    let label = null;

    if (renderIcon) {
      icon = /*#__PURE__*/React.createElement(_reactNative.View, {
        style: styles.icon
      }, renderIcon({
        route,
        focused: isFocused,
        color: currentColor
      }));
    }

    const renderLabel = renderLabelPassed !== undefined ? renderLabelPassed : ({
      color
    }) => {
      if (typeof labelText === 'string') {
        return /*#__PURE__*/React.createElement(_reactNative.Text, {
          style: [styles.label, icon ? {
            marginTop: 0
          } : null, {
            color
          }, labelStyle]
        }, labelText);
      }

      return labelText;
    };

    if (renderLabel) {
      label = /*#__PURE__*/React.createElement(_reactNative.View, null, renderLabel({
        route,
        focused: isFocused,
        color: currentColor
      }));
    }

    const tabStyle = _reactNative.StyleSheet.flatten(style);

    const isWidthSet = (tabStyle === null || tabStyle === void 0 ? void 0 : tabStyle.width) !== undefined;
    const tabContainerStyle = isWidthSet ? null : {
      flex: 1
    };
    const scene = {
      route
    };
    let accessibilityLabel = getAccessibilityLabel(scene);
    accessibilityLabel = typeof accessibilityLabel !== 'undefined' ? accessibilityLabel : getLabelText(scene);
    const badge = renderBadge ? renderBadge(scene) : null;
    return /*#__PURE__*/React.createElement(_TouchableItem.default, {
      borderless: true,
      testID: getTestID(scene),
      accessible: getAccessible(scene),
      accessibilityLabel: accessibilityLabel,
      accessibilityTraits: isFocused ? ['button', 'selected'] : 'button',
      accessibilityComponentType: "button",
      accessibilityRole: "tab",
      accessibilityState: {
        selected: isFocused
      },
      accessibilityStates: isFocused ? ['selected'] : [],
      pressColor: pressColor,
      pressOpacity: pressOpacity,
      delayPressIn: 0,
      onLayout: onLayout,
      onPress: onPress,
      onLongPress: onLongPress,
      style: tabContainerStyle
    }, /*#__PURE__*/React.createElement(_reactNative.View, {
      pointerEvents: "none",
      style: [styles.item, tabStyle]
    }, icon, label, badge != null ? /*#__PURE__*/React.createElement(_reactNative.View, {
      style: styles.badge
    }, badge) : null));
  }

}

exports.default = TabBarItem;

const styles = _reactNative.StyleSheet.create({
  label: {
    margin: 4,
    backgroundColor: 'transparent'
  },
  icon: {
    margin: 2
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    minHeight: 48
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0
  }
});
//# sourceMappingURL=TabBarItem.js.map