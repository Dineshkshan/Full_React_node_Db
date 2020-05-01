import React from 'react';
import Register from './htmlfiles/Register';
import Buttons from './htmlfiles/Buttons';
import Change from './htmlfiles/Change';
import Login from './htmlfiles/Login';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
function App() {
  return (
    <div>
    <Router>
      <Switch>
      <Route exact strict path="/" component={Login}/>  
      <Route exact strict path="/Register" component={Register}/>  
      <Route exact strict path ="/Buttons" component={Buttons}/>
      <Route exact strict path ="/Change"component={Change}/>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
