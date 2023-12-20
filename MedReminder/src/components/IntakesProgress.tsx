import React from 'react';
import {useSelector} from 'react-redux';
import {View, StyleSheet, Platform, Text} from 'react-native';
import {isToday, format} from 'date-fns';
import {enUS} from 'date-fns/locale';
import colors from '../utils/colors';

const IntakesProgress = () => {
  const {calendar, intakes} = useSelector(state => state);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.innerContainer}>
        <View style={styles.innerProgressContainer}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>TOTAL</Text>
          <Text
            style={{
              fontSize: 56,
              fontWeight: 'bold',
              color: intakes?.intakesForToday?.length
                ? colors.background.secondary
                : colors.greys.light4,
            }}>
            {intakes?.intakesForToday?.length}
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '500',
              color: colors.text.dark,
            }}>
            {isToday(calendar?.selectedDay?.date)
              ? 'Today'
              : Platform.OS === 'ios'
              ? `${calendar?.selectedDay?.date?.toLocaleString('en-US', {
                  weekday: 'long',
                })}`
              : `${
                  calendar?.selectedDay?.date &&
                  format(calendar.selectedDay.date, 'EEEE', {locale: enUS})
                }`}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.greys.light,
    width: 180,
    height: 180,
    borderRadius: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    backgroundColor: colors.background.primary,
    width: '92%',
    height: '92%',
    borderRadius: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerProgressContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    padding: 30,
    justifyContent: 'space-around',
  },
});

export default IntakesProgress;
