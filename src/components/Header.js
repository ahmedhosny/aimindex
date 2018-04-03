import React, {Component} from 'react';
import glamorous from 'glamorous';

/**
 * The component
 * @type {Object}
 */
class Header extends Component {
  /**
   * Render
   * @return {ReactElement}
   */
  render() {
    const GHeader = glamorous.header({
      backgroundColor: '#009688',
      height: 90,
      padding: 20,
      color: 'white',
      fontWeight: '300 !mportant',
    });
    const GH1 = glamorous.h1({
      fontWeight: '400',
      marginBottom: 0,
    });
    const GH3 = glamorous.h3({
      fontWeight: '400',
      marginTop: 0,
    });
    return (
      <GHeader>
        <GH1>The AIM Index </GH1>
        <GH3>Tracking AI Research in Medicine</GH3>
      </GHeader>
    );
  }
}
Header.propTypes = {};
export default Header;
