import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";

import './css/App.scss';

import Header from './Header';
import Sidebar from './Sidebar';
import Main from './Main';
import Record from './Record';
import { SideBarDisplayContext } from './contexts';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobileShow: false,
    }
    this.handleToggleDisplaySidebar = this.handleToggleDisplaySidebar.bind(this);
  }

  handleToggleDisplaySidebar() {
    const { isMobileShow } = this.state;
    this.setState({ isMobileShow: !isMobileShow });
  }

  render() {
    return (
      <React.Fragment>
        <Router>
          <Header onMenuClick={this.handleToggleDisplaySidebar} />
          <SideBarDisplayContext.Provider value={{ isMobileShow: this.state.isMobileShow }}>
            <Sidebar />
          </SideBarDisplayContext.Provider>
          <main className="container">
            <Route path="/" exact component={Main} />
            <Route path="/record" component={Record} />
          </main>
        </Router>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));