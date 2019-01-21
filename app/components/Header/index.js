import React from 'react';
import { FormattedMessage } from 'react-intl';

// import A from './A';
// import Img from './Img';
import StyledButton from 'components/Button/StyledButton';
import NavBar from './NavBar';
// import Banner from './banner.jpg';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class Header extends React.Component {
  render() {
    return (
      <div>
        {/* <A href="https://twitter.com/mxstbr">
          <Img src={Banner} alt="react-boilerplate - Logo" />
        </A> */}
        <NavBar>
          <StyledButton onClick={this.props.handleRoute}>
           Start
          </StyledButton>
          {/* <HeaderLink to="/features">
            <FormattedMessage {...messages.features} />
          </HeaderLink> */}
        </NavBar>
      </div>
    );
  }
}

export default Header;
