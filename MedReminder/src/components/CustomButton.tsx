import React from 'react';
import {
  Text as RNText,
  TouchableOpacity,
  View,
  ViewStyle,
  TouchableOpacityProps,
  TextStyle,
  StyleSheet,
} from 'react-native';
import colors from '../utils/colors';
import Loader from '../utils/loader';

export interface Props extends TouchableOpacityProps {
  title: string;
  type?: 'primary';
  onPress(): void;
  loading?: boolean;
  style?: ViewStyle;
  buttonStyle?: TextStyle;
  textColors?: string;
  fontSize?: number;
  borderRadiusNumber?: number;
}

function CustomButton({
  title,
  type = 'primary',
  onPress,
  loading = false,
  style,
  buttonStyle,
  disabled = false,
  textColors,
  fontSize,
  borderRadiusNumber,
}: Props) {
  const onPressButton = loading ? () => {} : onPress;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[type],
        style && style,
        {
          borderRadius: borderRadiusNumber ? borderRadiusNumber : 8,
        },
      ]}
      onPress={onPressButton}
      activeOpacity={0.5}
      disabled={disabled}>
      <View style={styles.row}>
        {loading ? (
          <Loader />
        ) : (
          <RNText
            textBreakStrategy="simple"
            allowFontScaling={false}
            style={[
              buttonStyle ? buttonStyle : styles.text,
              {
                color: textColors ? textColors : colors.whites.default,
                fontSize: fontSize,
              },
            ]}>
            {title}
          </RNText>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 60,
  },
  primary: {
    borderColor: colors.default.primary,
    backgroundColor: colors.default.primary,
  },
  text: {
    color: colors.whites.default,
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 24,
  },

  primaryText: {
    color: colors.whites.default,
  },
  row: {
    flexDirection: 'row',
  },
});

export default CustomButton;
