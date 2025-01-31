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

import RegistrationAdmin from './RegistrationAdmin';
import RegistrationPaper from './RegistrationPaper';
import RegistrationProfile from './RegistrationProfile';
import RegistrationWorkshop from './RegistrationWorkshop';

import {
  api,
  apiRaw,
  getAttendingDates,
  reverseAttendingDates,
  findConsec,
  findFirstDay,
  findLastDay,
} from '../../helpers';

import styles from './RegistrationTabs.module.css';

function dayCheck(firstDay, lastDay) {
  var first;
  var last;
  var logical = true;
  switch (firstDay) {
    case 'Monday':
      first = 1;
      break;
    case 'Tuesday':
      first = 2;
      break;
    case 'Wednesday':
      first = 3;
      break;
    case 'Thursday':
      first = 4;
      break;
    case 'Friday':
      first = 5;
      break;
    case 'Please Select':
      first = -1;
      break;
    default:
      first = -1;
  }
  switch (lastDay) {
    case 'Monday':
      last = 1;
      break;
    case 'Tuesday':
      last = 2;
      break;
    case 'Wednesday':
      last = 3;
      break;
    case 'Thursday':
      last = 4;
      break;
    case 'Friday':
      last = 5;
      break;
    case 'Please Select':
      first = -1;
      break;
    default:
      first = -1;
  }
  if (first > last) {
    logical = false;
  }

  if (first === -1 || last === -1) {
    logical = true;
  }

  return logical;
}

const sortAffiliationsInPlace = affiliations => {
  affiliations.sort((a, b) => {
    if (a.title > b.title) {
      return 1;
    }
    return a.title === b.title ? 0 : -1;
  });
};

