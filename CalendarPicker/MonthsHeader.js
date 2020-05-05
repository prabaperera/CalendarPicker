import React from 'react';
import {
  View,
  Text,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';

export default function MonthsHeader(props) {
  const {
    styles,
    textStyle,
    headingLevel,
    title,
  } = props;

  const accessibilityProps = { accessibilityRole: 'header' };
  if (Platform.OS === 'web') {
    accessibilityProps['aria-level'] = headingLevel;
  }

  return (
    <View style={styles.headerWrapper}>
<<<<<<< HEAD
      <Text style={[styles.monthsHeaderText, textStyle]}>
        { title }
      </Text>
=======
      <View>
        <Text style={[styles.monthsHeaderText, textStyle]}>
          { title }
        </Text>
      </View>
>>>>>>> rebase on master
    </View>
  );
}

MonthsHeader.propTypes = {
  styles: PropTypes.shape(),
  textStyle: Text.propTypes.style,
  title: PropTypes.string
};
