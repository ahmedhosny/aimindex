import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import Spacer from './Spacer';

/**
 * The component
 * @type {Object}
 */
class Paragraph extends Component {
  /**
   * Render
   * @return {ReactElement}
   */
  render() {
    const {title, content} = this.props;
    return (
      <div>
        <Spacer size={20} />
        <Typography variant="headline">{title}</Typography>
        <Typography variant="subheading">{content}</Typography>
      </div>
    );
  }
}
Paragraph.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.object.isRequired,
  ]),
};
Paragraph.defaultProps = {
  title: '',
};
export default Paragraph;
