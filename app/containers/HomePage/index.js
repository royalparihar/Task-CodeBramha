/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
  makeSelectTimer,
} from 'containers/App/selectors';
// import ReposList from 'components/ReposList';
import Paragraph from 'components/Paragraph';
import Header from 'components/Header';
// import AtPrefix from './AtPrefix';
// import CenteredSection from './CenteredSection';
// import Form from './Form';
import Input from './Input';
import Section from './Section';
// import messages from './messages';
import { loadRepos } from '../App/actions';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class HomePage extends React.PureComponent {
  /**
   * when initial state username is not null, submit the form to load repos
   */
  constructor(props) {
    super(props);
    this.state = {
      wpm: 0,
    };
  }

  componentDidMount() {
    this.props.loadParagraph();
  }

  getWordPerMinute = (content, inputValue, timer) => {
    const pureString = content && content.replace(/(<([^>]+)>)/gi, '');
    let correctWordCount = 0;
    for (let i = 0; i < inputValue.length; i += 1) {
      if (inputValue.charAt(i) === pureString.charAt(i)) {
        correctWordCount += 1;
      }
    }
    const diff = Math.round((new Date().getTime() - timer) / 1000);
    const spentMinutes = Math.floor(diff / 60);
    this.setState({
      wpm: inputValue ? correctWordCount / spentMinutes : 0,
    });
  };

  render() {
    const { inputValue, paragraph, timer } = this.props;
    const diff = Math.round((new Date().getTime() - timer) / 1000);
    if ((diff / 60) % 60 === 0) {
      this.getWordPerMinute(paragraph, inputValue, timer);
    }
    return (
      <article>
        <Helmet>
          <title>Type Racer</title>
        </Helmet>
        <div>
          <Header />
          <Section>
            <div> WPM : {this.state.wpm} </div>
            <Paragraph {...this.props} />
            <Input
              id="input"
              type="text"
              placeholder="Start Typing"
              value={inputValue}
              onChange={this.props.onChangeInputValue}
            />
          </Section>
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  loadParagraph: PropTypes.func,
  inputValue: PropTypes.string,
  onChangeInputValue: PropTypes.func,
  timer: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeInputValue: evt => dispatch(changeUsername(evt.target.value)),
    loadParagraph: () => dispatch(loadRepos()),
    // clearState: () => dispatch(clearState()),
  };
}

const mapStateToProps = createStructuredSelector({
  paragraph: makeSelectRepos(),
  inputValue: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  timer: makeSelectTimer(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
