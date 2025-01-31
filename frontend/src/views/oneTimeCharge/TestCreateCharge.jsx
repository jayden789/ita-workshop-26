import React from 'react';
import CreateChargeModal from './CreateChargeModal';

export default class TestCreateCharge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: true,
    };
  }

  render() {
    return (
      <div>
        <input
          type="checkbox"
          checked={this.state.modalOpen}
          onChange={event =>
            this.setState({
              modalOpen: event.target.checked,
            })
          }
        />
        <CreateChargeModal
          isOpen={this.state.modalOpen}
          toggle={() =>
            this.setState(prevState => ({
              modalOpen: !prevState.modalOpen,
            }))
          }
          userData={{
            email: 'alice@example.com',
            current_first_name: 'Alice',
            current_last_name: 'Anderson',
            user_url: 'https://localhost:8080/api/v0/users/6/',
          }}
        />
      </div>
    );
  }
}
