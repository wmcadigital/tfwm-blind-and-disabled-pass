import { useFormDataSubscription } from 'customHooks';
import { Question, FileUpload } from 'components/shared';
import { TSharedStepSimpleProps } from 'types/step';

const PhotoUploadStep = ({ handleNavigation, question }: TSharedStepSimpleProps) => {
  const file = useFormDataSubscription('ApplicantPhoto');
  const filename = useFormDataSubscription('filename');
  const applicationForMe = useFormDataSubscription('applicationForMe');

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
    handleNavigation();
  };

  return (
    <Question question={question} handleContinue={handleContinue} showError={file.hasError}>
      <p>We&apos;ll use this on {applicationForMe.savedValue ? 'your' : 'their'} new pass.</p>
      <p>
        This must be a clear portrait photo of {applicationForMe.savedValue ? 'your' : 'their'} face
        without any filters.
      </p>
      <FileUpload
        label="Your photo"
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
