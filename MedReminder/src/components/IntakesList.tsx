import React from 'react';
import {useSelector} from 'react-redux';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Intake from './Intake';
import colors from '../utils/colors';

const IntakesList = () => {
  const {intakesForToday} = useSelector(state => state.intakes);

  return (
    <View style={styles.container}>
      <ScrollView
        bounces={false}
        style={{width: '100%', height:'35%'}}
        showsVerticalScrollIndicator={false}>
        {intakesForToday?.length ? (
          intakesForToday?.map((intake: any, index: number) => {
            return <Intake key={`${intake.name}-${index}`} {...intake} />;
          })
        ) : (
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>No items to show</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 30,
    width: '100%',
  },
  noDataContainer: {
    backgroundColor: colors.background.grey,
    padding: 60,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 12,
    height: 200,
  },
  noDataText: {
    fontSize: 18,
    color: colors.greys.dark,
  },
});

export default IntakesList;
