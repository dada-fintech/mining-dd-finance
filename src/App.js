import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import './App.scss';

import Homepage from './pages/Homepage'
import Dashboard from './pages/Dashboard'
import CreateProject from './pages/CreateProject'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {/* <Route exact path="/">
            <Redirect to="/home" />
          </Route> */}
          <Route exact path="/" component={Homepage} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/create-project" component={CreateProject} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
