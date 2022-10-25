import { useGlobalContext } from 'state/globalState';
import { BackButton } from 'components/shared';

import useFormDataSubscription from 'customHooks/useFormDataSubscription';
import StartPage from './StartPage';
import StartPageAlt from './StartPage/StartPageAlt';
import Form from './Questions';
import Summary from './Summary';
import SuccessPage from './SuccessPage';

import s from './Form.module.scss';

// Debugger
import Debugger from './Debugger';

const isDevelopmentEnv = process.env.NODE_ENV === 'development';

const ViewToShow = () => {
  const [globalState] = useGlobalContext();
  const { isStarted, isEditing, isFinished, isSubmitted } = globalState.form;
  const param = window.location.href.indexOf('?alt=') > 0;
  const showStartPage = !isStarted && !param;
  const showStartPageAlt = !isStarted && param;
  const showForm = isStarted && (!isFinished || isEditing);
  const showSummary = isStarted && isFinished && !isEditing && !isSubmitted;
  const showSuccess = isStarted && isFinished && !isEditing && isSubmitted;
  const showCardStyles = !showStartPage && !showSuccess;
  const alternateStart = useFormDataSubscription('alternateStart').savedValue;
  const showBack = param ? alternateStart : true;

  return (
    <div className="wmnds-container wmnds-p-t-sm wmnds-p-b-lg wmnds-grid">
      {!showStartPage && !showSuccess && showBack && !showSummary && (
        <div className="wmnds-col-1 wmnds-m-b-lg">
          <BackButton />
        </div>
      )}
      <div className="wmnds-col-1 wmnds-col-md-2-3">
        <div className={`${showCardStyles ? `${s.card} bg-white` : ''} wmnds-m-b-lg`}>
          {showStartPage && <StartPage />}
          {showStartPageAlt && <StartPageAlt />}
          {showForm && <Form />}
          {showSummary && <Summary />}
          {showSuccess && <SuccessPage />}
        </div>
      </div>
      {showForm && isDevelopmentEnv && (
        <div className="wmnds-col-md-1-4 wmnds-p-l-md">
          <Debugger />
        </div>
      )}
    </div>
  );
};

export default ViewToShow;
