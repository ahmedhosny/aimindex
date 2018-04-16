import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Slide from '../components/Slide';
import Pie from '../components/Pie';
import Histo from '../components/Histo';
import Choro from '../components/Choro';
import Heat from '../components/Heat';
import Loading from '../components/Loading';

/**
 * The component
 * @type {Object}
 */
class Stats extends Component {
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
      <Grid container spacing={24}>
        <Grid item xs={12} sm={12} md={6}>
          <Slide title={data.count.toString()} text={'manuscripts analyzed.'} />
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
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
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
          <Slide plot={<Choro data={data.countries} />} title={''} text={''} />
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
            text={'Domains vs Tasks. Some studies explore more than one task.'}
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
      </Grid>
    ) : (
      <Loading />
    );
  }
}
Stats.propTypes = {
  data: PropTypes.object.isRequired,
};
export default Stats;
