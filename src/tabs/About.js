import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Spacer from '../components/Spacer';

/**
 * The component
 * @type {Object}
 */
class About extends Component {
  /**
   * Render
   * @return {ReactElement}
   */
  render() {
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item md={3} />
          <Grid item xs={12} sm={12} md={6}>
            <Spacer size={40} />
            <Typography gutterBottom variant="display1" component="h5">
              "The Medical Artificial Intelligence Index is a community effort
              aimed at tracking, curating, and visualizing data on the
              applications of AI in medicine and health care."
            </Typography>
            <Spacer size={20} />
            <Typography variant="subheading">
              Artificial Intelligence (AI) continues to find ample application
              opportunities in health care systems fed by an ever increasing
              amount of medical data, ranging from x-ray images and DNA
              sequences to text reports and retinal photographs. In addition to
              promising greater efficacy and efficiency in clinical care, AI has
              demonstrated great utility in multiple clinical tasks - from
              improving diagnostics to optimizing patient scheduling. While
              physicians are historically trained to examine data for the
              detection and characterization of anomalies, recent advances in AI
              have enabled machines to automatically recognize complex
              discriminative patterns in data - and provide quantitative, rather
              than qualitative, assessments.
            </Typography>
            <Spacer size={20} />
            <Typography variant="subheading">
              The Medical AI Index identifies AI applications in radiology,
              pathology, genomics, dermatology, and other data-centric medical
              fields that currently benefit - or are expected to - from AI-based
              automated decision making systems. Specifically targeted at a
              general audience, the index measures activity and advancements in
              this rapidly growing domain, and compiles insights into digestible
              and consumable formats. It brings together a group of medical
              researchers, health care professionals, and machine learning
              scientists, in both academia and industry, to provide the domain
              knowledge needed to track the impact of AI on the field.
            </Typography>
            <ul>
              <li>
                Nisi qui nisi duis commodo duis reprehenderit consequat velit
                aliquip.
              </li>
              <li>
                Dolor consectetur incididunt in ipsum laborum non et irure
                pariatur excepteur anim occaecat officia sint.
              </li>
              <li>Lorem labore proident officia excepteur do.</li>
            </ul>
          </Grid>
          <Grid item md={3} />
        </Grid>
      </div>
    );
  }
}
About.propTypes = {};
export default About;
