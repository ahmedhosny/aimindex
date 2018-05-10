import React, {Component} from 'react';
import glamorous from 'glamorous';
// import axios from 'axios';
import data from './data';
//
import Taba from './components/Taba';
import {formatData} from './utils';

const GApp = glamorous.div({});
/**
 * App
 * @extends Component
 */
class App extends Component {
  /**
   * @param  {Props} props
   */
  constructor(props) {
    super(props);
    this.state = {
      formatedData: formatData(data),
      rawData: data,
      ready: true,
    };
  }
  /**
   * componentWillMount
   */
  componentWillMount() {
    // axios
    //   .get(
    //     'https://docs.google.com/document/d/1KWfmWs1HJW3pjEFHia14Y73eYD3IBZUibRTstWA8itg/edit?usp=sharing'
    //   )
    //   .then((res) => {
    //     console.log(res.request.responseText);
    //     // const data = formatData(res.data);
    //     // this.setState({data: data , ready: true});
    //   });
  }
  /**
   * [render description]
   * @return {[type]} [description]
   */
  render() {
    const {formatedData, rawData, ready} = this.state;
    return ready ? (
      <GApp>
        <Taba data={formatedData} raw={rawData} />
      </GApp>
    ) : null;
  }
}
export default App;
