import React from 'react';
import { 
  Dropdown,
  DropdownToggle,
  DropdownMenu, 
  DropdownItem 
} from 'reactstrap';



class ProfileIcon extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      drodownOpen: false
    }
  }

  render() {
    return (
      <div class="pa4 tc">
        <img
        src="http://tachyons.io/img/logo.jpg"
        class="br-100 ba h3 w3 dib" alt="avatar" />
      </div>
    )
  }
}

export default ProfileIcon;