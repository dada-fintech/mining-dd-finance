import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import './App.scss';
import React, { useEffect } from 'react'
import AppSidebar from 'components/AppSidebar'
import { useWallet } from 'use-wallet'
import { Row, Col } from 'antd'

import i18n from "i18next";
import { initReactI18next, useTranslation } from 'react-i18next'
import message from './i18n'

import Projects from './pages/Projects'
import CommunityProjects from './pages/CommunityProjects'
import Project from './pages/Project'
import Blog from './pages/Blog'
// import Projects from './pages/Projects'
import CreateProject from './pages/CreateProject'
import CreateVote from './pages/CreateVote'
import Coming from './pages/Coming'
import Farming from './pages/Farming'
import BuyDHM from './pages/BuyDHM'


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
  const wallet = useWallet()

  useEffect(() => {
    wallet.connect()
  }, [])

  return (
    <ConfigProvider locale={i18n.language === 'en' ? enUS : zhCN}>
      <div className={`App ${i18n.language}`}>
        <Router>
          <Row>
            <Col xs={0} lg={4} xxl={3}>
              <AppSidebar />
            </Col>
            <Col xs={24} lg={20} xxl={21}>
              <div className="content-wrapper">
                <Switch>
                  <Route exact path="/">
                    <Redirect to="/projects" />
                  </Route>
                  <Route exact path="/community-projects" component={CommunityProjects} />
                  <Route exact path="/projects" component={Projects} />
                  <Route exact path="/project/:id" component={Project} />
                  <Route exact path="/create-project/:tempType" component={CreateProject} />
                  <Route exact path="/create-vote/:id" component={CreateVote} />
                  <Route exact path="/coming/:page" component={Coming} />
                  <Route exact path="/blog" component={Blog} />
                  <Route exact path="/farming" component={Farming} />
                  <Route exact path="/buy-dhm" component={BuyDHM} />
                </Switch>
              </div>
            </Col>
          </Row>

        </Router>
      </div>
    </ConfigProvider>

  );
}

export default App;
