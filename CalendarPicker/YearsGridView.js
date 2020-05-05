import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Year from './Year';


export default function YearsGridView(props) {
  const {
    intialYear,
<<<<<<< HEAD
    currentMonth,
    currentYear,
=======
>>>>>>> rebase on master
    styles,
    onSelectYear,
    textStyle,
    minDate,
    maxDate,
<<<<<<< HEAD
  } = props;
  const guideArray = [ 0, 1, 2, 3, 4 ];
  let year = intialYear - 13; // center current year in grid

  function generateColumns() {
    const column = guideArray.map(() => {
      year++;
      return (
        <Year
          key={year}
          year={year}
          currentMonth={currentMonth}
          currentYear={currentYear}
=======
    disabledDates,
  } = props;
  const guideArray = [ 0, 1, 2, 3, 4 ];
  let currentYear = intialYear - 13; // center current year in grid

  function generateColumns() {
    const column = guideArray.map(() => {
      currentYear++;
      return (
        <Year
          key={currentYear}
          year={currentYear}
>>>>>>> rebase on master
          styles={styles}
          onSelectYear={onSelectYear}
          minDate={minDate}
          maxDate={maxDate}
<<<<<<< HEAD
=======
          disabledDates={disabledDates}
>>>>>>> rebase on master
          textStyle={textStyle}
        />
      );
    });
    return column;
  }
  return (
    <View style={styles.yearsWrapper}>
      { guideArray.map(index => (
<<<<<<< HEAD
        <View key={year} style={styles.yearsRow}>
=======
        <View key={currentYear + index + ''} style={styles.yearsRow}>
>>>>>>> rebase on master
          { generateColumns(index) }
        </View>
      ))
      }
    </View>
  );
}

YearsGridView.propTypes = {
  styles: PropTypes.shape(),
  intialYear: PropTypes.number.isRequired,
  onSelectYear: PropTypes.func,
<<<<<<< HEAD
=======
  disabledDates: PropTypes.array
>>>>>>> rebase on master
};
