import React, {Component} from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Spacer from '../components/Spacer';
import Paragraph from '../components/Paragraph';
import Link from '../components/Link';

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
    const Strong = glamorous.div({
      fontWeight: 500,
    });
    const GGrid = glamorous(Grid)({
      marginTop: '30px !important',
    });
    const GImg = glamorous.img({
      width: '100%',
    });
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
            <Paragraph content="Artificial Intelligence (AI) continues to find ample application
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
              than qualitative, assessments." />

            <Paragraph content="The Medical AI Index identifies AI applications in radiology,
                pathology, genomics, dermatology, and other data-centric medical
                fields that currently benefit - or are expected to - from AI-based
                automated decision making systems. Specifically targeted at a
                general audience, the index measures activity and advancements in
                this rapidly growing domain, and compiles insights into digestible
                and consumable formats. It brings together a group of medical
                researchers, health care professionals, and machine learning
                scientists, in both academia and industry, to provide the domain
                knowledge needed to track the impact of AI on the field.
                " />

            <Paragraph
              title="Context"
              content={
                <div>
                  Within the larger AI scope, the index aims to address the
                  medical vertical and, in doing so, complements other more
                  horizontal efforts such as the
                  <Link content="AI Index" url="https://aiindex.org/" />
                  as part of the Stanford One Hundred Year Study on Artificial
                  Intelligence. The index also complements other health
                  care-related efforts such as the
                  <Link
                    content="Future Health Index"
                    url="https://www.futurehealthindex.com/report/2017/"
                  />
                  that explores how global health systems use digital technology
                  to help prepare for the future, as well as the
                  <Link
                    content="Ethical, Social, and Political Challenges of Artificial
                    Intelligence in Health"
                    url="http://futureadvocacy.com/publications/"
                  />
                  report by the Future Advocacy group.
                </div>
              }
            />

            <Paragraph
              title="Current Scope"
              content={
                <div>
                  This current pilot explores the academic literature landscape
                  while using it as a proxy for the general state of medical AI
                  applications. Some of its features include:
                  <ul>
                    <li>
                      <Strong>Fine-grained Catalog </Strong>
                      The index spans multiple popular repositories housing
                      academic manuscripts in the field including both journals
                      and conferences, whilst providing granular and
                      domain-specific search parameters.
                    </li>
                    <li>
                      <Strong>Live Reproducibility Index </Strong>
                      A live track of reproducibility metrics in the field as it
                      pertains to the sharing of code implementations and data
                      used in experiments.
                    </li>
                    <li>
                      <Strong>Commentary </Strong>
                      All statistics are accompanied by in depth explanations,
                      interpretations, and extrapolations.
                    </li>
                    <li>
                      <Strong>Transparency </Strong>
                      All underlying data used to generate statistics and
                      insights are made public. While every effort has been made
                      to accurately curate the data, errors are inevitable.
                      Corrections are welcome.
                    </li>
                    <li>
                      <Strong>International Focus </Strong>
                      Every attempt is made to produce globally-relevant
                      statistics.
                    </li>
                  </ul>
                </div>
              }
            />

            <Paragraph
              title="Audience"
              content={
                <div>
                  <ul>
                    <li>
                      <Strong>Funding Agencies </Strong>
                      Recognize over- and under-explored application areas for
                      more well-informed funding decisions. Accurately situate
                      requests for funding and funded projects within the
                      current state-of-the-art.
                    </li>
                    <li>
                      <Strong>Journalists </Strong>
                      Reference relevant statistics, reuse images and plots, and
                      quickly develop a general understanding without
                      domain-knowledge.
                    </li>
                    <li>
                      <Strong>Policymakers & Regulators </Strong>
                      Query academic efforts while developing new guidance for
                      submissions seeking approval.
                    </li>
                    <li>
                      <Strong>Industry Professionals </Strong>
                      Quickly gauge the current academic state in a given
                      application area as a proxy for commercial viability and
                      success.
                    </li>
                    <li>
                      <Strong>Researchers </Strong>
                      Explore the plethora of work that lives beyond the first
                      page of Google search results. Identify state-of-the-art
                      methods in your area and their evolution/popularity over
                      time.
                    </li>
                    <li>
                      <Strong>The Public </Strong>
                      Understand the applications most likely to be automated in
                      the near future and how patients are most likely to be
                      affected.
                    </li>
                  </ul>
                </div>
              }
            />

            <Paragraph
              title="Future Scope"
              content={
                <div>
                  While initially focused on curating academic progress through
                  scientific manuscripts, we hope to expand the index to
                  include:
                  <ul>
                    <li>
                      <Strong>Live Performance Leaderboard</Strong>
                      Track the technical AI performance reported on specific
                      benchmarking datasets used in the field.
                    </li>
                    <li>
                      <Strong>Clinical Implementation</Strong>
                      Survey the landscape of actual AI-implementation in
                      clinical settings including tools cleared for use by
                      various regulatory bodies.
                    </li>
                    <li>
                      <Strong>Glossary </Strong>
                      Running glossary of terms directly related to medical AI
                      applications.
                    </li>
                    <li>
                      <Strong>Physician Stories </Strong>
                      Survey levels of interaction with automated systems and
                      their impact on clinical workflows. Gauge if and how
                      physicians understand AI systems mechanics, interpret
                      their outcomes, and guard against failures.
                    </li>
                    <li>
                      <Strong>Patient Stories</Strong>
                      Survey the general sentiment towards medical decision
                      making being outsourced to machines as a new third party
                      in the sacred patient-doctor relationship.
                    </li>
                    <li>
                      <Strong>Adversarial Practices</Strong>
                      Track methods for generating and countering adversarial
                      attacks against medical AI systems.
                    </li>
                    <li>
                      <Strong>Industry</Strong>
                      Analyze the industrial landscape spanning startups and
                      associated funding.
                    </li>
                    <li>
                      <Strong>Open-source Software </Strong>
                      Record activity surrounding the medical AI tool
                      development on open-source software platforms such as
                      github.
                    </li>
                    <li>
                      <Strong>Public Sentiment</Strong>
                      Understand public attitude towards medical AI applications
                      through sentiment analysis of social media content.
                    </li>
                    <li>
                      <Strong>Industry</Strong>
                      Analyze the industrial landscape spanning startups and
                      associated funding.
                    </li>
                  </ul>
                </div>
              }
            />

            <Paragraph
              content={
                <div>
                  The Medical AI Index is proudly sponsored by
                  <GGrid container spacing={24}>
                    <Grid item xs={12} sm={12} md={4}>
                      <GImg src={'img/hms.png'} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <GImg src={'img/bwh.png'} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <GImg src={'img/dfci.png'} />
                    </Grid>
                    <Grid item md={1} />
                    <Grid item xs={12} sm={12} md={5}>
                      <GImg src={'img/nih.png'} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={5}>
                      <GImg src={'img/nci.png'} />
                    </Grid>
                    <Grid item md={1} />
                  </GGrid>
                </div>
              }
            />

            <Paragraph
              title="Feedback"
              content={
                <div>
                  We are in our early stages and we invite the community to join
                  the effort and{' '}
                  <a target="_blank" href="mailto:info@medicalindex.ai">
                    submit feedback
                  </a>. The effort would not have been possible without
                  open-source software projects including
                  <Link
                    content="React"
                    url="https://reactjs.org/"
                    space={false}
                  />,
                  <Link
                    content="Glamorous"
                    url="https://glamorous.rocks/"
                    space={false}
                  />,
                  <Link
                    content="Material-UI"
                    url="https://material-ui-next.com/"
                    space={false}
                  />, and
                  <Link content="Plotly" url="https://plot.ly/" />
                  among others.
                </div>
              }
            />
          </Grid>
          <Grid item md={3} />
        </Grid>
      </div>
    );
  }
}
About.propTypes = {};
export default About;
