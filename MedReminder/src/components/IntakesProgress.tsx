import React, {useEffect, useState, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {View, StyleSheet, Platform, Text} from 'react-native';
import {isToday, format} from 'date-fns';
import {enUS} from 'date-fns/locale';
import colors from '../utils/colors';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

const IntakesProgress = () => {
  const {user, calendar, intakes} = useSelector(state => state);
  const [takenToday, setTakenToday] = useState([]);
  const [progressFill, setProgressFill] = useState(0);

  useEffect(() => {
    const takenMedicinesToday = [];
    intakes?.intakesForToday?.forEach((reminder: any) => {
      reminder?.takenOn?.forEach((takenDate: any) => {
        if (
          takenDate === calendar?.selectedDay?.date?.toLocaleDateString('en-US')
        ) {
          takenMedicinesToday.push(takenDate);
        }
      });
    });
    setTakenToday(takenMedicinesToday);
  }, [
    user?.newMedicineTaken,
    calendar?.selectedDay?.date,
    intakes?.intakesForToday,
  ]);

  useEffect(() => {
    const fill = (takenToday.length * 100) / intakes?.intakesForToday?.length;
    setProgressFill(fill);
  }, [takenToday, intakes?.intakesForToday]);

  const allMedicinesTaken = useMemo(() => {
    if (takenToday.length !== 0 && intakes?.intakesForToday?.length !== 0) {
      return takenToday.length === intakes?.intakesForToday?.length;
    }
    return;
  }, [takenToday, intakes?.intakesForToday]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.innerContainer}>
        <AnimatedCircularProgress
          size={200}
          width={15}
          fill={progressFill}
          tintColor={
            takenToday.length === intakes?.intakesForToday?.length
              ? colors.text.green
              : colors.background.secondary
          }
          backgroundColor={colors.greys.light}
          rotation={0}
          lineCap="round">
          {() => (
            <View style={styles.innerProgressContainer}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>INTAKES</Text>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: allMedicinesTaken
                      ? colors.text.green
                      : colors.background.secondary,
                  }}>
                  {takenToday.length}
                </Text>
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: allMedicinesTaken
                      ? colors.text.green
                      : colors.text.dark,
                  }}>
                  {' '}
                  / {intakes?.intakesForToday?.length}
                </Text>
              </View>
              <Text>
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
          )}
        </AnimatedCircularProgress>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.greys.light,
    width: 250,
    height: 250,
    borderRadius: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    backgroundColor: colors.background.primary,
    width: '90%',
    height: '90%',
    borderRadius: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerProgressContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    padding: 20,
    justifyContent: 'space-around',
  },
});

export default IntakesProgress;
