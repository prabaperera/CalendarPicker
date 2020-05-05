import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { makeStyles } from './makeStyles';
import { Utils } from './Utils';
import HeaderControls from './HeaderControls';
import Weekdays from './Weekdays';
import DaysGridView from './DaysGridView';
import MonthSelector from './MonthSelector';
import YearSelector from './YearSelector';
<<<<<<< HEAD
import Scroller from './Scroller';
import moment from 'moment';

=======
import Swiper from './Swiper';
import moment from 'moment';

const SWIPE_LEFT = 'SWIPE_LEFT';
const SWIPE_RIGHT = 'SWIPE_RIGHT';

const _swipeConfig = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80
};
>>>>>>> rebase on master

export default class CalendarPicker extends Component {
  constructor(props) {
    super(props);
    this.numMonthsScroll = 60; // 5 years
    this.state = {
      currentMonth: null,
      currentYear: null,
      currentView: 'days',
      selectedStartDate: props.selectedStartDate && moment(props.selectedStartDate),
      selectedEndDate: props.selectedEndDate && moment(props.selectedEndDate),
      minDate: props.minDate && moment(props.minDate),
      maxDate: props.maxDate && moment(props.maxDate),
      styles: {},
      ...this.updateScaledStyles(props),
      ...this.updateMonthYear(props.initialDate),
<<<<<<< HEAD
      ...this.updateDisabledDates(props.disabledDates),
      ...this.updateMinMaxRanges(props.minRangeDuration, props.maxRangeDuration),
      ...this.createMonths(props, {}),
    };
    this.state.renderMonthParams = this.createMonthProps(this.state);
=======
      ...this.updateDayOfWeekStyles(props.initialDate),
      ...this.updateDisabledDates(props.disabledDates),
      ...this.updateMinMaxRanges(props.minRangeDuration, props.maxRangeDuration),
    };
    this.updateScaledStyles = this.updateScaledStyles.bind(this);
    this.updateMonthYear = this.updateMonthYear.bind(this);
    this.updateDisabledDates = this.updateDisabledDates.bind(this);
    this.updateMinMaxRanges = this.updateMinMaxRanges.bind(this);
    this.updateDayOfWeekStyles = this.updateDayOfWeekStyles.bind(this);
    this.handleOnPressPrevious = this.handleOnPressPrevious.bind(this);
    this.handleOnPressNext = this.handleOnPressNext.bind(this);
    this.handleOnPressDay = this.handleOnPressDay.bind(this);
    this.handleOnPressMonth = this.handleOnPressMonth.bind(this);
    this.handleOnPressYear = this.handleOnPressYear.bind(this);
    this.handleOnSelectMonth = this.handleOnSelectMonth.bind(this);
    this.handleOnSelectYear = this.handleOnSelectYear.bind(this);
    this.onSwipe = this.onSwipe.bind(this);
    this.resetSelections = this.resetSelections.bind(this);
>>>>>>> rebase on master
  }

  static defaultProps = {
    initialDate: moment(),
    scaleFactor: 375,
    scrollable: false,
    onDateChange: () => {
      console.log('onDateChange() not provided');
    },
    enableDateChange: true,
    headingLevel: 1,
    sundayColor: '#FFFFFF',
    customDatesStyles: [],
<<<<<<< HEAD
    previousTitle: 'Previous',
    nextTitle: 'Next',
    selectMonthTitle: 'Select Month in ',
    selectYearTitle: 'Select Year',
    horizontal: true,
  };

=======
    customDatesStylesPriority: 'dayOfWeek',
    previousTitle: 'Previous',
    nextTitle: 'Next',
    selectMonthTitle: 'Select Month',
    selectYearTitle: 'Select Year',
  };

  componentDidMount() {
  }

