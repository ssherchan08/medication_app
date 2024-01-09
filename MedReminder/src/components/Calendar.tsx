import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {isToday, format} from 'date-fns';
import {enUS} from 'date-fns/locale';
import {View, TouchableOpacity, StyleSheet, Platform, Text} from 'react-native';
import {getWeekDays} from '../utils/getWeekDays';
import colors from '../utils/colors';
import {setSelectedDay} from '../redux/reducers/calendarSlice';

const Calendar = () => {
  const dispatch = useDispatch();
  const {date, selectedDay} = useSelector(
    (state: {calendar: any}) => state.calendar,
  );
  const [week, setWeek] = useState([]);

  useEffect(() => {
    const weekDays: any = getWeekDays(date);
    // Get today and save it in redux store to highlight it initially as the default selected day
    weekDays.forEach((weekday: any) => {
      if (isToday(weekday.date)) {
        dispatch(setSelectedDay(weekday));
      }
    });
    setWeek(weekDays);
  }, [date, dispatch]);

  return (
    <>
      <Text style={styles.yearTitle}>
        {Platform.OS === 'ios'
          ? `${date
              ?.toLocaleString('en-US', {month: 'long', timeZone: 'UTC'})
              .toUpperCase()}, ${date?.getFullYear()}`
          : `${date && format(date, 'MMMM, Y', {locale: enUS}).toUpperCase()}`}
      </Text>
      <View style={styles.weekContainer}>
        {week.map((weekday: any) => {
          const isSelectedDay = weekday.id === selectedDay?.id;
          return (
            <TouchableOpacity
              activeOpacity={!isSelectedDay ? 0.2 : 1}
              onPress={() => {
                // Only change selected day if it's NOT selected yet
                if (!isSelectedDay) {
                  dispatch(setSelectedDay(weekday));
                }
              }}
              key={weekday.formatted}
              style={[styles.weekDay, getBackgroundColor(isSelectedDay)]}>
              <Text style={styles.weekDayIndex}>{weekday.day}</Text>
              <Text style={styles.weekDayFormatted}>
                {weekday.formatted.toUpperCase()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  yearTitle: {
    fontSize: 18,
    alignSelf: 'flex-start',
    marginTop: 25,
    marginBottom: 10,
    fontWeight: '400',
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 25,
  },
  weekDay: {
    width: '12%',
    borderRadius: 5,
    alignItems: 'center',
    paddingVertical: 10,
  },
  weekDayIndex: {
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 20,
  },
  weekDayFormatted: {
    fontSize: 12,
  },
});

const getBackgroundColor = (isSelectedDay: any) => ({
  backgroundColor: isSelectedDay
    ? colors.default.tertiary
    : colors.background.secondary,
});

export default Calendar;
