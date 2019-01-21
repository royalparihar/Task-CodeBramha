import React from 'react';
import PropTypes from 'prop-types';

import LoadingIndicator from 'components/LoadingIndicator';
import Content from './Content';

function Paragraph({ loading, error, paragraph, inputValue, timer }) {
  if (loading) {
    return <LoadingIndicator />;
  }

  if (error !== false) {
    return <Content content="Something went wrong, please try again!" />;
  }

  return <Content content={paragraph} inputValue={inputValue} timer={timer} />;
}

Paragraph.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  paragraph: PropTypes.any,
  inputValue: PropTypes.string,
  timer: PropTypes.object,
};

export default Paragraph;
