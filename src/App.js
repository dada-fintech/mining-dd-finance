import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import './App.scss';

import i18n from "i18next";
import { initReactI18next, useTranslation } from 'react-i18next'
import message from './i18n'

import Homepage from './pages/Homepage'
import Project from './pages/Project'
// import Projects from './pages/Projects'
import CreateProject from './pages/CreateProject'
import CreateVote from './pages/CreateVote'
import Coming from './pages/Coming'

import enUS from 'antd/lib/locale/en_US';
import zhCN from 'antd/lib/locale/zh_CN';
import {
  ConfigProvider,
} from 'antd';

const language = localStorage.getItem('language') || (navigator.language === 'zh-CN' ? 'zh' : 'en')

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
  const { i18n } = useTranslation()

  return (
    <ConfigProvider locale={i18n.language === 'en' ? enUS : zhCN}>
      <div className={`App ${i18n.language}`}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Redirect to="/projects" />
            </Route>
            <Route exact path="/projects" component={Homepage} />
            <Route exact path="/project/:id" component={Project} />
            <Route exact path="/create-project" component={CreateProject} />
            <Route exact path="/create-vote/:id" component={CreateVote} />
            <Route exact path="/coming/:page" component={Coming} />
          </Switch>
        </Router>
      </div>
    </ConfigProvider>

  );
}

export default App;
