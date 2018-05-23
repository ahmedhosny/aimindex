import React, {Component} from 'react';
import glamorous from 'glamorous';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import logo from '../logo.svg';
import GithubCircleIcon from 'mdi-react/GithubCircleIcon';
import theme from '../theme.js';

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
      backgroundColor: theme.lightTeal,
    });
    const GDiv = glamorous.div({
      position: 'absolute',
      right: 20,
    });
    const GImg = glamorous.img({
      paddingRight: 10,
      width: 40,
    });
    return (
      <GHeader>
        <Toolbar>
          <GImg src={logo} alt="logo" />
          <Typography variant="title" color="inherit">
            Medical Artificial Intelligence Index
          </Typography>
        </Toolbar>
      </GHeader>
    );
  }
}
Header.propTypes = {};
export default Header;

// <GDiv>
//   <IconButton aria-haspopup="false" color="inherit">
//     <GithubCircleIcon color={'#fff'} size={32} />
//   </IconButton>
// </GDiv>
