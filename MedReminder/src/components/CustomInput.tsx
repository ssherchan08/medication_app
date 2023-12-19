import React, {Ref, forwardRef, useState} from 'react';
import {
  View,
  TextInput as RNTextInput,
  KeyboardTypeOptions,
  ViewStyle,
  ReturnKeyTypeOptions,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  StyleSheet,
} from 'react-native';
import colors from '../utils/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

export interface Props {
  value: string;
  require?: boolean;
  onChange(newValue: string): void;
  placeholder?: string;
  label?: string;
  maxLength?: number;
  onSubmitEditing?(): void;
  error?: string;
  secureTextEntry?: boolean;
  multiline?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  returnKeyType?: ReturnKeyTypeOptions;
  onKeyPress?(e: NativeSyntheticEvent<TextInputKeyPressEventData>): void;
  blurOnSubmit?: boolean;
  style?: ViewStyle;
  leftIcon?: any;
}

function CustomInput(
  {
    value,
    onChange,
    maxLength,
    onSubmitEditing,
    placeholder,
    error,
    secureTextEntry = false,
    multiline = false,
    keyboardType = 'default',
    autoCapitalize = 'none',
    returnKeyType = 'done',
    onKeyPress,
    blurOnSubmit,
    require,
    style,
    leftIcon,
  }: Props,
  ref: Ref<RNTextInput>,
) {
  const [focussed, setFocussed] = useState(false);

  const setFocussedTrue = () => setFocussed(true);
  const setFocussedFalse = () => setFocussed(false);

  return (
    <>
      <View
        style={[
          error && focussed == true
            ? styles.containerred
            : styles.containergreen || focussed == false
            ? styles.container
            : null,
          style && style,
          require ? {borderWidth: 1, borderColor: 'red'} : {borderWidth: 0},
        ]}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          {leftIcon && (
            <Icon name={leftIcon} size={25} color={colors.text.light} />
          )}

          <RNTextInput
            ref={ref}
            style={[
              styles.textInput,
              multiline && styles.textMultiline,
              focussed && styles.textInputFocussed,
              error && styles.textInputError,
            ]}
            value={value}
            onFocus={setFocussedTrue}
            onBlur={setFocussedFalse}
            blurOnSubmit={blurOnSubmit}
            onChangeText={onChange}
            onSubmitEditing={onSubmitEditing}
            placeholder={placeholder}
            placeholderTextColor={colors.text.light}
            maxLength={maxLength}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            returnKeyType={returnKeyType}
            autoCapitalize={autoCapitalize}
            selectionColor={colors.default.primary}
            multiline={multiline}
            onKeyPress={onKeyPress}
            allowFontScaling={false}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 1,
    borderRadius: 10,
    // borderColor: colors.greys.light,
    backgroundColor: colors.inputField.default,
    height: 66,
    justifyContent: 'center',
    marginBottom: 10,
  },
  containergreen: {
    margin: 1,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.greens.light2,
    backgroundColor: colors.whites.dark,
    flex: 1,
    justifyContent: 'center',
    marginBottom: 10,
  },
  containerred: {
    margin: 1,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.reds.default,
    backgroundColor: colors.whites.dark,
    height: 80,
    justifyContent: 'center',
    marginBottom: 10,
  },

  textInput: {
    paddingHorizontal: 8,
    fontSize: 16,
    color: colors.text.dark,
    fontWeight: '400',
    width: '90%',
    marginLeft: 10,
  },
  textInputFocussed: {
    shadowRadius: 3,
    shadowOpacity: 0,
  },
  textInputError: {
    borderColor: colors.reds.default,
  },
  errorText: {
    marginTop: 5,
    marginBottom: 10,
    color: colors.reds.default,
    fontSize: 18,
  },
  labelText: {
    marginLeft: 15,
    marginTop: 10,
    fontSize: 18,
    color: colors.greys.light2,
  },
  textMultiline: {
    paddingTop: 15,
    paddingBottom: 15,
    height: 144,
    textAlignVertical: 'top',
  },
  iconView: {
    justifyContent: 'center',
    marginRight: 15,
    marginBottom: 30,
  },
});

export default forwardRef(CustomInput);
