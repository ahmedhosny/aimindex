import React, {Component} from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import Card, {CardActions, CardContent, CardMedia} from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const GDiv = glamorous.div({
  marginBottom: 20,
});

/**
 * The component
 * @type {Object}
 */
class Slide extends Component {
  /**
   * Render
   * @return {ReactElement}
   */
  render() {
    return (
      <GDiv>
        <Card>
          <CardMedia image="dummy">{this.props.plot}</CardMedia>
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              {this.props.title}
            </Typography>
            <div>{this.props.text}</div>
          </CardContent>
        </Card>
      </GDiv>
    );
  }
}
Slide.propTypes = {
  plot: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.string.isRequired,
  ]),
  title: PropTypes.string.isRequired,
  text: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.string.isRequired,
  ]),
};
Slide.defaultProps = {
  plot: '',
};
export default Slide;

// <CardActions>
//   <Button size="small" color="primary">
//     Share
//   </Button>
//   <Button size="small" color="primary">
//     Learn More
//   </Button>
// </CardActions>
