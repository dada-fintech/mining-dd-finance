import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import './App.scss';

import Homepage from './pages/Homepage'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {/* <Route exact path="/">
            <Redirect to="/home" />
          </Route> */}
          <Route exact path="/" component={Homepage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
