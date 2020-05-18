import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Slide from '../components/Slide';
import Pie from '../components/Pie';
import Loading from '../components/Loading';
import StackedBar from '../components/StackedBar';
import Lorem from 'react-lorem-component';
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
    const dataKeys = ['used public data', 'data private', 'data made public'];
    const codeKeys = ['code private', 'code made public'];
    return ready ? (
      <Grid container spacing={24}>
        {/* DATA */}
        <Grid item xs={12} sm={12} md={12}>
          <Slide
            title={'data'}
            text={<Lorem seed={Math.random()} count={1} />}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Slide
            plot={<Pie data={data.dataSharing} />}
            title={'Data sharing'}
            text={<Lorem seed={Math.random()} count={1} />}
          />
          <Slide
            plot={
              <StackedBar
                data={data.countries_dataSharing}
                keys={dataKeys}
                xAxis={'countries'}
                yAxis={'data sharing'}
              />
            }
            title={'countries vs data sharing'}
            text={<Lorem seed={Math.random()} count={1} />}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Slide
            plot={
              <StackedBar
                data={data.impactFactors_dataSharing}
                keys={dataKeys}
                xAxis={'impactFactors'}
                yAxis={'data sharing'}
                float={true}
                rotate={false}
              />
            }
            title={'impactFactors vs data sharing'}
            text={<Lorem seed={Math.random()} count={1} />}
          />
          <Slide
            plot={
              <StackedBar
                data={data.jourConf_dataSharing}
                keys={dataKeys}
                xAxis={'publishing medium'}
                yAxis={'data sharing'}
                rotate={false}
              />
            }
            title={'publishing medium vs data sharing'}
            text={<Lorem seed={Math.random()} count={1} />}
          />
          <Slide
            plot={
              <StackedBar
                data={data.publicPrivate_dataSharing}
                keys={dataKeys}
                xAxis={'Access'}
                yAxis={'data sharing'}
                rotate={false}
              />
            }
            title={'Access vs data sharing'}
            text={<Lorem seed={Math.random()} count={1} />}
          />
        </Grid>
        {/* CODE */}
        <Grid item xs={12} sm={12} md={12}>
          <Slide
            title={'code'}
            text={<Lorem seed={Math.random()} count={1} />}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
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
                keys={codeKeys}
                xAxis={'countries'}
                yAxis={'code sharing'}
              />
            }
            title={'countries vs code sharing'}
            text={<Lorem seed={Math.random()} count={1} />}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Slide
            plot={
              <StackedBar
                data={data.impactFactors_codeSharing}
                keys={codeKeys}
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
            plot={
              <StackedBar
                data={data.jourConf_codeSharing}
                keys={codeKeys}
                xAxis={'publishing medium'}
                yAxis={'code sharing'}
                rotate={false}
              />
            }
            title={'publishing medium vs code sharing'}
            text={<Lorem seed={Math.random()} count={1} />}
          />
          <Slide
            plot={
              <StackedBar
                data={data.publicPrivate_codeSharing}
                keys={codeKeys}
                xAxis={'Access'}
                yAxis={'code sharing'}
                rotate={false}
              />
            }
            title={'Access vs code sharing'}
            text={<Lorem seed={Math.random()} count={1} />}
          />
        </Grid>
        {/* METHODS */}
        <Grid item xs={12} sm={12} md={12}>
          <Slide
            title={'methods'}
            text={<Lorem seed={Math.random()} count={1} />}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Slide
            plot={<Pie data={data.transferLearning} />}
            title={'Transfer Learning'}
            text={
              'Transfer learning, or using pre-trained networks on other data\
              sets, is often utilized when dealing with scarce data.'
            }
          />
          <Slide
            plot={<Pie data={data.crossValidation} />}
            title={'Cross validation'}
            text={<Lorem seed={Math.random()} count={1} />}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
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
            text={<Lorem seed={Math.random()} count={1} />}
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
            text={<Lorem seed={Math.random()} count={1} />}
          />
          <Slide
            plot={<Pie data={data.codeBasis} />}
            title={'Code basis'}
            text={<div>Code basis. Links to these: {codeBasisLinks}</div>}
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
