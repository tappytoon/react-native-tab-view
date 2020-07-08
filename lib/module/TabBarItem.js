import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import TouchableItem from './TouchableItem';
const DEFAULT_ACTIVE_COLOR = 'rgba(255, 255, 255, 1)';
const DEFAULT_INACTIVE_COLOR = 'rgba(255, 255, 255, 0.7)';
export default class TabBarItem extends React.Component {
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
      icon = /*#__PURE__*/React.createElement(View, {
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
        return /*#__PURE__*/React.createElement(Text, {
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
      label = /*#__PURE__*/React.createElement(View, null, renderLabel({
        route,
        focused: isFocused,
        color: currentColor
      }));
    }

    const tabStyle = StyleSheet.flatten(style);
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
    return /*#__PURE__*/React.createElement(TouchableItem, {
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
    }, /*#__PURE__*/React.createElement(View, {
      pointerEvents: "none",
      style: [styles.item, tabStyle]
    }, icon, label, badge != null ? /*#__PURE__*/React.createElement(View, {
      style: styles.badge
    }, badge) : null));
  }

}
const styles = StyleSheet.create({
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