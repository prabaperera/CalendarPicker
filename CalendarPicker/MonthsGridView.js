import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Month from './Month';


export default function MonthsGridView(props) {
  const {
    currentYear,
    currentMonth,
    months,
    styles,
    onSelectMonth,
    textStyle,
    selectedMonthStyle,
    minDate,
    maxDate,
  } = props;
  const _months = Array.from(Array(12).keys());
  const columnArray = [ 0, 1, 2 ];
  const rowArray = [ 0, 1, 2, 3 ];

  function generateColumns() {
    const column = columnArray.map(index => {
      const _currentMonth = _months.shift();
      return (
        <Month
          key={_currentMonth + index}
          month={_currentMonth}
          currentMonth={currentMonth}
          currentYear={currentYear}
          months={months}
          styles={styles}
          onSelectMonth={onSelectMonth}
          minDate={minDate}
          maxDate={maxDate}
          textStyle={textStyle}
          selectedMonthStyle={selectedMonthStyle}
        />
      );
    });
    return column;
  }

  return (
    <View style={styles.monthsWrapper}>
      { rowArray.map(index => (
        <View key={index} style={styles.monthsRow}>
          { generateColumns() }
        </View>
      ))
      }
    </View>
  );
}

MonthsGridView.propTypes = {
  styles: PropTypes.shape(),
  currentYear: PropTypes.number.isRequired,
  months: PropTypes.array,
  onSelectMonth: PropTypes.func,
};
