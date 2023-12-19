import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../utils/colors';

interface Props {
  title: string;
}

const CommonHeader: React.FC<Props> = ({title}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTextStyle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop: DeviceScale.Scale(60),
    flexDirection: 'row',
    // marginLeft: DeviceScale.Scale(16),
    height: 30,
    justifyContent: 'space-between',
  },
  headerTextStyle: {
    fontSize: 18,
    color: colors.blacks.default,
    // marginTop: Scale(-4),
  },
});

export default CommonHeader;
