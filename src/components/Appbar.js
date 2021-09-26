import React from 'react';
import { Link } from "react-router-dom";


class Appbar extends React.Component {

  constructor(props) {
      super(props);
  }

  componentDidMount() {}

  render() {
    return ( 
      <Link to="/"><div className="appbar">
        <div className="appbar--logo-container"><b>&#9775; Paperless</b>University</div>
        <div className="appbar--links-container"> <span className="appbar--links-li">By Michael Osei</span> </div>
      </div></Link>
    )
  }
}

export default Appbar;