import React from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';

export default function Year(props) {
  const {
    year,
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

  let yearOutOfRange;
  let yearIsBeforeMin = false;
  let yearIsAfterMax = false;
  let yearIsDisabled = false;

  // Check whether year is outside of min/max range.
  if (maxDate) {
    yearIsAfterMax = year > maxDate.year();
  }
  if (minDate) {
    yearIsBeforeMin = year < minDate.year();
  }

  // ToDo: disabledYears props to disable years separate from disabledDates

  yearOutOfRange = yearIsAfterMax || yearIsBeforeMin || yearIsDisabled;

  const onSelect = () => {
    // Guard against navigating to months beyond min/max dates.
    let month = currentMonth;
    let currentMonthYear = moment({year: currentYear, month});
    if (maxDate && currentMonthYear.isAfter(maxDate, 'month')) {
      month = maxDate.month();
    }
    if (minDate && currentMonthYear.isBefore(minDate, 'month')) {
      month = minDate.month();
    }
    onSelectYear({month, year});
  };

  return (
    <View style={[styles.yearContainer]}>
      { !yearOutOfRange ?
        <TouchableOpacity
          onPress={onSelect}>
=======
    disabledDates
  } = props;

  const thisYear = moment({year});

  let dateOutOfRange;
  let dateIsBeforeMin = false;
  let dateIsAfterMax = false;
  let dateIsDisabled = false;

  // First let's check if date is out of range
  // Check whether props maxDate / minDate are defined. If not supplied,
  // don't restrict dates.
  if (maxDate) {
    dateIsAfterMax = thisYear.isAfter(maxDate, 'year');
  }
  if (minDate) {
    dateIsBeforeMin = thisYear.isBefore(minDate, 'year');
  }

  if (disabledDates && disabledDates.indexOf(thisYear.valueOf()) >= 0) {
    dateIsDisabled = true;
  }

  dateOutOfRange = dateIsAfterMax || dateIsBeforeMin || dateIsDisabled;

  return (
    <View style={[styles.yearContainer]}>
      { !dateOutOfRange ?
        <TouchableOpacity
          onPress={() => onSelectYear(year) }>
>>>>>>> rebase on master
          <Text style={[styles.yearText, textStyle]}>
            { year }
          </Text>
        </TouchableOpacity>
        :
        <Text style={[textStyle, styles.disabledText]}>
          { year }
        </Text>
      }
    </View>
  );
}

Year.propTypes = {
  styles: PropTypes.shape({}),
  year: PropTypes.number,
  onSelectYear: PropTypes.func,
<<<<<<< HEAD
=======
  disabledDates: PropTypes.array,
>>>>>>> rebase on master
};
