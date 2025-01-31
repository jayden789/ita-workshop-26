import React from 'react';
import classnames from 'classnames';
import {
  Alert,
  Nav,
  NavItem,
  NavLink,
  Jumbotron,
  Container,
  TabContent,
  TabPane,
} from 'reactstrap';

import EmailTool from '../email_tool/EmailTool';
import CreateAccount from '../../auth/CreateAccount';
import PresentersPage from '../registration_stats/PresentersPage';
import UserListPage from '../user_list/UserListPage';
import RegistrationStatsPage from '../registration_stats/WorkshopParticipantsPage';
import WorkshopParticipantsPage from '../registration_stats/RegistrationStatsPage';
import OneTimeChargesPage from '../../oneTimeCharge/OneTimeChargesPage';

import styles from './AdminHome.module.css';


export default class AdminHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        activeTab: '1'
    }
  }

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  };
  componentDidMount(){}

  render() {

    const jumbotronClasses = classnames({
      [styles.regnJumbotron]: true
    });

    return (
    <div>{this.props.navbar}
      <Jumbotron fluid className={jumbotronClasses}>
        <div className="text-center">
          <h1 className="display-6">Admin Tools</h1>
        </div>
        <Container>
          <div>
            <Nav tabs>
              <NavItem style={{ cursor: 'pointer' }}>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === '1',
                  })}
                  onClick={() => {
                    this.toggle('1');
                  }}
                >
                  Workshop Stats
                </NavLink>
              </NavItem>
              <NavItem style={{ cursor: 'pointer' }}>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === '2',
                  })}
                  onClick={() => {
                    this.toggle('2');
                  }}
                >
                  Workshop Participants
                </NavLink>
              </NavItem>
              <NavItem style={{ cursor: 'pointer' }}>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === '3',
                  })}
                  onClick={() => {
                    this.toggle('3');
                  }}
                >
                  Presenters
                </NavLink>
              </NavItem>
              <NavItem style={{ cursor: 'pointer' }}>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === '4',
                  })}
                  onClick={() => {
                    this.toggle('4');
                  }}
                >
                  User List
                </NavLink>
              </NavItem>
              <NavItem style={{ cursor: 'pointer' }}>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === '5',
                  })}
                  onClick={() => {
                    this.toggle('5');
                  }}
                >
                  Email Tool
                </NavLink>
              </NavItem>
              <NavItem style={{ cursor: 'pointer' }}>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === '6',
                  })}
                  onClick={() => {
                    this.toggle('6');
                  }}
                >
                  One Time Charges
                </NavLink>
              </NavItem>
              <NavItem style={{ cursor: 'pointer' }}>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === '7',
                  })}
                  onClick={() => {
                    this.toggle('7');
                  }}
                >
                  Create Account
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <RegistrationStatsPage />
              </TabPane>
              <TabPane tabId="2">
                <WorkshopParticipantsPage/>
              </TabPane>
              <TabPane tabId="3">
                <PresentersPage />
              </TabPane>
              <TabPane tabId="4">
                <UserListPage />
              </TabPane>
              <TabPane tabId="5">
                <EmailTool
                  workshop={this.state.workshop}
                  user={this.state.user}
                  loading={this.state.loading}
                />
              </TabPane>
              <TabPane tabId="6">
                <OneTimeChargesPage />
              </TabPane>
              <TabPane tabId="7">
                <CreateAccount create={true}/>
              </TabPane>
            </TabContent>
          </div>
        </Container>
      </Jumbotron>
      </div>
    );
  }
}
