import React, {Component} from 'react';
import Glamorous from 'glamorous';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Tabs, {Tab} from 'material-ui/Tabs';
import TabContainer from './TabContainer';
//
import About from '../tabs/About';
import Stats from '../tabs/Stats';
import Reproducibility from '../tabs/Reproducibility';
import Data from '../tabs/Data';
import Contribute from '../tabs/Contribute';

/**
 * Taba
 * @extends Component
 */
class Taba extends Component {
  /**
   * @param  {Props} props
   */
  constructor(props) {
    super(props);
    this.state = {
      value: 3,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  /**
   * handles tab change
   * @param  {[type]} event [description]
   * @param  {[type]} value [description]
   */
  handleChange = (event, value) => {
    this.setState({value});
  };
  /**
   * [render description]
   * @return {[type]} [description]
   */
  render() {
    const {value} = this.state;
    const {data, raw} = this.props;
    const GAppBar = Glamorous(AppBar)({
      backgroundColor: '#00796b !important',
      fontSize: '20px !important',
    });
    return (
      <div>
        <GAppBar position="static">
          <Tabs
            indicatorColor={'#ffab40'}
            centered={false}
            fullWidth={true}
            value={value}
            onChange={this.handleChange}
          >
            <Tab label="about" href="#" />
            <Tab label="stats" href="#" />
            <Tab label="reproducibility" href="#" />
            <Tab label="data" href="#" />
            <Tab label="contribute" href="#" />
          </Tabs>
        </GAppBar>
        {value === 0 && (
          <TabContainer>
            <About />
          </TabContainer>
        )}
        {value === 1 && (
          <TabContainer>
            <Stats data={data} />
          </TabContainer>
        )}
        {value === 2 && (
          <TabContainer>
            <Reproducibility />
          </TabContainer>
        )}
        {value === 3 && (
          <TabContainer>
            <Data data={data} raw={raw} />
          </TabContainer>
        )}
        {value === 4 && (
          <TabContainer>
            <Contribute />
          </TabContainer>
        )}
      </div>
    );
  }
}
Taba.propTypes = {
  data: PropTypes.object.isRequired,
  raw: PropTypes.array.isRequired,
};
export default Taba;