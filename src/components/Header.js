import React, {Component} from 'react';
import glamorous from 'glamorous';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
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
    return (
      <GHeader>
        <Toolbar>
          <Typography variant="title" color="inherit">
            Medical Artificial Intelligence Index
          </Typography>
          <GDiv>
            <IconButton aria-haspopup="false" color="inherit">
              <GithubCircleIcon color={'#fff'} size={32} />
            </IconButton>
          </GDiv>
        </Toolbar>
      </GHeader>
    );
  }
}
Header.propTypes = {};
export default Header;
