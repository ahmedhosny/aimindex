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
            title={'Code sharing'}
            text={
              'Code sharing. Implementations made available vs no code available'
            }
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
          <Slide
            plot={
              <Histo2d
                xData={data.impactFactors_codeSharing.x}
                yData={data.impactFactors_codeSharing.y}
                xAxis={'impact factors'}
                yAxis={'code sharing'}
                autobinx={false}
              />
            }
            title={'impact factors vs code sharing'}
            text={'impact factors vs code sharing - journals only.'}
          />
          <Slide
            plot={<Pie data={data.transferLearning} />}
            title={'Transfer Learning'}
            text={
              'Transfer learning, or using pre-trained networks on other data\
              sets, is often utilized when dealing with scarce data.'
            }
          />
          <Slide
            plot={
              <Histo2d
                xData={data.domains_transferLearning.x}
                yData={data.domains_transferLearning.y}
                xAxis={'domains'}
                yAxis={'transfer learning'}
              />
            }
            title={'domains vs transfer learning'}
            text={'domains vs transfer learning'}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Slide
            plot={<Pie data={data.dataSharing} />}
            title={'Data sharing'}
            text={'Data sharing.'}
          />
          <Slide
            plot={
              <Histo2d
                xData={data.countries_dataSharing.x}
                yData={data.countries_dataSharing.y}
                xAxis={'countries'}
                yAxis={'data sharing'}
              />
            }
            title={'countries vs data sharing'}
            text={'countries vs data sharing'}
          />
          <Slide
            plot={
              <Histo2d
                xData={data.impactFactors_dataSharing.x}
                yData={data.impactFactors_dataSharing.y}
                xAxis={'impactFactors'}
                yAxis={'data sharing'}
                autobinx={false}
              />
            }
            title={'impactFactors vs data sharing'}
            text={'impactFactors vs data sharing'}
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
                xData={data.domains_crossValidation.x}
                yData={data.domains_crossValidation.y}
                xAxis={'domains'}
                yAxis={'cross validation'}
              />
            }
            title={'domains vs cross validation'}
            text={'domains vs cross validation'}
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
