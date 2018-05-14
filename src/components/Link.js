import React, {Component} from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

/**
 * The component
 * @type {Object}
 */
class Link extends Component {
  /**
   * Render
   * @return {ReactElement}
   */
  render() {
    const {content, url, space} = this.props;
    const GDiv = glamorous.div({
      display: 'inline',
    });
    return (
      <GDiv>
        {' '}
        <a href={url} target="_blank">
          {content}
        </a>
        {space === true ? ' ' : null}
      </GDiv>
    );
  }
}
Link.propTypes = {
  content: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  space: PropTypes.bool.isRequired,
};
Link.defaultProps = {
  space: true,
};
export default Link;