>>>>>>> rebase on master
  componentDidUpdate(prevProps) {
    let doStateUpdate = false;

    let newStyles = {};
    if (
      prevProps.width !== this.props.width ||
      prevProps.height !== this.props.height
    ) {
      newStyles = this.updateScaledStyles(this.props);
      doStateUpdate = true;
    }

    let newMonthYear = {};
    if (!moment(prevProps.initialDate).isSame(this.props.initialDate, 'day')) {
      newMonthYear = this.updateMonthYear(this.props.initialDate);
      doStateUpdate = true;
    }

    let selectedDateRanges = {};
    const { selectedStartDate, selectedEndDate } = this.props;
    if (selectedStartDate !== prevProps.selectedStartDate ||
        selectedEndDate !== prevProps.selectedEndDate
    ) {
      selectedDateRanges = {
        selectedStartDate: selectedStartDate && moment(selectedStartDate),
        selectedEndDate: selectedEndDate && moment(selectedEndDate)
      };
      doStateUpdate = true;
    }

    let disabledDates = {};
    if (prevProps.disabledDates !== this.props.disabledDates) {
      disabledDates = this.updateDisabledDates(this.props.disabledDates);
      doStateUpdate = true;
    }

    let rangeDurations = {};
    if (prevProps.minRangeDuration !== this.props.minRangeDuration ||
        prevProps.maxRangeDuration !== this.props.maxRangeDuration
    ) {
      const {minRangeDuration, maxRangeDuration} = this.props;
      rangeDurations = this.updateMinMaxRanges(minRangeDuration, maxRangeDuration);
      doStateUpdate = true;
    }

<<<<<<< HEAD
    let minMaxDates = {};
    if (prevProps.minDate !== this.props.minDate ||
        prevProps.minDate !== this.props.minDate
    ) {
      minMaxDates.minDate = this.props.minDate && moment(this.props.minDate);
      minMaxDates.maxDate = this.props.maxDate && moment(this.props.maxDate);
    }

    if (doStateUpdate) {
      const newState = {
        ...newStyles,
        ...newMonthYear,
        ...selectedDateRanges,
        ...disabledDates,
        ...rangeDurations,
        ...minMaxDates,
      };
      let renderMonthParams = {};
      const _state = {...this.state, ...newState};
      renderMonthParams = this.createMonthProps(_state);
      this.setState({...newState, renderMonthParams});
=======
    let disabledDates = {};
    if (prevProps.disabledDates !== this.props.disabledDates) {
      disabledDates = this.updateDisabledDates(this.props.disabledDates);
      doStateUpdate = true;
    }

    let rangeDurations = {};
    if (prevProps.minRangeDuration !== this.props.minRangeDuration ||
        prevProps.maxRangeDuration !== this.props.maxRangeDuration
    ) {
      const {minRangeDuration, maxRangeDuration} = this.props;
      rangeDurations = this.updateMinMaxRanges(minRangeDuration, maxRangeDuration);
      doStateUpdate = true;
    }

    let minDate = this.props.minDate && moment(this.props.minDate);
    let maxDate = this.props.maxDate && moment(this.props.maxDate);

    if (doStateUpdate) {
      this.setState({ ...newStyles, ...newMonthYear, ...selectedDateRanges,
        ...customDatesStyles, ...disabledDates, ...rangeDurations,
        minDate, maxDate });
>>>>>>> rebase on master
    }
  }

  updateScaledStyles = props => {
    const {
      scaleFactor,
      selectedDayColor,
      selectedDayTextColor,
      todayBackgroundColor,
      width,
      height,
      dayShape
    } = props;

    // The styles in makeStyles are intially scaled to this width
    const containerWidth = width ? width : Dimensions.get('window').width;
    const containerHeight = height ? height : Dimensions.get('window').height;
<<<<<<< HEAD
=======
    const initialScale =
      Math.min(containerWidth, containerHeight) / scaleFactor;
>>>>>>> rebase on master
    return {
      styles: makeStyles({
        containerWidth,
        containerHeight,
        scaleFactor,
        selectedDayColor,
        selectedDayTextColor,
        todayBackgroundColor,
        dayShape
      })
    };
  }

  updateMonthYear = (initialDate = this.props.initialDate, updateState) => {
    const newState = {
      currentMonth: parseInt(moment(initialDate).month()),
      currentYear: parseInt(moment(initialDate).year())
    };
    if (updateState) {
      this.setState(newState);
    }
    return newState;
  }

<<<<<<< HEAD
  updateDisabledDates = (_disabledDates = []) => {
=======
  updateDisabledDates(_disabledDates = []) {
>>>>>>> rebase on master
    let disabledDates = [];
    if (_disabledDates) {
      if (Array.isArray(_disabledDates)) {
        // Convert input date into timestamp
        _disabledDates.map(date => {
          let thisDate = moment(date);
          thisDate.set({ hour: 12, minute: 0, second: 0, millisecond: 0 });
          disabledDates.push(thisDate.valueOf());
        });
      }
      else if (_disabledDates instanceof Function) {
        disabledDates = _disabledDates;
      }
    }
    return { disabledDates };
  }
<<<<<<< HEAD

  updateMinMaxRanges = (_minRangeDuration, _maxRangeDuration) => {
    let minRangeDuration = [];
    let maxRangeDuration = [];
=======

  updateMinMaxRanges(_minRangeDuration, _maxRangeDuration) {
    let minRangeDuration = [];
    let maxRangeDuration = [];

    if (_minRangeDuration) {
      if (Array.isArray(_minRangeDuration)) {
        _minRangeDuration.map(mrd => {
          let thisDate = moment(mrd.date);
          thisDate.set({ hour: 12, minute: 0, second: 0, millisecond: 0 });
          minRangeDuration.push({
            date: thisDate.valueOf(),
            minDuration: mrd.minDuration
          });
        });
      } else {
        minRangeDuration = _minRangeDuration;
      }
    }

    if (_maxRangeDuration) {
      if (Array.isArray(_maxRangeDuration)) {
        _maxRangeDuration.map(mrd => {
          let thisDate = moment(mrd.date);
          thisDate.set({ hour: 12, minute: 0, second: 0, millisecond: 0 });
          maxRangeDuration.push({
            date: thisDate.valueOf(),
            maxDuration: mrd.maxDuration
          });
        });
      } else {
        maxRangeDuration = _maxRangeDuration;
      }
    }
    return {minRangeDuration, maxRangeDuration};
  }

  handleOnPressDay(day) {
    const {
      currentYear,
      currentMonth,
      selectedStartDate,
      selectedEndDate
    } = this.state;

    const {
      allowRangeSelection,
      allowBackwardRangeSelect,
      enableDateChange,
      onDateChange,
    } = this.props;
>>>>>>> rebase on master

    if (_minRangeDuration) {
      if (Array.isArray(_minRangeDuration)) {
        _minRangeDuration.map(mrd => {
          let thisDate = moment(mrd.date);
          thisDate.set({ hour: 12, minute: 0, second: 0, millisecond: 0 });
          minRangeDuration.push({
            date: thisDate.valueOf(),
            minDuration: mrd.minDuration
          });
        });
      } else {
        minRangeDuration = _minRangeDuration;
      }
    }

<<<<<<< HEAD
    if (_maxRangeDuration) {
      if (Array.isArray(_maxRangeDuration)) {
        _maxRangeDuration.map(mrd => {
          let thisDate = moment(mrd.date);
          thisDate.set({ hour: 12, minute: 0, second: 0, millisecond: 0 });
          maxRangeDuration.push({
            date: thisDate.valueOf(),
            maxDuration: mrd.maxDuration
          });
        });
      } else {
        maxRangeDuration = _maxRangeDuration;
      }
=======
    const date = moment({ year: currentYear, month: currentMonth, day, hour: 12 });

    if (allowRangeSelection && selectedStartDate && !selectedEndDate) {
      if (date.isSameOrAfter(selectedStartDate, 'day')) {
        this.setState({
          selectedEndDate: date
        });
        // propagate to parent date has changed
        onDateChange(date, Utils.END_DATE);
      }
      else if (allowBackwardRangeSelect) { // date is before selectedStartDate
        // Flip dates so that start is always before end.
        const endDate = selectedStartDate.clone();
        this.setState({
          selectedStartDate: date,
          selectedEndDate: endDate
        });
        onDateChange(date, Utils.START_DATE);
        onDateChange(endDate, Utils.END_DATE);
      }
    } else {
      this.setState({
        selectedStartDate: date,
        selectedEndDate: null
      });
      // propagate to parent date has changed
      onDateChange(date, Utils.START_DATE);
>>>>>>> rebase on master
    }
    return {minRangeDuration, maxRangeDuration};
  }

  handleOnPressDay = ({year, month, day}) => {
    const {
      selectedStartDate: prevSelectedStartDate,
      selectedEndDate: prevSelectedEndDate,
    } = this.state;

    const {
      allowRangeSelection,
      allowBackwardRangeSelect,
      enableDateChange,
      onDateChange,
    } = this.props;

    if (!enableDateChange) {
      return;
    }

    const date = moment({ year, month, day, hour: 12 });

    if (allowRangeSelection && prevSelectedStartDate && !prevSelectedEndDate) {
      if (date.isSameOrAfter(prevSelectedStartDate, 'day')) {
        const selectedStartDate = prevSelectedStartDate;
        const selectedEndDate = date;
        this.setState({
          selectedEndDate,
          renderMonthParams: this.createMonthProps({...this.state, selectedStartDate, selectedEndDate}),
        });
        // Sync end date with parent
        onDateChange(date, Utils.END_DATE);
      }
      else if (allowBackwardRangeSelect) { // date is before selectedStartDate
        // Flip dates so that start is always before end.
        const selectedEndDate = prevSelectedStartDate.clone();
        const selectedStartDate = date;
        this.setState({
          selectedStartDate,
          selectedEndDate,
          renderMonthParams: this.createMonthProps({...this.state, selectedStartDate, selectedEndDate}),
        }, () => {
          // Sync both start and end dates with parent *after* state update.
          onDateChange(this.state.selectedStartDate, Utils.START_DATE);
          onDateChange(this.state.selectedEndDate, Utils.END_DATE);
        });
      }
<<<<<<< HEAD
    } else {
      const syncEndDate = !!prevSelectedEndDate;
      const selectedStartDate = date;
      const selectedEndDate = null;
      this.setState({
        selectedStartDate,
        selectedEndDate,
        renderMonthParams: this.createMonthProps({...this.state, selectedStartDate, selectedEndDate}),
      }, () => {
        // Sync start date with parent *after* state update.
        onDateChange(this.state.selectedStartDate, Utils.START_DATE);
        if (syncEndDate) {
          // sync end date with parent - must be cleared if previously set.
          onDateChange(null, Utils.END_DATE);
        }
      });
=======
    } while (day.add(1, 'day').isSame(currentDate, 'month'));

    let customDatesStyles = [];
    if (customDatesStylesPriority === 'dayOfWeek') {
      customDatesStyles = [...customDayOfWeekStyles, ...propsCustomDatesStyles];
    }
    else {
      customDatesStyles = [...propsCustomDatesStyles, ...customDayOfWeekStyles];
>>>>>>> rebase on master
    }
  }

<<<<<<< HEAD
  handleOnPressPrevious = () => {
    const { currentMonth, currentYear } = this.state;
=======
    return { customDatesStyles };
  }

  handleOnPressPrevious() {
    let { currentMonth, currentYear } = this.state;
>>>>>>> rebase on master
    let previousMonth = currentMonth - 1;
    let year = currentYear;
    // if previousMonth is negative it means the current month is January,
    // so we have to go back to previous year and set the current month to December
    if (previousMonth < 0) {
      previousMonth = 11;
      year--;
    }
    const scrollFinisher = this.props.scrollable && this.scroller.scrollLeft;
    this.handleOnPressFinisher({year, month: previousMonth, scrollFinisher});
  }

  handleOnPressNext = () => {
    const { currentMonth, currentYear } = this.state;
    let nextMonth = currentMonth + 1;
    let year = currentYear;
    // if nextMonth is greater than 11 it means the current month is December,
    // so we have to go forward to the next year and set the current month to January
    if (nextMonth > 11) {
      nextMonth = 0;
      year++;
    }
    const scrollFinisher = this.props.scrollable && this.scroller.scrollRight;
    this.handleOnPressFinisher({year, month: nextMonth, scrollFinisher});
  }

  handleOnPressFinisher = ({year, month, scrollFinisher}) => {
    if (scrollFinisher) {
      scrollFinisher();
    }
    else {
      const currentMonth = parseInt(month);
      const currentYear = parseInt(year);
      const renderMonthParams = {...this.state.renderMonthParams, month, year};
      this.setState({ currentMonth, currentYear, renderMonthParams });
    }
<<<<<<< HEAD
    const currentMonthYear = moment({year, month, hour: 12});
    this.props.onMonthChange && this.props.onMonthChange(currentMonthYear);
  }
=======
    catch (error) {
      console.log('dayOfWeekStyles error');
    }
>>>>>>> rebase on master

  handleOnPressYear = () => {
    this.setState({
      currentView: 'years'
    });
  }

  handleOnPressMonth = () => {
    this.setState({
      currentView: 'months'
    });
  }

<<<<<<< HEAD
  handleOnSelectMonthYear = ({month, year}) => {
    const currentYear = year;
    const currentMonth = month;
    const scrollableState = !this.props.scrollable ? {} :
      {
        renderMonthParams: {...this.state.renderMonthParams, month, year},
        ...this.createMonths(this.props, {currentYear, currentMonth}),
      };

    this.setState({
      currentYear,
      currentMonth,
      currentView: 'days',
      ...scrollableState,
    });
=======
  handleOnPressYear() {
    this.setState({
      currentView: 'years'
    });
  }

  handleOnPressMonth() {
    this.setState({
      currentView: 'months'
    });
  }

  handleOnSelectMonth(month) {
    if (!this.props.enableDateChange) {
      return;
    }
    this.setState({
      currentMonth: parseInt(month),
      currentView: 'days'
    });
  }

  handleOnSelectYear(year) {
    if (!this.props.enableDateChange) {
      return;
    }

    // Guard against navigating to months beyond min/max dates.
    let currentMonth = this.state.currentMonth;
    if (this.state.maxDate) {
      const maxDateMonth = this.state.maxDate.month();
      const maxDateYear = this.state.maxDate.year();
      if (year === maxDateYear && currentMonth > maxDateMonth) {
        currentMonth = maxDateMonth;
      }
    }
    if (this.state.minDate) {
      const minDateMonth = this.state.minDate.month();
      const minDateYear = this.state.minDate.year();
      if (year === minDateYear && currentMonth < minDateMonth) {
        currentMonth = minDateMonth;
      }
    }

    this.setState({
      currentYear: parseInt(year),
      currentMonth,
      currentView: 'days'
    });
  }

  onSwipe(gestureName) {
    if (typeof this.props.onSwipe === 'function') {
      this.props.onSwipe(gestureName);
      return;
    }
    switch (gestureName) {
    case SWIPE_LEFT:
      this.handleOnPressNext();
      break;
    case SWIPE_RIGHT:
      this.handleOnPressPrevious();
      break;
    }
>>>>>>> rebase on master
  }

  resetSelections = () => {
    this.setState({
      selectedStartDate: null,
      selectedEndDate: null
    });
  }

  createMonthProps = state => {
    return {
      onPressDay: this.handleOnPressDay,
      month: state.currentMonth,
      year: state.currentYear,
      styles: state.styles,
      disabledDates: state.disabledDates,
      minDate: state.minDate,
      maxDate: state.maxDate,
      minRangeDuration: state.minRangeDuration,
      maxRangeDuration: state.maxRangeDuration,
      selectedStartDate: state.selectedStartDate,
      selectedEndDate: state.selectedEndDate,
      enableDateChange: this.props.enableDateChange,
      startFromMonday: this.props.startFromMonday,
      allowRangeSelection: this.props.allowRangeSelection,
      allowBackwardRangeSelect: this.props.allowBackwardRangeSelect,
      showDayStragglers: this.props.showDayStragglers,
      disabledDatesTextStyle: this.props.disabledDatesTextStyle,
      textStyle: this.props.textStyle,
      todayTextStyle: this.props.todayTextStyle,
      selectedDayStyle: this.props.selectedDayStyle,
      selectedRangeStartStyle: this.props.selectedRangeStartStyle,
      selectedRangeStyle: this.props.selectedRangeStyle,
      selectedRangeEndStyle: this.props.selectedRangeEndStyle,
      customDatesStyles: this.props.customDatesStyles,
    };
  }

  
  createMonths = (props, {currentMonth, currentYear}) => {
    if (!props.scrollable) {
      return [];
    }

    const {
      initialDate,
      minDate,
      maxDate,
      restrictMonthNavigation,
    } = props;

    let monthsList = [];
    let numMonths = this.numMonthsScroll;
    let initialScrollerIndex = 0;

    // Center start month in scroller.  Visible month is either the initialDate
    // prop, or the current month & year that has been selected.
    let _initialDate = Number.isInteger(currentMonth) && Number.isInteger(currentYear) &&
        moment({ year: currentYear, month: currentMonth, hour: 12 });
    _initialDate = _initialDate || initialDate;
    let firstScrollerMonth = _initialDate.clone().subtract(numMonths/2, 'months');
    if (minDate && restrictMonthNavigation && firstScrollerMonth.isBefore(minDate, 'month')) {
      firstScrollerMonth = moment(minDate);
    }

    for (let i = 0; i < numMonths; i++) {
      let month = firstScrollerMonth.clone().add(i, 'months');
      if (maxDate && restrictMonthNavigation && month.isAfter(maxDate, 'month')) {
        break;
      }
      if (month.isSame(_initialDate, 'month')) {
        initialScrollerIndex = i;
      }
      monthsList.push(month);
    }

    return {
      monthsList,
      initialScrollerIndex,
    };
  }

  renderMonth(props) {
    return (
      <DaysGridView {...props} />
    );
  }

  render() {
    const {
      currentView,
      currentMonth,
      currentYear,
      minDate,
      maxDate,
<<<<<<< HEAD
=======
      minRangeDuration,
      maxRangeDuration,
      selectedStartDate,
      selectedEndDate,
      disabledDates,
>>>>>>> rebase on master
      styles,
      monthsList,
      renderMonthParams,
      initialScrollerIndex,
    } = this.state;

    const {
<<<<<<< HEAD
=======
      allowRangeSelection,
      allowBackwardRangeSelect,
>>>>>>> rebase on master
      startFromMonday,
      initialDate,
      weekdays,
      months,
      previousComponent,
      nextComponent,
      previousTitle,
      nextTitle,
      previousTitleStyle,
      nextTitleStyle,
      textStyle,
<<<<<<< HEAD
      restrictMonthNavigation,
      headingLevel,
      dayLabelsWrapper,
      customDayHeaderStyles,
      selectMonthTitle,
      selectYearTitle,
      monthYearHeaderWrapperStyle,
      onMonthChange,
      scrollable,
      horizontal,
    } = this.props;

    let content;
    switch (currentView) {
=======
      todayTextStyle,
      selectedDayStyle,
      selectedRangeStartStyle,
      selectedRangeStyle,
      selectedRangeEndStyle,
      disabledDatesTextStyle,
      swipeConfig,
      enableDateChange,
      restrictMonthNavigation,
      headingLevel,
      dayLabelsWrapper,
      dayOfWeekStyles,
      selectMonthTitle,
      selectYearTitle,
    } = this.props;

    let content;
    switch (this.state.currentView) {
>>>>>>> rebase on master
    case 'months':
      content = (
        <MonthSelector
          styles={styles}
          textStyle={textStyle}
          title={selectMonthTitle}
          currentYear={currentYear}
          months={months}
          minDate={minDate}
          maxDate={maxDate}
<<<<<<< HEAD
          onSelectMonth={this.handleOnSelectMonthYear}
          headingLevel={headingLevel}
=======
          onSelectMonth={this.handleOnSelectMonth}
          headingLevel={headingLevel}
          disabledDates={disabledDates}
>>>>>>> rebase on master
        />
      );
      break;
    case 'years':
      content = (
        <YearSelector
          styles={styles}
          textStyle={textStyle}
          title={selectYearTitle}
          initialDate={moment(initialDate)}
<<<<<<< HEAD
          currentMonth={currentMonth}
=======
>>>>>>> rebase on master
          currentYear={currentYear}
          minDate={minDate}
          maxDate={maxDate}
          restrictNavigation={restrictMonthNavigation}
          previousComponent={previousComponent}
          nextComponent={nextComponent}
          previousTitle={previousTitle}
          nextTitle={nextTitle}
          previousTitleStyle={previousTitleStyle}
          nextTitleStyle={nextTitleStyle}
<<<<<<< HEAD
          onSelectYear={this.handleOnSelectMonthYear}
          headingLevel={headingLevel}
=======
          onSelectYear={this.handleOnSelectYear}
          headingLevel={headingLevel}
          disabledDates={disabledDates}
>>>>>>> rebase on master
        />
      );
      break;
    default:
      content = (
<<<<<<< HEAD
        <View styles={styles.calendar}>
=======
        <View>
>>>>>>> rebase on master
          <HeaderControls
            styles={styles}
            currentMonth={currentMonth}
            currentYear={currentYear}
            initialDate={moment(initialDate)}
            onPressPrevious={this.handleOnPressPrevious}
            onPressNext={this.handleOnPressNext}
            onPressMonth={this.handleOnPressMonth}
            onPressYear={this.handleOnPressYear}
            months={months}
            previousComponent={previousComponent}
            nextComponent={nextComponent}
            previousTitle={previousTitle}
            nextTitle={nextTitle}
            previousTitleStyle={previousTitleStyle}
            nextTitleStyle={nextTitleStyle}
            textStyle={textStyle}
            restrictMonthNavigation={restrictMonthNavigation}
            minDate={minDate}
            maxDate={maxDate}
            headingLevel={headingLevel}
<<<<<<< HEAD
            monthYearHeaderWrapperStyle={monthYearHeaderWrapperStyle}
=======
>>>>>>> rebase on master
          />
          <Weekdays
            styles={styles}
            startFromMonday={startFromMonday}
            currentMonth={currentMonth}
            currentYear={currentYear}
            weekdays={weekdays}
            textStyle={textStyle}
            dayLabelsWrapper={dayLabelsWrapper}
<<<<<<< HEAD
            customDayHeaderStyles={customDayHeaderStyles}
=======
            dayOfWeekStyles={dayOfWeekStyles}
          />
          <DaysGridView
            enableDateChange={enableDateChange}
            month={currentMonth}
            year={currentYear}
            styles={styles}
            onPressDay={this.handleOnPressDay}
            disabledDates={disabledDates}
            disabledDatesTextStyle={disabledDatesTextStyle}
            minRangeDuration={minRangeDuration}
            maxRangeDuration={maxRangeDuration}
            startFromMonday={startFromMonday}
            allowRangeSelection={allowRangeSelection}
            allowBackwardRangeSelect={allowBackwardRangeSelect}
            selectedStartDate={selectedStartDate}
            selectedEndDate={selectedEndDate}
            minDate={minDate}
            maxDate={maxDate}
            textStyle={textStyle}
            todayTextStyle={todayTextStyle}
            selectedDayStyle={selectedDayStyle}
            selectedRangeStartStyle={selectedRangeStartStyle}
            selectedRangeStyle={selectedRangeStyle}
            selectedRangeEndStyle={selectedRangeEndStyle}
            customDatesStyles={customDatesStyles}
>>>>>>> rebase on master
          />
          { scrollable ?
            <Scroller
              ref={scroller => this.scroller = scroller}
              data={monthsList}
              renderMonth={this.renderMonth}
              renderMonthParams={renderMonthParams}
              maxSimultaneousMonths={this.numMonthsScroll}
              initialRenderIndex={initialScrollerIndex}
              minDate={minDate}
              maxDate={maxDate}
              restrictMonthNavigation={restrictMonthNavigation}
              updateMonthYear={this.updateMonthYear}
              onMonthChange={onMonthChange}
              horizontal={horizontal}
            />
            :
            this.renderMonth(renderMonthParams)
          }
        </View>
      );
    }

<<<<<<< HEAD
    return content;
=======
    return (
      <Swiper
        onSwipe={direction => this.props.enableSwipe && this.onSwipe(direction)}
        config={{ ..._swipeConfig, ...swipeConfig }}
      >
        <View styles={styles.calendar}>
          { content }
        </View>
      </Swiper>
    );
>>>>>>> rebase on master
  }
}
