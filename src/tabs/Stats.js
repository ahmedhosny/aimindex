import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Slide from '../components/Slide';
import Pie from '../components/Pie';
import Histo from '../components/Histo';
import Choro from '../components/Choro';
import Heat from '../components/Heat';

/**
 * The component
 * @type {Object}
 */
class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
    };
  }

  componentWillMount() {
    // axios.get(url).then((res) => {
    //   const data = formatData(res.data);
    //   this.setState({data: data , ready: true});
    // });
    console.log(' stats willMount');
    setTimeout(
      function() {
        this.setState({ready: true});
      }.bind(this),
      1000
    );
  }

  /**
   * Render
   * @return {ReactElement}
   */
  render() {
    const {data} = this.props;
    const {ready} = this.state;
    return ready ? (
      <div>
        <Grid container spacing={24}>
          <Grid item md={3} />
          <Grid item xs={12} sm={12} md={6}>
            <Slide
              title={data.count.toString()}
              text={'manuscripts analyzed.'}
            />
            <Slide
              plot={
                <Histo data={data.years} xAxis={'Years'} yAxis={'Frequency'} />
              }
              title={'Years'}
              text={'Publication years.'}
            />
            <Slide
              plot={<Pie data={data.sources} />}
              title={'Sources'}
              text={
                'Manuscript retrieval sources. Only peer-reviewed studies were\
                 included.'
              }
            />
            <Slide
              plot={<Pie data={data.tasks} />}
              title={'Tasks'}
              text={
                'Tasks preformed. Some studies investigate more than one task.'
              }
            />
            <Slide
              plot={<Pie data={data.domains} />}
              title={'Domains'}
              text={'Medical application areas.'}
            />
            <Slide
              plot={<Pie data={data.architectures} />}
              title={'Architectures'}
              text={
                'Deep learning architectures utilized. Some studies explore\
                 more than one architecture.'
              }
            />
            <Slide
              plot={<Pie data={data.anatomy} />}
              title={'Anatomy'}
              text={'Distribution across anatomy.'}
            />
            <Slide
              plot={<Pie data={data.types} />}
              title={'Types'}
              text={'Data types.'}
            />
            <Slide
              plot={<Pie data={data.jourConf} useCountBy={false} />}
              title={'Journals & Conferences'}
              text={'Journals & Conferences.'}
            />
            <Slide
              plot={<Pie data={data.publicPrivate} />}
              title={'Accessibility'}
              text={
                'Paywall vs open-access. Open-access includes journals with\
                 preprints publiched on arxiv.'
              }
            />
            <Slide
              plot={
                <Histo
                  data={data.impactFactors}
                  xAxis={'Impact factors'}
                  yAxis={'Frequency'}
                />
              }
              title={'Impact Factors'}
              text={'Distribution of impact factors across journals.'}
            />
            <Slide
              plot={<Choro data={data.countries} />}
              title={''}
              text={''}
            />
            <Slide
              plot={
                <Heat
                  data={data.domains_tasks}
                  xLabels={data.domains}
                  yLabels={data.tasks}
                  xAxis={'Domains'}
                  yAxis={'Tasks'}
                />
              }
              title={'Domains vs Tasks'}
              text={
                'Domains vs Tasks. Some studies explore more than one task.'
              }
            />
            <Slide
              plot={
                <Heat
                  data={data.domains_architectures}
                  xLabels={data.domains}
                  yLabels={data.architectures}
                  xAxis={'Domains'}
                  yAxis={'Architectures'}
                />
              }
              title={'Domains vs Architectures'}
              text={
                'Domains vs Architectures. Some studies explore more than one\
                 Architecture.'
              }
            />
            <Slide
              plot={
                <Heat
                  data={data.methods_dataTypes}
                  xLabels={data.architectures}
                  yLabels={data.types}
                  xAxis={'Architectures'}
                  yAxis={'Data types'}
                />
              }
              title={'Architectures vs data types'}
              text={'Architectures vs data types.'}
            />
          </Grid>
          <Grid item md={3} />
        </Grid>
      </div>
    ) : (
      <div> loading ... </div>
    );
  }
}
Stats.propTypes = {
  data: PropTypes.object.isRequired,
};
export default Stats;

/**
 * @todo list of missing plots
 */
// countries hk vs china
// key for methods(architectures)
// body figure for anatomy
// drawCloud(data.abstracts); with tf-idf
// top five countries by publication, then box plot for the citations or impact
// Factors
// architectures vs tasks (not direct one to one correlation)
