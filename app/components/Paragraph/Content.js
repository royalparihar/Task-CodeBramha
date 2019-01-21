import React from 'react';
import PropTypes from 'prop-types';

import Pa from './Pa';
import Wrapper from './Wrapper';

const renderContent = content => {
  let formattedContent = '';
  const pureString = content && content.replace(/(<([^>]+)>)/gi, '');
  for (let i = 0; i < pureString.length; i += 1) {
    formattedContent += `<span>${pureString.charAt(i)}</span>`;
  }
  return formattedContent;
};
class Content extends React.Component {
  componentWillReceiveProps(props) {
    const { inputValue } = props;
    const spans = document.getElementById('my-content').getElementsByTagName('span');
    for (let i = 0; i < spans.length; i += 1) {
      let color = 'black';
      if (inputValue.length - 1 >= i) {
        color = inputValue.charAt(i) === spans[i].innerText ? 'green' : 'red';
      }
      spans[i].style.color = color;
      spans[i].style.backgroundColor = `light-${color}`;
    }
  }

  render() {
    const { inputValue, content } = this.props;
    const displayContent = renderContent(content, inputValue);
    return (
      <Wrapper>
        <Pa
          id="my-content"
          dangerouslySetInnerHTML={{ __html: displayContent }}
        />
      </Wrapper>
    );
  }
}

Content.propTypes = {
  content: PropTypes.string.isRequired,
  inputValue: PropTypes.string,
};

export default Content;
