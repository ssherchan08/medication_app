import React from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../utils/colors';

const Screen = ({children, style: customInnerStyles = {}}) => {
  const defaultContainerStyles = {
    flex: 1,
    backgroundColor: colors.background.primary,
    paddingHorizontal: 20,
  };
  const defaultInnerStyles = {
    alignItems: 'center',
    flex: 1,
    width: '100%',
  };
  const innerStyles = [defaultInnerStyles, customInnerStyles];

  return (
    <SafeAreaView style={defaultContainerStyles}>
      <View style={innerStyles}>{children}</View>
    </SafeAreaView>
  );
};

export default Screen;
