import React from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/home';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
function App() {
  return (
    <React.Fragment>
      <AppBar color="secondary">
        <Toolbar>
            <Typography>TinyList</Typography>
          </Toolbar>
          </AppBar>
      <BrowserRouter>
      <Switch>
         <Route exact path="/" component={Home} />
      </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
