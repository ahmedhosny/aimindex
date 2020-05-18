import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Glamorous from 'glamorous';
import Typography from '@material-ui/core/Typography';

/**
 * TabContainer class
 * @extends Component
 */
class TabContainer extends Component {
  /**
   * Render the tab
   * @return {ReactElement} Tab
   */
  render() {
    const {children} = this.props;
    const GTypography = Glamorous(Typography)({
      padding: 8 * 3,
      marginTop: '110px !important',
    });
    return <GTypography component="div">{children}</GTypography>;
  }
}
TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
export default TabContainer;
