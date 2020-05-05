import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';

export default function Controls(props) {
  const {
    styles,
    textStyles,
    label,
    component,
    onPressControl,
    disabled,
  } = props;

  return (
    <TouchableOpacity
      onPress={() => onPressControl()}
<<<<<<< HEAD
      style={styles}
=======
      style={[styles]}
>>>>>>> rebase on master
      disabled={disabled}
      hitSlop={{ top: 20, bottom: 20, left: 40, right: 40 }}
    >
<<<<<<< HEAD
      <View style={{opacity: disabled ? 0 : 1}}>
        { component ||
          <Text style={[textStyles]}>
            { label }
          </Text>
        }
      </View>
=======
      { component ?
        ( disabled ? null : component )
        :
        <Text style={[textStyles]}>
          { disabled ? null : label }
        </Text>
      }
>>>>>>> rebase on master
    </TouchableOpacity>
  );
}

Controls.propTypes = {
  styles: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  label: PropTypes.string,
  onPressControl: PropTypes.func.isRequired,
};
