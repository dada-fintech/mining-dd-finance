import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import './App.scss';

import i18n from "i18next";
import { initReactI18next } from 'react-i18next'
import message from './i18n'

import Homepage from './pages/Homepage'
import Project from './pages/Project'
import CreateProject from './pages/CreateProject'

const language = localStorage.getItem('language') || 'zh'

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: message,
    lng: language,
    fallbackLng: "zh",
    interpolation: {
      escapeValue: false
    }
  });

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {/* <Route exact path="/">
            <Redirect to="/home" />
          </Route> */}
          <Route exact path="/" component={Homepage} />
          <Route exact path="/project/:id" component={Project} />
          <Route exact path="/create-project" component={CreateProject} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