export default class RegistrationTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      formUrl: '',
      checkStatusUrl: '',
      formReady: false,
      triggerOpen: false,
      activeTab: '1',
      registrationUrl: '',
      workshopUrl: '',
      userProfileUrl: '',
      email: '',
      emailIsVerified: false,
      markEmailVerifiedUrl: null,
      firstName: '',
      lastName: '',
      formalName: '',
      phoneNum: '',
      affiliation: '',
      affiliations: [],
      newAffiliationTitle: '',
      website: '',
      studentOption: false,
      presentation: '',
      presentingThisYear: false,
      adminPresentingThisYear: false,
      presentingDefault: false,
      graduationDay: false,
      graduationTalk: false,
      graduationPresentation: false,
      poster: false,
      plenary: false,
      shirtType: '',
      shirtSize: '',
      title: '',
      inviter: 'Placeholder Option3',
      registrantType: '',
      feetype_override: '',
      likelihood: '',
      nickname: '',
      firstDay: '',
      lastDay: '',
      profilePicUrl: '',
      nonConsecMon: false,
      nonConsecTue: false,
      nonConsecWed: false,
      nonConsecThu: false,
      nonConsecFri: false,
      WednesdayBanquetOption: '',
      ValentinesEventOption: '',
      SundayReceptionOption: '',
      monReceptionOption: '',
      saturdayWorkshopOption: '',
      mug: false,
      nonConsecutiveDays: false,
      paid: false,
      firstNameOriginal: '',
      lastNameOriginal: '',
      emailOriginal: '',
      tooltipOpen: false,
      daysCorrect: true,
      dummyVar1: 0,
      dayNeedsCheck: true,
      modal: false,
      talkUrl: '',
      paperTitle: '',
      paperAuthorsComment: '',
      paperAbstract: '',
      paperTopicComment: '',
      paperComment: '',
      adminComments: '',
      paperUrl: '',
      addPaperUrl: '',
      videoUrl: '',
      addVideoUrl: '',
      saveModal: false,
      lastSaveTime: '',
      isChanged: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.changePaid = this.changePaid.bind(this);
    this.handleBinaryOptionChange = this.handleBinaryOptionChange.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.postAffiliation = this.postAffiliation.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.onChangeTriggerOpen = this.onChangeTriggerOpen.bind(this);
    this.onPaymentComplete = this.onPaymentComplete.bind(this);
    this.onPaymentCanceled = this.onPaymentCanceled.bind(this);
    this.closeSave = this.closeSave.bind(this);
    this.switchStudentOption = this.switchStudentOption.bind(this);
    this.switchPresentingThisYear = this.switchPresentingThisYear.bind(this);
    this.enablePresentationOption = this.enablePresentationOption.bind(this);
    this.disablePresentationOption = this.disablePresentationOption.bind(this);
    this.enablePresentation = this.enablePresentation.bind(this);
  }

  componentDidMount() {
    this.pullAffiliation();
    this.loadRegistration();
    // TODO refactor this
    api(this.props.userUrl).then(data => {
      this.setState({
        email: data.email,
        markEmailVerifiedUrl: data.mark_email_verified_url,
        emailIsVerified: data.email_is_verified,
      });
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userUrl !== this.props.userUrl) {
      this.loadRegistration().then(() => this.toggle('1'));
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      isChanged: true,
    });
  };

  handleCheckboxChange = e => {
    this.setState({
      [e.target.name]: e.target.checked,
      isChanged: true,
    });
  };

  changePaid = e => {
    if (this.state.paid === true) {
      this.setState({
        paid: false,
      });
    } else {
      this.setState({
        paid: true,
      });
    }
  };

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  handleOptionChange = changeEvent => {
    this.setState({
      [changeEvent.target.name]: changeEvent.target.value,
    });
  };

  switchPresentingThisYear = changeEvent => {
    const isTrue = changeEvent.target.value === 'true' ? true : false;
    this.setState({
      presentingThisYear: isTrue,
      adminPresentingThisYear: isTrue,
    });
  };
  
  handleBinaryOptionChange = changeEvent => {
    console.log(changeEvent.target.name, changeEvent.target.value, changeEvent.target.value === 'true')
    const isTrue = changeEvent.target.value === 'true' ? true : false;
    this.setState({
      [changeEvent.target.name]: isTrue,
      isChanged: true,
    });
  };

  switchStudentOption = val => {
    this.setState({studentOption: val});
  }

  enablePresentationOption = val => {
    if (val === 'presentation') {
      this.setState({presentation: true});
    }
    if (val === 'poster') {
      this.setState({poster: true});
    }
  }

  disablePresentationOption = () => {
    this.setState({
      presentation : false,
      poster: false,
      graduationPresentation: false,
      graduationTalk: false,
    });
  }

  enablePresentation = () => {
    this.setState({
      presentation : true,
      poster: false,
    });
  }

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  };

  closeSave() {
    this.setState({
      saveModal: false,
    });
  }

  postAffiliation(changeEvent) {
    const newTitle = this.state.newAffiliationTitle;
    const existingAffiliation = this.state.affiliations.find(
      a => a.title === newTitle
    );

    if (existingAffiliation === undefined) {
      api('api/v0/affiliations/', 'POST', { title: newTitle })
        .then(newAffiliation => {
          const updatedAffiliations = [
            ...this.state.affiliations,
            newAffiliation,
          ];
          sortAffiliationsInPlace(updatedAffiliations);
          this.setState(
            {
              affiliations: updatedAffiliations,
              newAffiliationTitle: '',
              affiliation: newAffiliation.url,
            },
            () => this.toggleModal()
          );
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } else {
      this.setState(
        {
          newAffiliationTitle: '',
          affiliation: existingAffiliation.url,
        },
        () => this.toggleModal()
      );
    }
  }

  pullAffiliation() {
    return api('api/v0/affiliations/').then(affiliations => {
      sortAffiliationsInPlace(affiliations);
      return new Promise(resolve => this.setState({ affiliations }, resolve));
    });
  }

  loadRegistration() {
    const body = {
      user: this.props.userUrl,
      workshop: this.props.workshopUrl,
    };
    return api('api/v0/registrations/get_or_create/', 'POST', body)
      .then(json => {
        this.populateData(json);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  populateData(data) {
    console.log("inside populate data:",data)
    let slugUrlMap = new Map();
    let urlSlugMap = new Map();
    api('api/v0/registration_options', 'GET').then(json => {
      for (let i = 0; i < json.length; i++) {
        slugUrlMap.set(json[i]['slug'], json[i]['url']);
        urlSlugMap.set(json[i]['url'], json[i]['slug']);
      }
      this.populateOptions(data, urlSlugMap);
    });

    this.setState({
      paid: data['has_approved_payment'],
      registrationUrl: data['url'],
      workshopUrl: data['workshop'],
      likelihood: data['participation_status'],
      presentingThisYear: data['presenting'] || data['poster'] || data['graduation_presentation'] || data['graduation_talk'],
      adminPresentingThisYear: data['presenting'] || data['poster'] || data['graduation_presentation'] || data['graduation_talk'],
      presentation: data['presenting'],
      graduationPresentation: data['graduation_presentation'],
      graduationTalk: data['graduation_talk'],
      graduationDay: data['graduation_presentation'] && data['graduation_talk'],
      plenary: data['plenary'],
      poster: data['poster'],
      registrantType: data['registrant_type'],
      feetype_override: data['fee_type'],
    });
    this.loadPayment(data);
    this.populateProfile(data);
    this.populateWorkshop(data);
    this.populatePaper(data);
  }

  loadPayment(data) {
    // this.setState({
    //   paid: true,
    // });//tawwnnyyyy
    return api(data['url'], 'GET').then(registration => {
      if (registration.has_approved_payment) {
        this.setState({
          paid: true,
        });
      } else {
        api(registration.initiate_payment_url, 'POST',localStorage.getItem("invoice_number")!=="undefined" && localStorage.getItem("invoice_number") ? {
          invoice_number: localStorage.getItem("invoice_number"),
        } : {}).then(data => {
          this.setState({
            token: data.token,
            formUrl: data.form_url,
            checkStatusUrl: data.check_status_url,
            formReady: true,
          });
          localStorage.setItem("invoice_number",data.invoice_number)
          var urlParams = new URLSearchParams(window.location.search);
          if(urlParams.get("confirmationToken")!=null){
            this.triggerPaymentCheckStatus(urlParams.get("confirmationToken"))
            localStorage.removeItem("invoice_number")
          }
        });
      }
    });
  }

  triggerPaymentCheckStatus = transId => {
    api(this.state.checkStatusUrl, 'POST', {
      transaction_id: transId,
    }).then(data => {
      if (data.status === 'APPROVED') {
        this.setState({
          paid: true,
        });
      }
    });
  };

  onChangeTriggerOpen = event => {
    const form = event.target;
    event.preventDefault();
    new Promise(resolve =>
      this.setState(state => {
        if (!['PROBABLY', 'ALMOST_CERTAINLY'].includes(state.likelihood)) {
          return { likelihood: 'PROBABLY' };
        }
      }, resolve)
    )
      .then(() => this.saveProfile())
      .then(() => this.saveRegistration())
      .then(() => api(this.state.registrationUrl, 'GET'))
      .then(registration => {
        return api(registration.initiate_payment_url, 'POST');
      })
      .then(data => {
        this.setState(
          {
            token: data.token,
            formUrl: data.form_url,
            checkStatusUrl: data.check_status_url,
            formReady: true,
          },
        );
        form.submit();
      });
  };

  onPaymentComplete = transId => {
    this.triggerPaymentCheckStatus(transId);
  };

  onPaymentCanceled = () => {
    this.setState({ triggerOpen: false });
  };

  populateProfile(data) {
    const profile = data['user_profile'];
    this.setState({
      userProfileUrl: profile['url'],
      addProfilePicUrl: profile['add_profile_pic_url'],
      title: profile['honorific'],
      firstName: profile['first_name'],
      lastName: profile['last_name'],
      affiliation: profile['affiliation'] || '',
      formalName: profile['formal_name'],
      profilePicUrl: profile['profile_pic'],
      website: profile['website'],
      studentOption: profile['is_student'],
      phoneNum: profile['phone_number'],
      shirtType: profile['shirt_type'],
      shirtSize: profile['shirt_size'],
      nickname: profile['nickname'],
      firstNameOriginal: profile['first_name_original'],
      lastNameOriginal: profile['last_name_original'],
      emailOriginal: profile['email_original'],
      presentingDefault: profile['presenting_default'],
    });
  }

  populateOptions(data, urlSlugMap) {
    let slugArray = [];
    for (let i = 0; i < data['options'].length; i++) {
      slugArray.push(urlSlugMap.get(data['options'][i]));
    }

    if (slugArray.includes('ita23_sundayReception_selfOnly')) {
      this.setState({
        SundayReceptionOption: 'ita23_sundayReception_selfOnly',
      });
    }
    if (slugArray.includes('ita23_sundayReception_notAttending')) {
      this.setState({
        SundayReceptionOption: 'ita23_sundayReception_notAttending',
      });
    }
    if (slugArray.includes('ita23_sundayReception_selfPlus1')) {
      this.setState({
        SundayReceptionOption: 'ita23_sundayReception_selfPlus1',
      });
    }
    if (slugArray.includes('ita23_sundayReception_selfPlus2')) {
      this.setState({
        SundayReceptionOption: 'ita23_sundayReception_selfPlus2',
      });
    }

    if (slugArray.includes('ita23_banquetSelf_notAttending')) {
      this.setState({
        WednesdayBanquetOption: 'ita23_banquetSelf_notAttending',
      });
    }
    if (slugArray.includes('ita23_banquetSelf_selfOnly')) {
      this.setState({ WednesdayBanquetOption: 'ita23_banquetSelf_selfOnly' });
    }
    if (slugArray.includes('ita23_banquetSelf_selfPlus1')) {
      this.setState({ WednesdayBanquetOption: 'ita23_banquetSelf_selfPlus1' });
    }
    if (slugArray.includes('ita23_banquetSelf_selfPlus2')) {
      this.setState({ WednesdayBanquetOption: 'ita23_banquetSelf_selfPlus2' });
    }

    if (slugArray.includes('ita23_valentinesEvent_notAttending')) {
      this.setState({
        ValentinesEventOption: 'ita23_valentinesEvent_notAttending',
      });
    }
    if (slugArray.includes('ita23_valentinesEvent_selfOnly')) {
      this.setState({
        ValentinesEventOption: 'ita23_valentinesEvent_selfOnly',
      });
    }
    if (slugArray.includes('ita23_valentinesEvent_selfPlus1')) {
      this.setState({
        ValentinesEventOption: 'ita23_valentinesEvent_selfPlus1',
      });
    }
    if (slugArray.includes('ita23_valentinesEvent_selfPlus2')) {
      this.setState({
        ValentinesEventOption: 'ita23_valentinesEvent_selfPlus2',
      });
    }

    if (slugArray.includes('ita23_mondayLunch_attending')) {
      this.setState({
        monReceptionOption: 'ita23_mondayLunch_attending',
      });
    }
    if (slugArray.includes('ita23_mondayLunch_notAttending')) {
      this.setState({
        monReceptionOption: 'ita23_mondayLunch_notAttending',
      });
    }

    if (slugArray.includes('ita23_saturdayWorkshop_attending')) {
      this.setState({
        saturdayWorkshopOption: 'ita23_saturdayWorkshop_attending',
      });
    }
    if (slugArray.includes('ita23_saturdayWorkshop_notAttending')) {
      this.setState({
        saturdayWorkshopOption: 'ita23_saturdayWorkshop_notAttending',
      });
    }
  }

  populateWorkshop(data) {
    let dayArray = reverseAttendingDates(data['attending_dates']);
    const dayState = findConsec(dayArray)
      ? {
        nonConsecutiveDays: false,
        firstDay: findFirstDay(dayArray),
        lastDay: findLastDay(dayArray),
      }
      : {
        nonConsecutiveDays: true,
        nonConsecMon: dayArray[0],
        nonConsecTue: dayArray[1],
        nonConsecWed: dayArray[2],
        nonConsecThu: dayArray[3],
        nonConsecFri: dayArray[4],
      };
    this.setState(dayState);
  }

  populatePaper = data => {
    if (!data.talks) {
      console.warn('Registration data did not contain `talks`.');
      return;
    }
    if (data.talks.length !== 1) {
      console.warn('Registration data did not contain exactly one talk.');
      return;
    }
    const talkData = data['talks'][0];
    this.setState({
      talkUrl: talkData['url'],
      paperTitle: talkData['title'],
      paperAuthorsComment: talkData['authors_comment'],
      paperAbstract: talkData['abstract'],
      paperTopicComment: talkData['topic_comment'],
      paperComment: talkData['scheduling_comment'],
      paperUrl: talkData['paper_url'],
      addPaperUrl: talkData['add_paper_url'],
      videoUrl: talkData['video_url'],
      addVideoUrl: talkData['add_video_url'],
      adminComments: talkData['admin_comment']
    });
  };

  saveOptions(slugUrlMap) {
    let optionArray = [];
    if (this.state.SundayReceptionOption !== '') {
      optionArray.push(slugUrlMap.get(this.state.SundayReceptionOption));
    }

    if (this.state.WednesdayBanquetOption !== '') {
      optionArray.push(slugUrlMap.get(this.state.WednesdayBanquetOption));
    }

    /* if (this.state.ValentinesEventOption !== '') {
      optionArray.push(slugUrlMap.get(this.state.ValentinesEventOption));
    } */

    if (this.state.monReceptionOption !== '') {
      optionArray.push(slugUrlMap.get(this.state.monReceptionOption));
    }

    return optionArray;
  }

  saveProfile = () => {
    const affiliationValue =
      this.state.affiliation === '' ? null : this.state.affiliation;

    const adminFields = this.props.loggedInAsAdmin
      ? {
        nickname: this.state.nickname,
        presenting_default: this.state.presentingDefault,
      }
      : {};

    const body = {
      honorific: this.state.title,
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      affiliation: affiliationValue,
      website: this.state.website,
      is_student: this.state.studentOption,
      phone_number: this.state.phoneNum,
      shirt_type: this.state.shirtType,
      shirt_size: this.state.shirtSize,
      ...adminFields,
    };
    return api(this.state.userProfileUrl, 'PUT', body)
      .then(json => {
        console.log('Success:', JSON.stringify(json));
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  saveRegistration = () => {
    const dayArray = [
      this.state.nonConsecMon,
      this.state.nonConsecTue,
      this.state.nonConsecWed,
      this.state.nonConsecThu,
      this.state.nonConsecFri,
    ];
    const dates = getAttendingDates(
      this.state.firstDay,
      this.state.lastDay,
      this.state.nonConsecutiveDays,
      dayArray
    );
    const nonAdminFields = {
      attending_dates: dates,
      participation_status: this.state.likelihood,
    };
    const adminFields = this.props.loggedInAsAdmin
      ? {
        registrant_type: this.state.registrantType,
        fee_type: this.state.feetype_override,
        presentingThisYear: this.state.presentingThisYear,
        presentation: this.state.presentation,
        poster: this.state.poster,
        plenary: this.state.plenary,
        graduation_presentation: this.state.graduationPresentation,
        graduation_talk: this.state.graduationTalk
      }
      : {};

    return api('api/v0/registration_options', 'GET')
      .then(json => {
        const slugUrlMap = new Map();
        for (let i = 0; i < json.length; i++) {
          slugUrlMap.set(json[i]['slug'], json[i]['url']);
        }
        return this.saveOptions(slugUrlMap);
      })
      .then(regOptions => {
        return api(this.state.registrationUrl, 'PATCH', {
          ...nonAdminFields,
          ...adminFields,
          options: regOptions,
        });
      });
  };

  saveTalk = () => {
    const body = {
      title: this.state.paperTitle,
      authors_comment: this.state.paperAuthorsComment,
      abstract: this.state.paperAbstract,
      topic_comment: this.state.paperTopicComment,
      scheduling_comment: this.state.paperComment,
      admin_comment: this.state.adminComments,
    };
    return api(this.state.talkUrl, 'PATCH', body);
  };

  saveUser = () => {
    const body = {
      email: this.state.email
    };
    return api(this.props.userUrl, 'PUT', body);
  };

  saveChanges = () => {
    this.saveUser()
    this.saveProfile();
    this.saveTalk();
    this.saveRegistration()
      .then(reg => {
        const date = new Date();
        this.setState({
          lastSaveTime: date.toLocaleTimeString(),
          saveModal: true,
        });
      })
      .then(() => {
        window.scrollTo(0, 0);
      });
  };

  performVerifyEmail = () => {
    return apiRaw(this.state.markEmailVerifiedUrl, 'POST')
      .then(res => Promise.all([res.status, res.json()]))
      .then(([status, data]) => {
        if (status === 200) {
          this.setState({ emailIsVerified: true });
          alert(data.success);
        } else {
          alert(`Server error: ${JSON.stringify(data)}`);
        }
      });
  };

  updateProfilePicUrl = newProfilePicUrl =>
    this.setState({ profilePicUrl: newProfilePicUrl });

  updatePaperUrl = newPaperUrl => this.setState({ paperUrl: newPaperUrl });
  updateVideoUrl = newVideoUrl => this.setState({ videoUrl: newVideoUrl });

  getEffectiveFeeType = (isStudent, feeTypeOverride) => {
    if (feeTypeOverride === '') {
      return isStudent ? 'STUDENT' : 'FULL';
    }
    return feeTypeOverride;
  };

  getEffectiveFees = effectiveFeeType => {
    const regnFees = this.props.registrationFees[effectiveFeeType];
    if (regnFees === undefined) {
      console.warn(
        `Registration fees for fee type ${effectiveFeeType} not found`
      );
      return {
        basePrice: 'ERROR',
        dayPrice: 'ERROR',
        sunReceptionPrice: 'ERROR',
        wedBanquetPrice: 'ERROR',
        valentinesEventPrice: 'ERROR',
      };
    }

    const optionFees = new Map(
      regnFees['registration_options'].map(option => [option.slug, option.fee])
    );
    return {
      basePrice: regnFees['base'],
      dayPrice: regnFees['daily'],
      sunReceptionPrice: optionFees.get('ita23_sundayReception_selfOnly'),
      wedBanquetPrice: optionFees.get('ita23_banquetSelf_selfOnly'),
      valentinesEventPrice: optionFees.get('ita23_valentinesEvent_selfOnly'),
      satWorkshopPrice: optionFees.get('ita23_saturdaySelf_attending'),
    };
  };

  

  renderOthersRegnWarning = () => (
    <Alert color="primary">
      NOTE: You are not viewing your own registration, but rather that of{' '}
      {this.state.formalName}.
    </Alert>
  );

  render() {
    const effectiveFeeType = this.getEffectiveFeeType(
      this.state.studentOption,
      this.state.feetype_override
    );
    const effectiveFees = this.getEffectiveFees(effectiveFeeType);
    const error = dayCheck(this.state.firstDay, this.state.lastDay);
    // TODO handle error
    if (error) {
      // console.log('invalid days selected');
    }

    const isViewingOwnRegn = this.props.userUrl === this.props.loggedInUser.url;
    const othersRegnWarning = isViewingOwnRegn
      ? null
      : this.renderOthersRegnWarning();

    const paperNavItem = (
      <NavItem style={{ cursor: 'pointer' }}>
        <NavLink
          className={classnames({
            active: this.state.activeTab === '3',
          })}
          onClick={() => {
            this.toggle('3');
          }}
        >
          {this.state.presentation ? 'Presentation': this.state.poster ? 'Poster': this.state.graduationPresentation ? 'Grad Presentation' : this.state.graduationTalk ? 'Grad Talk' : 'Presentation'} 
        </NavLink>
      </NavItem>
    );

    const posterNavItem = (
      <NavItem style={{ cursor: 'pointer' }}>
        <NavLink
          className={classnames({
            active: this.state.activeTab === '4',
          })}
          onClick={() => {
            this.toggle('4');
          }}
        >
          Poster
        </NavLink>
      </NavItem>
    );

    const plenaryNavItem = (
      <NavItem style={{ cursor: 'pointer' }}>
        <NavLink
          className={classnames({
            active: this.state.activeTab === '5',
          })}
          onClick={() => {
            this.toggle('5');
          }}
        >
          Plenary
        </NavLink>
      </NavItem>
    );

    const graduationTalkNavItem = (
      <NavItem style={{ cursor: 'pointer' }}>
        <NavLink
          className={classnames({
            active: this.state.activeTab === '6',
          })}
          onClick={() => {
            this.toggle('6');
          }}
        >
          Grad Talk
        </NavLink>
      </NavItem>
    );

    const graduationPresentationNavItem = (
      <NavItem style={{ cursor: 'pointer' }}>
        <NavLink
          className={classnames({
            active: this.state.activeTab === '7',
          })}
          onClick={() => {
            this.toggle('7');
          }}
        >
          Grad Presentation
        </NavLink>
      </NavItem>
    );

    const adminNavItem = this.props.loggedInAsAdmin ? (
      <NavItem style={{ cursor: 'pointer' }}>
        <NavLink
          className={classnames({
            active: this.state.activeTab === '8',
          })}
          onClick={() => {
            this.toggle('8');
          }}
        >
          Administrator
        </NavLink>
      </NavItem>
    ) : null;

    const paperTabPane = (
      <TabPane tabId="3">
        <RegistrationPaper
          paperTitle={this.state.paperTitle}
          paperAuthorsComment={this.state.paperAuthorsComment}
          handleChange={this.handleChange}
          paperAbstract={this.state.paperAbstract}
          paperTopicComment={this.state.paperTopicComment}
          paperComment={this.state.paperComment}
          paperUrl={this.state.paperUrl}
          addPaperUrl={this.state.addPaperUrl}
          loggedInAsAdmin = {this.props.loggedInAsAdmin}
          adminComments = {this.state.adminComments}
          updatePaperUrl={this.updatePaperUrl}
          videoUrl={this.state.videoUrl}
          addVideoUrl={this.state.addVideoUrl}
          updateVideoUrl={this.updateVideoUrl}
          modal={this.state.modal}
          toggleModal={this.toggleModal}
          saveChanges={this.saveChanges}
        />
      </TabPane>
    );

    const posterTabPane = (
      <TabPane tabId="4">
        <RegistrationPaper
          paperTitle={this.state.paperTitle}
          paperAuthorsComment={this.state.paperAuthorsComment}
          handleChange={this.handleChange}
          paperAbstract={this.state.paperAbstract}
          paperTopicComment={this.state.paperTopicComment}
          paperComment={this.state.paperComment}
          paperUrl={this.state.paperUrl}
          addPaperUrl={this.state.addPaperUrl}
          loggedInAsAdmin = {this.props.loggedInAsAdmin}
          adminComments = {this.state.adminComments}
          updatePaperUrl={this.updatePaperUrl}
          videoUrl={this.state.videoUrl}
          addVideoUrl={this.state.addVideoUrl}
          updateVideoUrl={this.updateVideoUrl}
          modal={this.state.modal}
          toggleModal={this.toggleModal}
          saveChanges={this.saveChanges}
        />
      </TabPane>
    );
    
    const plenaryTabPane = (
      <TabPane tabId="5">
        <RegistrationPaper
          paperTitle={this.state.paperTitle}
          paperAuthorsComment={this.state.paperAuthorsComment}
          handleChange={this.handleChange}
          paperAbstract={this.state.paperAbstract}
          paperTopicComment={this.state.paperTopicComment}
          paperComment={this.state.paperComment}
          paperUrl={this.state.paperUrl}
          addPaperUrl={this.state.addPaperUrl}
          loggedInAsAdmin = {this.props.loggedInAsAdmin}
          adminComments = {this.state.adminComments}
          updatePaperUrl={this.updatePaperUrl}
          videoUrl={this.state.videoUrl}
          addVideoUrl={this.state.addVideoUrl}
          updateVideoUrl={this.updateVideoUrl}
          modal={this.state.modal}
          toggleModal={this.toggleModal}
          saveChanges={this.saveChanges}
        />
      </TabPane>
    );
    
    const graduationTalkTabPane = (
      <TabPane tabId="6">
        <RegistrationPaper
          paperTitle={this.state.paperTitle}
          paperAuthorsComment={this.state.paperAuthorsComment}
          handleChange={this.handleChange}
          paperAbstract={this.state.paperAbstract}
          paperTopicComment={this.state.paperTopicComment}
          paperComment={this.state.paperComment}
          paperUrl={this.state.paperUrl}
          addPaperUrl={this.state.addPaperUrl}
          loggedInAsAdmin = {this.props.loggedInAsAdmin}
          adminComments = {this.state.adminComments}
          updatePaperUrl={this.updatePaperUrl}
          videoUrl={this.state.videoUrl}
          addVideoUrl={this.state.addVideoUrl}
          updateVideoUrl={this.updateVideoUrl}
          modal={this.state.modal}
          toggleModal={this.toggleModal}
          saveChanges={this.saveChanges}
        />
      </TabPane>
    );

    const graduationPresentationTabPane = (
      <TabPane tabId="7">
        <RegistrationPaper
          paperTitle={this.state.paperTitle}
          paperAuthorsComment={this.state.paperAuthorsComment}
          handleChange={this.handleChange}
          paperAbstract={this.state.paperAbstract}
          paperTopicComment={this.state.paperTopicComment}
          paperComment={this.state.paperComment}
          paperUrl={this.state.paperUrl}
          addPaperUrl={this.state.addPaperUrl}
          loggedInAsAdmin = {this.props.loggedInAsAdmin}
          adminComments = {this.state.adminComments}
          updatePaperUrl={this.updatePaperUrl}
          videoUrl={this.state.videoUrl}
          addVideoUrl={this.state.addVideoUrl}
          updateVideoUrl={this.updateVideoUrl}
          modal={this.state.modal}
          toggleModal={this.toggleModal}
          saveChanges={this.saveChanges}
        />
      </TabPane>
    );

    const adminTabPane = this.props.loggedInAsAdmin ? (
      <TabPane tabId="8">
        <RegistrationAdmin
          email={this.state.email}
          firstNameOriginal={this.state.firstNameOriginal}
          lastNameOriginal={this.state.lastNameOriginal}
          nickname={this.state.nickname}
          emailOriginal={this.state.emailOriginal}
          feetype_override={this.state.feetype_override}
          presentingDefault={this.state.presentingDefault}
          adminPresentingThisYear={this.state.adminPresentingThisYear}
          presentation={this.state.presentation}
          graduationDay={this.state.graduationDay}
          graduationTalk={this.state.graduationTalk}
          poster={this.state.poster}
          plenary={this.state.plenary}
          graduationPresentation={this.state.graduationPresentation}
          inviter={this.state.inviter}
          registrantType={this.state.registrantType}
          handleChange={this.handleChange}
          handleBinaryOptionChange={this.handleBinaryOptionChange}
          handleCheckboxChange={this.handleCheckboxChange}
          saveChanges={this.saveChanges}
          onClickVerifyEmail={this.performVerifyEmail}
          emailIsVerified={this.state.emailIsVerified}
          switchPresentingThisYear={this.switchPresentingThisYear}
        />
      </TabPane>
    ) : null;

    const jumbotronClasses = classnames({
      [styles.regnJumbotron]: true,
      [styles.othersRegnJumbotron]: !isViewingOwnRegn,
    });

    const paymentRequired = !['EXEMPT', 'WAIVED'].includes(effectiveFeeType);
    let paymentAlert = null;
    if (paymentRequired && this.state.paid) {
      paymentAlert = (
        <Alert color="success">
          Thank you for your registration and payment to ITA 2023. If you need
          to modify your selections, please{' '}
          <a href="mailto:ita@ucsd.edu">contact us</a>.
        </Alert>
      );
    } else if (!paymentRequired) {
      paymentAlert = (
        <Alert color="success">
          You registration is marked as exempt from payment, so to complete
          registration, please complete all fields present and click "Save all
          tabs". If you believe this is an error, please{' '}
          <a href="mailto:ita@ucsd.edu">contact us</a>.
        </Alert>
      );
    }

    return (
      <Jumbotron fluid className={jumbotronClasses}>
        <div className="text-center">
          <h1 className="display-6">Account Information</h1>
          <p>
            Required fields in <span className="text-danger">red*</span>
          </p>
          {othersRegnWarning}
          {paymentAlert}
          <Alert
            color="info"
            isOpen={this.state.saveModal}
            toggle={this.closeSave}
            className="text-center"
          >
            Your registration information was saved successfully at{' '}
            {this.state.lastSaveTime}. Please reload the page to enable the Payment Button. 
          </Alert>
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
                  Profile
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
                  Workshop
                </NavLink>
              </NavItem>
              {this.state.presentingThisYear ? paperNavItem : null}
              {this.state.plenary ? plenaryNavItem : null}
              {adminNavItem}
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <RegistrationProfile
                  handleChange={this.handleChange}
                  handleOptionChange={this.handleOptionChange}
                  toggle={this.toggle}
                  toggleModal={this.toggleModal}
                  title={this.state.title}
                  firstName={this.state.firstName}
                  lastName={this.state.lastName}
                  affiliation={this.state.affiliation}
                  modal={this.state.modal}
                  className={this.state.className}
                  website={this.state.website}
                  email={this.state.email}
                  phoneNum={this.state.phoneNum}
                  profilePicUrl={this.state.profilePicUrl}
                  shirtSize={this.state.shirtSize}
                  shirtType={this.state.shirtType}
                  affiliations={this.state.affiliations}
                  postAffiliation={this.postAffiliation}
                  newAffiliationTitle={this.state.newAffiliationTitle}
                  saveChanges={this.saveChanges}
                  addProfilePicUrl={this.state.addProfilePicUrl}
                  updateProfilePicUrl={this.updateProfilePicUrl}
                  studentOption={this.props.studentOption}
                  switchPresentationType={this.switchPresentationType}
                  enablePresentation={this.enablePresentation}
                />
              </TabPane>
              <TabPane tabId="2">
                <RegistrationWorkshop
                  token={this.state.token}
                  formUrl={this.state.formUrl}
                  checkStatusUrl={this.state.checkStatusUrl}
                  formReady={this.state.formReady}
                  triggerOpen={this.state.triggerOpen}
                  registrationUrl={this.state.registrationUrl}
                  firstDay={this.state.firstDay}
                  lastDay={this.state.lastDay}
                  firstName={this.state.firstName}
                  lastName={this.state.lastName}
                  affiliation={this.state.affiliation}
                  nonConsecutiveDays={this.state.nonConsecutiveDays}
                  nonConsecMon={this.state.nonConsecMon}
                  nonConsecTue={this.state.nonConsecTue}
                  nonConsecWed={this.state.nonConsecWed}
                  nonConsecThu={this.state.nonConsecThu}
                  nonConsecFri={this.state.nonConsecFri}
                  SundayReceptionOption={this.state.SundayReceptionOption}
                  WednesdayBanquetOption={this.state.WednesdayBanquetOption}
                  ValentinesEventOption={this.state.ValentinesEventOption}
                  monReceptionOption={this.state.monReceptionOption}
                  saturdayWorkshopOption={this.state.saturdayWorkshopOption}
                  paid={this.state.paid}
                  paymentAlert={paymentAlert}
                  paymentRequired={paymentRequired}
                  likelihood={this.state.likelihood}
                  studentOption={this.state.studentOption}
                  handleChange={this.handleChange}
                  handleBinaryOptionChange={this.handleBinaryOptionChange}
                  handleCheckboxChange={this.handleCheckboxChange}
                  handleOptionChange={this.handleOptionChange}
                  changePaid={this.changePaid}
                  dayPrice={effectiveFees.dayPrice}
                  sunReceptionPrice={effectiveFees.sunReceptionPrice}
                  wedBanquetPrice={effectiveFees.wedBanquetPrice}
                  valentinesEventPrice={effectiveFees.valentinesEventPrice}
                  basePrice={effectiveFees.basePrice}
                  effectiveFeeType={effectiveFeeType}
                  saveChanges={this.saveChanges}
                  onChangeTriggerOpen={this.onChangeTriggerOpen}
                  onPaymentCanceled={this.onPaymentCanceled}
                  onPaymentComplete={this.onPaymentComplete}
                  shirtSize={this.state.shirtSize}
                  shirtType={this.state.shirtType}
                  title={this.state.title}
                  presentingThisYear={this.state.presentingThisYear}
                  switchStudentOption={this.switchStudentOption}
                  switchPresentingThisYear={this.switchPresentingThisYear}
                  enablePresentationOption={this.enablePresentationOption}
                  disablePresentationOption={this.disablePresentationOption}
                  isChanged={this.state.isChanged}
                  isSavedModal = {this.state.saveModal}
                  isAdmin = {this.props.loggedInAsAdmin}
                />
              </TabPane>
              {this.state.presentingThisYear ? paperTabPane : null}
              {this.state.plenary ? plenaryTabPane : null}
              {adminTabPane}
            </TabContent>
          </div>
        </Container>
      </Jumbotron>
    );
  }
}
