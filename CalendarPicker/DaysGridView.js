import React, { Component } from 'react';
import {
  View,
  Text,
  ViewPropTypes as RNViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';
import Day from './Day';
import EmptyDay from './EmptyDay';
import { Utils } from './Utils';
import moment from 'moment';

const ViewPropTypes = RNViewPropTypes || View.propTypes;

<<<<<<< HEAD
export default class DaysGridView extends Component {
  constructor(props) {
    super(props);

    this.initMonthSettings = props => {
      const {
        month,
        year,
        showDayStragglers,
        startFromMonday,
      } = props;

      // Retrieve total days in this month & year, accounting for leap years.
      const numDaysInMonth = Utils.getDaysInMonth(month, year);

      // Calculate days in prev month for day stragglers.
      let prevMonth, prevMonthYear;
      let numDaysInPrevMonth;
      if (showDayStragglers) {
        prevMonth = month - 1;
        prevMonthYear = year;
        if (prevMonth < 0) {
          prevMonth = 11;
          prevMonthYear--;
        }
        numDaysInPrevMonth = Utils.getDaysInMonth(prevMonth, prevMonthYear);
      }

      // Create a date for day one of the current given month and year
      const firstDayOfMonth = moment({ year, month, day: 1 });

      // Determine which day of the week day 1 falls on.
      // See https://github.com/stephy/CalendarPicker/issues/49
      // isoWeekday() gets the ISO day of the week with 1=Monday and 7=Sunday.
      const firstWeekDay = firstDayOfMonth.isoWeekday();

      // Determine starting index based on first day of week as Monday or Sunday.
      const startIndex = (startFromMonday ? firstWeekDay - 1 : firstWeekDay) % 7;

      return {
        maxWeekRows: 6,
        numDaysInWeek: 7,
        numDaysInMonth,
        numDaysInPrevMonth,
        firstDayOfMonth,
        firstWeekDay,
        startIndex,
      };
    };

    const monthSettings = this.initMonthSettings(props);
    this.state = {
      monthSettings,
      daysGrid: this.generateDaysGrid(monthSettings),
    };
  }

  componentDidUpdate(prevProps) {
    // Optimize re-renders by checking props, with special handling for selected dates.
    // Shallow compare prop changes, excluding selected dates.
    const propDiffs = Utils.shallowDiff(this.props, prevProps, ['selectedStartDate', 'selectedEndDate']);
    if (propDiffs.length) {
      // Recreate days
      const monthSettings = this.initMonthSettings(this.props);
      this.setState({
        monthSettings,
        daysGrid: this.generateDaysGrid(monthSettings),
      });
    }
    else {
      // Update daysGrid entries when selected date(s) affect this month.
      const { selectedStartDate, selectedEndDate } = this.props;
      const { selectedStartDate: prevSelStart, selectedEndDate: prevSelEnd } = prevProps;
      const { firstDayOfMonth } = this.state.monthSettings;
      const isSelectedDiff =
        !Utils.compareDates(selectedStartDate, prevSelStart, 'day') ||
        !Utils.compareDates(selectedEndDate, prevSelEnd, 'day');
      // Check that selected date(s) match this month.
      if (isSelectedDiff && (
        Utils.compareDates(selectedStartDate, firstDayOfMonth, 'month') ||
          Utils.compareDates(selectedEndDate, firstDayOfMonth, 'month') ||
          Utils.compareDates(prevSelStart, firstDayOfMonth, 'month') ||
          Utils.compareDates(prevSelEnd, firstDayOfMonth, 'month') ))
      {
        // Range selection potentially affects all dates in the month. Recreate.
        if (this.props.allowRangeSelection) {
          this.setState({
            daysGrid: this.generateDaysGrid(this.state.monthSettings),
          });
        }
        else {
          // Search for affected dates and modify those only
          const daysGrid = [...this.state.daysGrid];
          const { year } = this.props;
          for (let i = 0; i <daysGrid.length; i++) {
            for (let j = 0; j <daysGrid[i].length; j++) {
              const { month, day } = daysGrid[i][j];
              // Empty days and stragglers can't be selected.
              if (month === undefined) { continue; }
              // Check single date
              const thisDay = { year, month, day };
              const isSelected = Utils.compareDates(selectedStartDate, thisDay, 'day');
              const isPrevSelected = Utils.compareDates(prevSelStart, thisDay, 'day');
              if (isSelected || isPrevSelected)
              {
                daysGrid[i][j] = this.renderDayInCurrentMonth(day);
              }
            }
          }
          this.setState({ daysGrid });
=======
export default function DaysGridView(props) {
  const {
    month,
    year,
    styles,
    onPressDay,
    startFromMonday,
    selectedStartDate,
    selectedEndDate,
    allowRangeSelection,
    allowBackwardRangeSelect,
    textStyle,
    todayTextStyle,
    selectedDayStyle,
    selectedRangeStartStyle,
    selectedRangeStyle,
    selectedRangeEndStyle,
    customDatesStyles,
    minDate,
    maxDate,
    disabledDates,
    disabledDatesTextStyle,
    minRangeDuration,
    maxRangeDuration,
    enableDateChange
  } = props;

  // let's get the total of days in this month, we need the year as well, since
  // leap years have different amount of days in February
  const totalDays = Utils.getDaysInMonth(month, year);

  // Let's create a date for day one of the current given month and year
  const firstDayOfMonth = moment({ year, month, day: 1 });

  // isoWeekday() gets the ISO day of the week with 1 being Monday and 7 being Sunday.
  // We will need this to know what day of the week to show day 1
  // See https://github.com/stephy/CalendarPicker/issues/49
  const firstWeekDay = firstDayOfMonth.isoWeekday();

  // fill up an array of days with the amount of days in the current month
  const days = Array.apply(null, {length: totalDays}).map(Number.call, Number);

  // 7 days in a week.
  const dayArray = [ 0, 1, 2, 3, 4, 5, 6 ];

  // There can be 4 to 6 rows of weeks in a month.
  const weekArray = [ 0, 1, 2, 3, 4, 5 ];

  // Get the starting index, based upon whether we are using monday or sunday as first day.
  const startIndex = (startFromMonday ? firstWeekDay - 1 : firstWeekDay) % 7;

  function generateDatesForWeek(i) {
    return dayArray.map(dayIndex => {
      if (i === 0) { // for first row, let's start showing the days on the correct weekday
        if (dayIndex >= startIndex) {
          if (days.length > 0) {
            const day = days.shift() + 1;
            return (
              <Day
                key={day}
                day={day}
                month={month}
                year={year}
                styles={styles}
                onPressDay={onPressDay}
                selectedStartDate={selectedStartDate}
                selectedEndDate={selectedEndDate}
                allowRangeSelection={allowRangeSelection}
                allowBackwardRangeSelect={allowBackwardRangeSelect}
                minDate={minDate}
                maxDate={maxDate}
                disabledDates={disabledDates}
                disabledDatesTextStyle={disabledDatesTextStyle}
                minRangeDuration={minRangeDuration}
                maxRangeDuration={maxRangeDuration}
                textStyle={textStyle}
                todayTextStyle={todayTextStyle}
                selectedDayStyle={selectedDayStyle}
                selectedRangeStartStyle={selectedRangeStartStyle}
                selectedRangeStyle={selectedRangeStyle}
                selectedRangeEndStyle={selectedRangeEndStyle}
                customDatesStyles={customDatesStyles}
                enableDateChange={enableDateChange}
              />
            );
          }
        } else {
          return (
            <EmptyDay
              key={uuid()}
              styles={styles}
            />
          );
        }
      } else {
        if (days.length > 0) {
          const day = days.shift() + 1;
          return (
            <Day
              key={day}
              day={day}
              month={month}
              year={year}
              styles={styles}
              onPressDay={onPressDay}
              selectedStartDate={selectedStartDate}
              selectedEndDate={selectedEndDate}
              allowRangeSelection={allowRangeSelection}
              allowBackwardRangeSelect={allowBackwardRangeSelect}
              minDate={minDate}
              maxDate={maxDate}
              disabledDates={disabledDates}
              disabledDatesTextStyle={disabledDatesTextStyle}
              minRangeDuration={minRangeDuration}
              maxRangeDuration={maxRangeDuration}
              textStyle={textStyle}
              todayTextStyle={todayTextStyle}
              selectedDayStyle={selectedDayStyle}
              selectedRangeStartStyle={selectedRangeStartStyle}
              selectedRangeStyle={selectedRangeStyle}
              selectedRangeEndStyle={selectedRangeEndStyle}
              customDatesStyles={customDatesStyles}
              enableDateChange={enableDateChange}
            />
          );
>>>>>>> rebase on master
        }
      }
    }
  }

  renderDayInCurrentMonth(day) {
    return ({
      day,
      month: this.props.month,
      component: (
        <Day
          key={day}
          day={day}
          {...this.props}
        />
      ),
    });
  }

<<<<<<< HEAD
  renderEmptyDay(key) {
    return ({
      component: (
        <EmptyDay
          key={'empty' + key}
          styles={this.props.styles}
        />
      ),
    });
  }

  renderDayStraggler({key, day}) {
    return ({
      day,
      // month doesn't matter for stragglers as long as isn't set to current month
      component: (
        <Day
          key={key}
          day={day}
          styles={this.props.styles}
          disabledDates={() => true}
          disabledDatesTextStyle={this.props.disabledDatesTextStyle}
          textStyle={this.props.textStyle}
        />
      )
    });
  }

  // Create grid of days.
  generateDaysGrid = params => {
    const {
      numDaysInWeek,
      maxWeekRows,
      startIndex,
      numDaysInMonth,
      numDaysInPrevMonth
    } = params;
    let daysGrid = [[]];
    let dayOfMonth = 1;
    let dayNextMonth = 1;
    let lastFilledRow = 0;

    // Week rows
    for (let i = 0; i < maxWeekRows; i++) {
      daysGrid[i] = [];
      // Days in week
      for (let j = 0; j < numDaysInWeek; j++) {
        if (i === 0) {
          // first row: start current month's day on the correct weekday
          if (j >= startIndex) {
            if (dayOfMonth <= numDaysInMonth) {
              daysGrid[i].push(this.renderDayInCurrentMonth(dayOfMonth++));
            }
          } else {
            const key = '' + i + j;
            daysGrid[i].push(this.props.showDayStragglers ?
              // Show previous month's days
              this.renderDayStraggler({
                key,
                day: numDaysInPrevMonth - startIndex + j + 1,
              })
              :
              //... otherwise blank
              this.renderEmptyDay(key)
            );
          }
        } else {
          if (dayOfMonth <= numDaysInMonth) {
            lastFilledRow = i;
            daysGrid[i].push(this.renderDayInCurrentMonth(dayOfMonth++));
          }
          else {
            if (this.props.showDayStragglers && i <= lastFilledRow) {
              // Show next month's days
              daysGrid[i].push(this.renderDayStraggler({
                key: '' + i + j,
                day: dayNextMonth++,
              }));
            }
          }
        }
=======
  return (
    <View style={styles.daysWrapper}>
      { weekArray.map(weekIndexOfMonth => (
        <View key={weekIndexOfMonth} style={styles.weekRow}>
          { generateDatesForWeek(weekIndexOfMonth) }
        </View>
      ))
>>>>>>> rebase on master
      }
    }
    return daysGrid;
  }

  render() {
    const { styles } = this.props;
    const { daysGrid } = this.state;
    const renderedDaysGrid = daysGrid.map((weekRow, i) => (
      <View key={i} style={styles.weekRow}>
        { weekRow.map(day => day.component ) }
      </View>
    ));

    return (
      <View style={styles.daysWrapper}>
        { renderedDaysGrid }
      </View>
    );
  }
}

DaysGridView.propTypes = {
  styles: PropTypes.shape(),
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  onPressDay: PropTypes.func,
  startFromMonday: PropTypes.bool,
  selectedDayStyle: ViewPropTypes.style,
  selectedRangeStartStyle: ViewPropTypes.style,
  selectedRangeStyle: ViewPropTypes.style,
  selectedRangeEndStyle: ViewPropTypes.style,
  todayTextStyle: Text.propTypes.style,
  customDatesStyles: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.shape({
      date: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date),
        PropTypes.instanceOf(moment)
      ]),
      containerStyle: ViewPropTypes.style,
      style: ViewPropTypes.style,
      textStyle: Text.propTypes.style,
    })),
  ]),
  disabledDates: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
  disabledDatesTextStyle: Text.propTypes.style,
  minRangeDuration: PropTypes.oneOfType([PropTypes.array, PropTypes.number]),
  maxRangeDuration: PropTypes.oneOfType([PropTypes.array, PropTypes.number]),
};
