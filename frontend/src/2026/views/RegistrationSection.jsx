import React from 'react';
import { Jumbotron, Container, Table, Button } from 'reactstrap';
import classNames from 'classnames';

import RegistrationInfo from './RegistrationInfo';

import styles from './RegistrationSection.module.css';
import { HashLink as Link } from 'react-router-hash-link';

export default class RegistrationSection extends React.Component {
  feeText = (feeType, feeTitle) => {
    return '$' + this.props.registrationFees[feeType][feeTitle].toFixed(0);
  };

  regnOptionFeeText = (feeType, optionSlug) => {
    const regnOption = this.props.registrationFees[feeType][
      'registration_options'
    ].find((option) => option.slug === optionSlug);
    if (regnOption === undefined) {
      return '';
    }
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
            {/* Hardcoded mock data for 2026 */}
            <div className="text-center">
              <Table dark hover bordered style={{ marginBottom: '0px' }}>
                <tbody>
                  <tr>
                    <th style={{ width: '33.3%' }} />
                    <th style={{ width: '33.3%' }}>Standard</th>
                    <th style={{ width: '33.3%' }}>Student</th>
                  </tr>
                  <tr>
                    <td>Base</td>
                    <td>$330</td>
                    <td>$220</td>
                  </tr>
                  <tr>
                    <td>Daily</td>
                    <td>$75</td>
                    <td>$50</td>
                  </tr>
                  <tr>
                    <td>Sunday reception</td>
                    <td>$50</td>
                    <td>$30</td>
                  </tr>
                  <tr>
                    <td>Wednesday banquet</td>
                    <td>$100</td>
                    <td>$70</td>
                  </tr>
                </tbody>
              </Table>
            </div>
            {/* Original dynamic table - commented out until backend is configured
            {this.props.loadFees ? undefined : (
              <div className="text-center">
                <Table dark hover bordered style={{ marginBottom: '0px' }}>
                  <tbody>
                    <tr>
                      <th style={{ width: '33.3%' }} />
                      <th style={{ width: '33.3%' }}>Standard</th>
                      <th style={{ width: '33.3%' }}>Student</th>
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
                          'ita25_sundayReception_selfOnly'
                        )}
                      </td>
                      <td>
                        {this.regnOptionFeeText(
                          'STUDENT',
                          'ita25_sundayReception_selfOnly'
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>Wednesday banquet</td>
                      <td>
                        {this.regnOptionFeeText(
                          'FULL',
                          'ita25_banquetSelf_selfOnly'
                        )}
                      </td>
                      <td>
                        {this.regnOptionFeeText(
                          'STUDENT',
                          'ita25_banquetSelf_selfOnly'
                        )}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            )}
            */}
            <div className="text-center">
              {/*<Button
                  href="https://forms.gle/SiefKRum2kFYJmHd9"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="primary"
                  style={{ marginTop: '32px', marginBottom: '0px' }}
                >
                  Register Now
                </Button>*/}

              <Button
                tag="a"
                href="/register"
                color="primary"
                style={{ marginTop: '32px', marginBottom: '0px' }}
              >
                Register
              </Button>
              <div className={classNames('text-light', styles.regnInfoText)}>
                <RegistrationInfo />
                <p>
                  Registration is for attendance only. Talk presentation
                  requires a separate invitation. If you are interested in
                  presenting a talk, please{' '}
                  <a href="mailto:ita@ucsd.edu">
                    <strong>contact us</strong>
                  </a>
                  .
                </p>
              </div>
            </div>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}
