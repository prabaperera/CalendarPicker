// Parent view for Month selector

import React, { Component } from 'react';
import { View } from 'react-native';
import MonthsGridView from './MonthsGridView';
import MonthsHeader from './MonthsHeader';

export default class MonthSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentYear: props.currentYear,
    };
  }

  render() {
    const {
      styles,
      textStyle,
      selectedMonthStyle,
      title,
      headingLevel,
      currentYear,
      currentMonth,
      months,
      minDate,
      maxDate,
      onSelectMonth,
    } = this.props;

    return (
      <View styles={styles.calendar}>
        <MonthsHeader
          styles={styles}
          textStyle={textStyle}
          title={title + currentYear}
          headingLevel={headingLevel}
        />
        <MonthsGridView
          styles={styles}
          textStyle={textStyle}
          selectedMonthStyle={selectedMonthStyle}
          currentYear={currentYear}
          currentMonth={currentMonth}
          months={months}
          minDate={minDate}
          maxDate={maxDate}
          onSelectMonth={onSelectMonth}
        />
      </View>
    );
  }
}
