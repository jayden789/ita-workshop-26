import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Spinner } from 'reactstrap';

import { api, clearApiKey, isLoggedIn } from './helpers';
import PrivateRoute from './views/PrivateRoute';
import Home from './views/Home';
import ResetPasswordConfirm from './views/ResetPasswordConfirm';
import IframeCommunicator from './views/IframeCommunicator';
import CreateAccount from './views/auth/CreateAccount';
import CreateAccountConfirm from './views/auth/CreateAccountConfirm';
import TestProfilePicUpload from './views/TestProfilePicUpload';
import SchedulePage2024 from './2024/views/SchedulePage/SchedulePage';
import SchedulePage2023 from './2023/views/SchedulePage/SchedulePage';
import TestCreateCharge from './views/oneTimeCharge/TestCreateCharge';
import PayCharge from './views/oneTimeCharge/PayCharge';
import AdminHome from './views/admin/admin_home/AdminHome';
import OneTimeChargesPage from './views/oneTimeCharge/OneTimeChargesPage';

import NavBar from './2020/views/NavBar';
import NavBar2022 from './2022/views/NavBar';
import NavBar2023 from './2023/views/NavBar';
import NavBar2024 from './2024/views/NavBar';
import NavBar2025 from './2025/views/NavBar';
import Home2020 from './2020/views/Home';
import Home2022 from './2022/views/Home';
import Home2023 from './2023/views/Home';
import Home2024 from './2024/views/Home';
import Home2025 from './2025/views/Home';
import Login2024 from './2024/views/Login';
import Registration2024 from './2024/views/Registration';

// this is a joke.
import WorldRecord from './views/WorldRecord';

class App extends Component {
  state = {
    loggedIn: false,
    user: {},
    loading: true,
    participantsUrl19: '',
    participantsUrl20: '',
    participantsUrl22: '',
    participantsUrl23: '',
    participantsUrl24: '',
    participantsUrl25: '',
    registrationFees: [],
    schedule: [],
    loadSchedule: true,
    loadFees: true,
    workshop: null,
  };

  componentDidMount = () => {
    this.loadWorkshop();
    this.loadWorkshop2020();
    // this.loadWorkshop2022();
    this.loadWorkshop2023();
    this.loadWorkshop2024();
    this.loadRegistrationFees();
    this.loadSchedule();
    this.onLogin();
  };

  loadWorkshop = () => {
    api('api/v0/workshops/ita19/').then((workshop) =>
      this.setState({
        participantsUrl19: workshop['participants_url'],
      })
    );
  };

  loadWorkshop2020 = () => {
    api('api/v0/workshops/ita20/').then((workshop) =>
      this.setState({
        participantsUrl20: workshop['participants_url'],
      })
    );
  };

  loadWorkshop2022 = () => {
    api('api/v0/workshops/ita22/').then((workshop) =>
      this.setState({
        participantsUrl22: workshop['participants_url'],
      })
    );
  };

  loadWorkshop2023 = () => {
    api('api/v0/workshops/ita23/').then((workshop) =>
      this.setState({
        participantsUrl23: workshop['participants_url'],
      })
    );
  };

  loadWorkshop2024 = () => {
    api('api/v0/workshops/ita24/').then((workshop) =>
      this.setState({
        participantsUrl24: workshop['participants_url'],
        workshop,
      })
    );
  };

  loadRegistrationFees = () => {
    api('api/v0/registration_fees/')
      .then((json) => {
        this.setState({ registrationFees: json[0]['fees_by_fee_type'] }, () =>
          this.setState({ loadFees: false })
        );
      })
      .catch((error) => console.log(error));
  };

  loadSchedule = () => {
    api('api/v0/mobile/schedule').then((json) => {
      this.setState({ schedule: json }, () =>
        this.setState({ loadSchedule: false })
      );
    });
  };

  onLogin = () => {
    api('rest-auth/user/', 'GET')
      .then((json) =>
        this.setState({
          loggedIn: true,
          user: json,
          loading: false,
        })
      )
      .catch(() =>
        this.setState({
          loggedIn: false,
          user: {},
          loading: false,
        })
      );
  };

  logout = () => {
    clearApiKey();
    this.setState({ loggedIn: isLoggedIn(), user: {} });
  };

