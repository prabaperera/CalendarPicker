import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Year from './Year';


export default function YearsGridView(props) {
  const {
    intialYear,
    currentMonth,
    currentYear,
    styles,
    onSelectYear,
    textStyle,
    selectedYearStyle,
    minDate,
    maxDate,
    grid,
  } = props;

  const columnArray = [];
  for (var i = 0; i < grid.column; i++) {
    columnArray.push(i);
  }

  const rowArray = [];
  for (var i = 0; i < grid.row; i++) {
    rowArray.push(i);
  }

  //const columnArray = [ 0, 1, 2, 3, 4 ];
  let year = intialYear - (parseInt((grid.column*grid.row)/2, 10)); // center current year in grid

  function generateColumns() {
    const column = columnArray.map(() => {
      year++;
      return (
        <Year
          key={year}
          year={year}
          currentMonth={currentMonth}
          currentYear={currentYear}
          styles={styles}
          onSelectYear={onSelectYear}
          minDate={minDate}
          maxDate={maxDate}
          textStyle={textStyle}
          selectedYearStyle={selectedYearStyle}
        />
      );
    });
    return column;
  }
  return (
    <View style={styles.yearsWrapper}>
      { rowArray.map(index => (
        <View key={year} style={styles.yearsRow}>
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
};
