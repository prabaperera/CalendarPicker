// Parent view for Year selector

import React, { Component } from 'react';
import { View } from 'react-native';
import YearsGridView from './YearsGridView';
import YearsHeader from './YearsHeader';

export default class YearSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialYear: props.currentYear,
      gridSize: props.grid.column * props.grid.row,
    };
  }

  handleOnYearViewPrevious = () => {
    this.setState({
      initialYear: parseInt(Math.max(this.state.initialYear - this.state.gridSize, 0))
    });
  }

  handleOnYearViewNext = () => {
    this.setState({
      initialYear: parseInt(this.state.initialYear + this.state.gridSize)
    });
  }

  render() {
    const {
      styles,
      textStyle,
      selectedYearStyle,
      title,
      initialDate,
      currentMonth,
      currentYear,
      minDate,
      maxDate,
      grid,
      restrictNavigation,
      previousComponent,
      nextComponent,
      previousTitle,
      nextTitle,
      previousTitleStyle,
      nextTitleStyle,
      headingLevel,
      onSelectYear,
    } = this.props;

    return (
      <View styles={styles.calendar}>
        <YearsHeader
          styles={styles}
          textStyle={textStyle}
          title={title}
          headingLevel={headingLevel}
          initialDate={initialDate}
          minDate={minDate}
          maxDate={maxDate}
          restrictNavigation={restrictNavigation}
          year={this.state.initialYear}
          previousComponent={previousComponent}
          nextComponent={nextComponent}
          previousTitle={previousTitle}
          nextTitle={nextTitle}
          previousTitleStyle={previousTitleStyle}
          nextTitleStyle={nextTitleStyle}
          onYearViewPrevious={this.handleOnYearViewPrevious}
          onYearViewNext={this.handleOnYearViewNext}
        />
        <YearsGridView
          intialYear={this.state.initialYear}
          currentMonth={currentMonth}
          currentYear={currentYear}
          styles={styles}
          onSelectYear={onSelectYear}
          minDate={minDate}
          maxDate={maxDate}
          grid={grid}
          textStyle={textStyle}
          selectedYearStyle={selectedYearStyle}
        />
      </View>
    );
  }
}

YearSelector.defaultProps = {
      grid: {
            column: 3,
            row: 3,
      },
};
