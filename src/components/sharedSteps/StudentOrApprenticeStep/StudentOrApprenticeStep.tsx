/* eslint-disable */ 
import { useFormDataSubscription } from 'customHooks';
import { useFormDataContext } from 'state/formDataState';
import { Question, Radios } from 'components/shared';
import { TProps } from './StudentOrApprenticeStep.types';

import EmployerStep from './EmployerStep/EmployerStep';
import SchoolOrCollegeStep from './SchoolCollegeStep/SchoolOrCollegeStep';

const StudentOrApprenticeStep = ({
  question,
  handleNavigation,
  employerQuestion,
  schoolOrCollegeQuestion,
}: TProps) => {
  const isApprentice = useFormDataSubscription('isApprentice');
  const [formDataState] = useFormDataContext();
  const stateIsApprentice = formDataState.isApprentice;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === 'true') return isApprentice.set(true);
    if (value === 'false') return isApprentice.set(false);
  };

  const handleContinue = () => {
    isApprentice.save();
  };
  console.log('s', isApprentice.hasCurrentValue, stateIsApprentice);
  return (
    <div>
      {stateIsApprentice === null && (
        <Question question={question} handleContinue={handleContinue} showError={isApprentice.hasError}>  
          <Radios
            name="studentOrApprentice"
            error={isApprentice.error}
            currentValue={isApprentice.currentValue}
            radios={[
              {
                text: 'Student',
                info: '',
                html: '',
                value: false,
              },
              {
                text: 'Apprentice',
                info: '',
                html: '',
                value: true,
              },
            ]}
            onChange={handleChange}
          />
        </Question>
      )}
      {stateIsApprentice !== null && (
        <div>
          {/* Employer */}
          {isApprentice.currentValue === true && (
            <EmployerStep question={employerQuestion} handleNavigation={handleNavigation} />
          )}
          {/* School or college */}
          {isApprentice.currentValue === false && (
            <SchoolOrCollegeStep
              question={schoolOrCollegeQuestion}
              handleNavigation={handleNavigation}
            />
          )}
          </div>
      )}
      </div>
  );
};

export default StudentOrApprenticeStep;
