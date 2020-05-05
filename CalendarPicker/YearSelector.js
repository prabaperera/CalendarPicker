// Parent view for Year selector

import React, { Component } from 'react';
import { View } from 'react-native';
import YearsGridView from './YearsGridView';
import YearsHeader from './YearsHeader';

export default class YearSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
<<<<<<< HEAD
      initialYear: props.currentYear,
=======
      currentYear: props.currentYear,
>>>>>>> rebase on master
    };
  }

  handleOnYearViewPrevious = () => {
    this.setState({
<<<<<<< HEAD
      initialYear: parseInt(Math.max(this.state.initialYear - 25, 0))
=======
      currentYear: parseInt(Math.max(this.state.currentYear - 25, 0))
>>>>>>> rebase on master
    });
  }

  handleOnYearViewNext = () => {
    this.setState({
<<<<<<< HEAD
      initialYear: parseInt(this.state.initialYear + 25)
=======
      currentYear: parseInt(this.state.currentYear + 25)
>>>>>>> rebase on master
    });
  }

  render() {
    const {
      styles,
      textStyle,
      title,
      initialDate,
<<<<<<< HEAD
      currentMonth,
      currentYear,
=======
>>>>>>> rebase on master
      minDate,
      maxDate,
      restrictNavigation,
      previousComponent,
      nextComponent,
      previousTitle,
      nextTitle,
      previousTitleStyle,
      nextTitleStyle,
      headingLevel,
      onSelectYear,
<<<<<<< HEAD
    } = this.props;

    return (
      <View styles={styles.calendar}>
=======
      disabledDates
    } = this.props;

    return (
      <View>
>>>>>>> rebase on master
        <YearsHeader
          styles={styles}
          textStyle={textStyle}
          title={title}
          headingLevel={headingLevel}
          initialDate={initialDate}
          minDate={minDate}
          maxDate={maxDate}
          restrictNavigation={restrictNavigation}
<<<<<<< HEAD
          year={this.state.initialYear}
=======
          currentYear={this.state.currentYear}
>>>>>>> rebase on master
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
<<<<<<< HEAD
          intialYear={this.state.initialYear}
          currentMonth={currentMonth}
          currentYear={currentYear}
=======
          intialYear={this.state.currentYear}
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
      </View>
    );
  }
}
