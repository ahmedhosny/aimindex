import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Slide from '../components/Slide';
import Pie from '../components/Pie';
/**
 * The component
 * @type {Object}
 */
class Reproducibility extends Component {
  /**
   * Render
   * @return {ReactElement}
   */
  render() {
    const {data} = this.props;
    return (
      <Grid container spacing={24}>
        <Grid item md={3} />
        <Grid item xs={12} sm={12} md={6}>
          <Slide
            plot={<Pie data={data.publicPrivate} />}
            title={'Accessibility'}
            text={
              'Paywall vs open-access. Open-access includes journals with\
         preprints publiched on arxiv.'
            }
          />
        </Grid>
        <Grid item md={3} />
      </Grid>
    );
  }
}
Reproducibility.propTypes = {
  data: PropTypes.object.isRequired,
};
export default Reproducibility;
