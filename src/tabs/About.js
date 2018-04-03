import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

/**
 * The component
 * @type {Object}
 */
class About extends Component {
  /**
   * Render
   * @return {ReactElement}
   */
  render() {
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item md={3} />
          <Grid item xs={12} sm={12} md={6}>
            <Typography gutterBottom variant="display1" component="h5">
              About
            </Typography>
            <Typography variant="body1" color="primary">
              Minim duis incididunt est cillum est ex occaecat consectetur. Qui
              sint ut et qui nisi cupidatat. Reprehenderit nostrud proident
              officia exercitation anim et pariatur ex.
            </Typography>
            <ul>
              <li>
                Nisi qui nisi duis commodo duis reprehenderit consequat velit
                aliquip.
              </li>
              <li>
                Dolor consectetur incididunt in ipsum laborum non et irure
                pariatur excepteur anim occaecat officia sint.
              </li>
              <li>Lorem labore proident officia excepteur do.</li>
            </ul>
          </Grid>
          <Grid item md={3} />
        </Grid>
      </div>
    );
  }
}
About.propTypes = {};
export default About;
