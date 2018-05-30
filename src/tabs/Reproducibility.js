import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Slide from '../components/Slide';
import Pie from '../components/Pie';
import Loading from '../components/Loading';
import StackedBar from '../components/StackedBar';

/**
 * The component
 * @type {Object}
 */
class Reproducibility extends Component {
  /**
   * Constructor
   * @param  {object} props data
   */
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
    };
  }

  /**
   * componentWillMount
   */
  componentWillMount() {
    setTimeout(
      function() {
        this.setState({ready: true});
      }.bind(this),
      300
    );
  }
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
    const {ready} = this.state;
    return ready ? (
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
              <StackedBar
                data={data.countries_codeSharing}
                keys={['code private', 'code made public']}
                xAxis={'countries'}
                yAxis={'code sharing'}
              />
            }
            title={'countries vs code sharing'}
            text={'countries vs code sharing'}
          />
          <Slide
            plot={
              <StackedBar
                data={data.impactFactors_codeSharing}
                keys={['code private', 'code made public']}
                xAxis={'impact factors'}
                yAxis={'code sharing'}
                float={true}
                rotate={false}
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
              <StackedBar
                data={data.domains_transferLearning}
                keys={['end-to-end training', 'transfer learning']}
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
              <StackedBar
                data={data.countries_dataSharing}
                keys={['used public data', 'data private', 'data made public']}
                xAxis={'countries'}
                yAxis={'data sharing'}
              />
            }
            title={'countries vs data sharing'}
            text={'countries vs data sharing'}
          />

          <Slide
            plot={
              <StackedBar
                data={data.impactFactors_dataSharing}
                keys={['used public data', 'data private', 'data made public']}
                xAxis={'impactFactors'}
                yAxis={'data sharing'}
                float={true}
                rotate={false}
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
              <StackedBar
                data={data.domains_crossValidation}
                keys={['multiple datasets used', 'cross validation used']}
                xAxis={'domains'}
                yAxis={'cross validation'}
              />
            }
            title={'domains vs cross validation'}
            text={'domains vs cross validation'}
          />
        </Grid>
      </Grid>
    ) : (
      <Loading />
    );
  }
}
Reproducibility.propTypes = {
  data: PropTypes.object.isRequired,
};
export default Reproducibility;
