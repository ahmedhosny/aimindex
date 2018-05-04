import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Slide from '../components/Slide';
import Pie from '../components/Pie';
import Histo2d from '../components/Histo2d';

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
    const codeBasisLinks = data.codeBasisLinks.map((obj, idx) => {
      return (
        <div key={idx}>
          <a href={obj.link} target="_blank">
            {obj.name}
          </a>
          <br />
        </div>
      );
    });
    return (
      <Grid container spacing={24}>
        <Grid item xs={12} sm={12} md={6}>
          <Slide
            plot={<Pie data={data.publicPrivate} />}
            title={'Accessibility'}
            text={
              'Paywall vs open-access. Open-access includes journals with\
         preprints publiched on arxiv.'
            }
          />
          <Slide
            plot={<Pie data={data.codeSharing} />}
            title={'Code implementation'}
            text={'Code implementations made available vs no code available'}
          />
          <Slide
            plot={<Pie data={data.transferLearning} />}
            title={'Transfer Learning'}
            text={
              'Transfer learning, or using pre-trained networks on other data\
              sets, is often utilized when dealing with scarce data.'
            }
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Slide
            plot={<Pie data={data.dataSharing} />}
            title={'Data sharing'}
            text={'Data sharing.'}
          />
          <Slide
            plot={<Pie data={data.codeBasis} />}
            title={'Code basis'}
            text={<div>Code basis. Links to these: {codeBasisLinks}</div>}
          />
          <Slide
            plot={<Pie data={data.crossValidation} />}
            title={'Cross validation'}
            text={'Cross validation within datasets.'}
          />
          <Slide
            plot={
              <Histo2d
                xData={data.countries_codeSharing.x}
                yData={data.countries_codeSharing.y}
                xAxis={'countries'}
                yAxis={'code sharing'}
              />
            }
            title={'countries vs code sharing'}
            text={'countries vs code sharing'}
          />
        </Grid>
      </Grid>
    );
  }
}
Reproducibility.propTypes = {
  data: PropTypes.object.isRequired,
};
export default Reproducibility;
