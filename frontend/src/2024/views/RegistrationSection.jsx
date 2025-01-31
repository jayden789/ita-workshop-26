import React from 'react';
import {
  Jumbotron,
  Container,
  Table,
  Badge,
  UncontrolledTooltip,
  Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import RegistrationInfo from './RegistrationInfo';

import styles from './RegistrationSection.module.css';

export default class RegistrationSection extends React.Component {
  feeText = (feeType, feeTitle) => {
    console.log(feeType, this.props.registrationFees, feeTitle);
    return '$' + this.props.registrationFees[feeType][feeTitle].toFixed(0);
  };

  regnOptionFeeText = (feeType, optionSlug) => {
    console.log(feeType, this.props.registrationFees, optionSlug);
    const regnOption = this.props.registrationFees[feeType][
      'registration_options'
    ].find((option) => option.slug === optionSlug);
    console.log('Here:: ' + regnOption);
    return '$' + regnOption.fee.toFixed(0);
  };

  render() {
    return (
      <div>
        <Jumbotron
          id="registration"
          fluid
          className={classNames('mt-0', 'mb-0', styles.jumbo)}
        >
          <Container>
            <div className={classNames('text-center', styles.title)}>
              <h1 className="display-4 text-light">Registration</h1>
            </div>
            {this.props.loadFees ? undefined : (
              <div className="text-center">
                <Table dark hover bordered>
                  <tbody>
                    <tr>
                      <th />
                      <th>Standard</th>
                      <th>Student</th>
                    </tr>
                    <tr>
                      <td>Base</td>
                      <td>{this.feeText('FULL', 'base')}</td>
                      <td>{this.feeText('STUDENT', 'base')}</td>
                    </tr>
                    <tr>
                      <td>Daily</td>
                      <td>{this.feeText('FULL', 'daily')}</td>
                      <td>{this.feeText('STUDENT', 'daily')}</td>
                    </tr>
                    <tr>
                      <td>Sunday reception</td>
                      <td>
                        {this.regnOptionFeeText(
                          'FULL',
                          'ita24_sundayReception_selfOnly'
                        )}
                      </td>
                      <td>
                        {this.regnOptionFeeText(
                          'STUDENT',
                          'ita24_sundayReception_selfOnly'
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>Wednesday banquet</td>
                      <td>
                        {this.regnOptionFeeText(
                          'FULL',
                          'ita24_banquetSelf_selfOnly'
                        )}
                      </td>
                      <td>
                        {this.regnOptionFeeText(
                          'STUDENT',
                          'ita24_banquetSelf_selfOnly'
                        )}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            )}
            <div className="text-center">
              <Button tag={Link} to="/register" color="primary">
                Register
              </Button>
              <div className={classNames('text-light', styles.regnInfoText)}>
                <RegistrationInfo />
                <p>
                  Registration is for attendance only. Talk presentation
                  requires a separate invitation. If you are interested in
                  presenting a talk, please{' '}
                  <a href="mailto:ita@ucsd.edu">contact us</a>.
                </p>
              </div>
            </div>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}
