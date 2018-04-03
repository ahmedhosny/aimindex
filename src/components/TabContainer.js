import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';

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
    return (
      <Typography component="div" style={{padding: 8 * 3}}>
        {children}
      </Typography>
    );
  }
}
TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
export default TabContainer;
