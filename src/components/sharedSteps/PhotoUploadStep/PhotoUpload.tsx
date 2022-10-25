import { useFormDataSubscription } from 'customHooks';
import { useGlobalContext } from 'state/globalState';

import { Question, FileUpload } from 'components/shared';
import { TSharedStepSimpleProps } from 'types/step';
import card from 'assets/images/Face.jpg';

const PhotoUploadStep = ({ handleNavigation, question }: TSharedStepSimpleProps) => {
  const file = useFormDataSubscription('ApplicantPhoto');
  const filename = useFormDataSubscription('filename');
  const applicationForMe = useFormDataSubscription('applicationForMe');
  const [globalState, globalStateDispatch] = useGlobalContext();
  const { isEditing } = globalState.form;
  const handleUpdateFile = (newFile: File | null) => {
    if (newFile === null) {
      file.set(null);
      filename.set(null);
    } else {
      file.set(newFile);
      filename.set(newFile.name);
    }
  };

  const handleContinue = () => {
    const isFileValid = file.save();
    const isFilenameValid = filename.save();
    if (!isFileValid || !isFilenameValid) return;
    if (isEditing) globalStateDispatch({ type: 'SHOW_SUMMARY_PAGE' });
    handleNavigation();
  };

  return (
    <Question question={question} handleContinue={handleContinue} showError={file.hasError}>
      <p>We&apos;ll use this on {applicationForMe.savedValue ? 'your' : 'their'} new pass.</p>
      <p>
        <strong>{applicationForMe.savedValue ? 'Your' : 'Their'} digital photo needs to</strong>
      </p>
      <ul>
        <li>have a plain, light-coloured background</li>
        <li>include {applicationForMe.savedValue ? 'your' : 'their'} shoulders</li>
        <li>show {applicationForMe.savedValue ? 'your' : 'their'} face clearly</li>
        <li>
          show {applicationForMe.savedValue ? 'you' : 'them'} without glasses, unless{' '}
          {applicationForMe.savedValue ? 'you' : 'they'} have to do so
        </li>
        <li>not use any filters</li>
      </ul>
      <p>
        <strong>Example photo</strong>
      </p>
      <p>
        <img className="wmnds-img wmnds-col-auto" src={card} alt="Passcard example" />
      </p>
      <FileUpload
        label={applicationForMe.savedValue ? 'Your photo' : 'Their photo'}
        hint="Files must be jpeg or png file format"
        accept=".png, .jpg, .jpeg"
        name="ApplicantPhoto"
        defaultFile={file.currentValue}
        updateFile={handleUpdateFile}
        error={file.error}
      />
    </Question>
  );
};

export default PhotoUploadStep;
