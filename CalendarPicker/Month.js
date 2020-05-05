import React from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import { Utils } from './Utils';
<<<<<<< HEAD
=======
import moment from 'moment';
>>>>>>> rebase on master

export default function Month(props) {
  const {
    months,
    currentMonth: month,
    currentYear: year,
    styles,
    onSelectMonth,
    textStyle,
    minDate,
    maxDate,
<<<<<<< HEAD
=======
    disabledDates
>>>>>>> rebase on master
  } = props;

  const MONTHS = months || Utils.MONTHS; // English Month Array
  const monthName = MONTHS[month];

<<<<<<< HEAD
  let monthOutOfRange;
  let monthIsBeforeMin = false;
  let monthIsAfterMax = false;
  let monthIsDisabled = false;

  // Check whether month is outside of min/max range.
  if (maxDate && (maxDate.year() === year)) {
    monthIsAfterMax = month > maxDate.month();
  }
  if (minDate && (minDate.year() === year)) {
    monthIsBeforeMin = month < minDate.month();
  }

  // ToDo: disabledMonths props to disable months separate from disabledDates

  monthOutOfRange = monthIsAfterMax || monthIsBeforeMin || monthIsDisabled;

  const onSelect = () => {
    let _year = year;
    if (minDate && (year < minDate.year())) {
      _year = minDate.year();
    }
    if (maxDate && (year > maxDate.year())) {
      _year = maxDate.year();
    }
    onSelectMonth({month, year: _year});
  };

  return (
    <View style={[styles.monthContainer]}>
      { !monthOutOfRange ?
        <TouchableOpacity
          onPress={onSelect}>
=======
  const thisMonth = moment({year, month});

  let dateOutOfRange;
  let dateIsBeforeMin = false;
  let dateIsAfterMax = false;
  let dateIsDisabled = false;

  // First let's check if date is out of range
  // Check whether props maxDate / minDate are defined. If not supplied,
  // don't restrict dates.
  if (maxDate) {
    dateIsAfterMax = thisMonth.isAfter(maxDate, 'month');
  }
  if (minDate) {
    dateIsBeforeMin = thisMonth.isBefore(minDate, 'month');
  }

  if (disabledDates && disabledDates.indexOf(thisMonth.valueOf()) >= 0) {
    dateIsDisabled = true;
  }

  dateOutOfRange = dateIsAfterMax || dateIsBeforeMin || dateIsDisabled;

  return (
    <View style={[styles.monthContainer]}>
      { !dateOutOfRange ?
        <TouchableOpacity
          onPress={() => onSelectMonth(month) }>
>>>>>>> rebase on master
          <Text style={[styles.monthText, textStyle]}>
            { monthName }
          </Text>
        </TouchableOpacity>
        :
        <Text style={[textStyle, styles.disabledText]}>
          { monthName }
        </Text>
      }
    </View>
  );
}

Month.propTypes = {
  styles: PropTypes.shape({}),
  currentMonth: PropTypes.number,
  currentYear: PropTypes.number,
  onSelectMonth: PropTypes.func,
<<<<<<< HEAD
=======
  disabledDates: PropTypes.array,
>>>>>>> rebase on master
};
