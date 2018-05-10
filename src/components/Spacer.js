import React, {Component} from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import theme from '../theme.js';

/**
 * The component
 * @type {Object}
 */
class Spacer extends Component {
  /**
   * Render
   * @return {ReactElement}
   */
  render() {
    const {location, size} = this.props;
    const GDiv = glamorous.div({
      height: size,
      width: '100%',
      backgroundColor: location === 'inside' ? theme.background : '#ff0000',
      marginTop: 5,
      marginBottom: 5,
    });
    return <GDiv />;
  }
}
Spacer.propTypes = {
  location: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};
Spacer.defaultProps = {
  location: 'inside',
};
export default Spacer;