  render() {
    const navbarProps = {
      loggedIn: this.state.loggedIn,
      showAdmin: this.state.user.admin,
      logout: this.logout,
    };
    const navbar20 = <NavBar {...navbarProps} />;
    const navbar22 = <NavBar2022 {...navbarProps} />;
    const navbar23 = <NavBar2023 {...navbarProps} />;
    const navbar24 = <NavBar2024 {...navbarProps} />;
    const navbar25 = <NavBar2025 {...navbarProps} />;

    const addProfilePicUrl = (this.state.user.user_profile || {})
      .add_profile_pic_url;

    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div className="maxheight">
          <Route
            exact={true}
            path="/"
            render={() => (
              <div className="App maxheight">
                <Home2025
                  showAdmin={this.state.user.admin}
                  navbarProps={navbarProps}
                  registrationFees={this.state.registrationFees}
                  loadFees={this.state.loadFees}
                  participantsUrl25={this.state.participantsUrl25}
                  schedule={this.state.schedule}
                  loadSchedule={this.state.loadSchedule}
                />
              </div>
            )}
          />
          <Route
            exact={true}
            path="/login"
            render={({ location }) => (
              <div className="App maxheight">
                <Login2024
                  onLogin={this.onLogin}
                  location={location}
                  navbar={navbar25}
                />
              </div>
            )}
          />
          <PrivateRoute
            exact={true}
            path="/register"
            render={({ location }) => (
              <div className="App maxheight">
                {this.state.workshop ? (
                  <Registration2024
                    location={location}
                    navbar={navbar25}
                    create={true}
                    workshop={this.state.workshop}
                    loggedInUser={this.state.user}
                    loading={this.state.loading}
                    registrationFees={this.state.registrationFees}
                  />
                ) : (
                  <div
                    className="maxheight maxwidth"
                    style={{ display: 'grid', placeItems: 'center' }}
                  >
                    <Spinner>Loading....</Spinner>
                  </div>
                )}
              </div>
            )}
          />
          <Route
            exact={true}
            path="/2024"
            render={() => (
              <div className="App maxheight">
                <Home2024
                  showAdmin={this.state.user.admin}
                  navbar={navbar24}
                  registrationFees={this.state.registrationFees}
                  loadFees={this.state.loadFees}
                  participantsUrl23={this.state.participantsUrl24}
                  schedule={this.state.schedule}
                  loadSchedule={this.state.loadSchedule}
                />
              </div>
            )}
          />
          <Route
            exact={true}
            path="/2023"
            render={() => (
              <div className="App maxheight">
                <Home2023
                  showAdmin={this.state.user.admin}
                  navbar={navbar23}
                  registrationFees={this.state.registrationFees}
                  loadFees={this.state.loadFees}
                  participantsUrl23={this.state.participantsUrl23}
                  schedule={this.state.schedule}
                  loadSchedule={this.state.loadSchedule}
                />
              </div>
            )}
          />
          <Route
            exact={true}
            path="/2022"
            render={() => (
              <div className="App maxheight">
                <Home2022
                  navbar={navbar22}
                  registrationFees={this.state.registrationFees}
                  loadFees={this.state.loadFees}
                  participantsUrl22={this.state.participantsUrl22}
                />
              </div>
            )}
          />
          <Route
            exact={true}
            path="/2020"
            render={() => (
              <div className="App maxheight">
                <Home2020
                  navbar={navbar20}
                  registrationFees={this.state.registrationFees}
                  loadFees={this.state.loadFees}
                  participantsUrl20={this.state.participantsUrl20}
                />
              </div>
            )}
          />
          <Route
            exact={true}
            path="/2019"
            render={() => (
              <div className="App maxheight">
                <Home
                  navbar={navbar25}
                  registrationFees={this.state.registrationFees}
                  loadFees={this.state.loadFees}
                  participantsUrl19={this.state.participantsUrl19}
                />
              </div>
            )}
          />
          <PrivateRoute
            exact={true}
            path="/admin"
            render={() => <AdminHome navbar={navbar25} />}
          />
          {/* <PrivateRoute
            exact={true}
            path="/admin/registration_stats"
            render={() => <RegistrationStatsPage navbar={navbar} />}
          />
          <PrivateRoute
            exact={true}
            path="/admin/workshop_participants"
            render={() => <WorkshopParticipantsPage navbar={navbar} />}
          />
          <PrivateRoute
            exact={true}
            path="/admin/create_account"
            render={() => (
                <CreateAccount navbar={navbar} 
                create={true}/>
            )}
          />
          <PrivateRoute
            exact={true}
            path="/admin/presenters"
            render={() => <PresentersPage navbar={navbar} />}
          />
          <PrivateRoute
            exact={true}
            path="/admin/user_list"
            render={() => <UserListPage navbar={navbar} />}
          />
          <PrivateRoute
            exact={true}
            path="/admin/email_tool"
            render={() => (
              <div className="App maxheight">
                <EmailTool
                  navbar={navbar}
                  workshop={this.state.workshop}
                  user={this.state.user}
                  loading={this.state.loading}
                />
              </div>
            )}
          /> */}
          <Route
            path="/reset_password_confirm/:uid/:token"
            render={({ match }) => (
              <div className="App maxheight">
                <ResetPasswordConfirm
                  uid={match.params.uid}
                  token={match.params.token}
                />
              </div>
            )}
          />
          <Route
            exact={true}
            path="/create_account"
            render={() => (
              <div className="App maxheight">
                <CreateAccount navbar={navbar25} />
              </div>
            )}
          />
          <Route
            path="/create_account/confirm/:confirmKey"
            render={({ match }) => (
              <div className="App maxheight">
                <CreateAccountConfirm
                  confirmKey={match.params.confirmKey}
                  navbar={navbar25}
                />
              </div>
            )}
          />
          <Route
            exact={true}
            path="/iframe_communicator"
            render={() => <IframeCommunicator />}
          />
          <Route
            exact={true}
            path="/test_profile_pic_upload"
            render={() => (
              <TestProfilePicUpload
                addProfilePicUrl={addProfilePicUrl}
                navbar={navbar25}
              />
            )}
          />
          <Route
            exact={true}
            path="/schedule"
            render={() => <SchedulePage2024 navbar={navbar25} />}
          />
          <Route
            exact={true}
            path="/schedule2023"
            render={() => (
              <SchedulePage2023
                navbar={navbar23}
                schedule={this.state.schedule}
                loadSchedule={this.state.loadSchedule}
              />
            )}
          />
          <Route
            exact={true}
            path="/world-record"
            render={() => <WorldRecord navbar={navbar25} />}
          />
          {/* TODO remove this */}
          <PrivateRoute
            exact={true}
            path="/test-create-charge"
            render={() => <TestCreateCharge />}
          />
          {/* WARNING: this path is tightly coupled to the backend */}
          <PrivateRoute
            path="/pay-one-time-charge/:chargeId"
            render={({ match }) => (
              <div className="App maxheight">
                <PayCharge chargeId={match.params.chargeId} navbar={navbar25} />
              </div>
            )}
          />
          <PrivateRoute
            exact={true}
            path="/admin/one-time-charges"
            render={() => (
              <div className="App maxheight">
                <OneTimeChargesPage navbar={navbar25} />
              </div>
            )}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
