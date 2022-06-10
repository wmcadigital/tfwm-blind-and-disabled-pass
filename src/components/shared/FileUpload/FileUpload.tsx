import { useState } from 'react';

import { Icon } from 'components/shared';

import s from './FileUpload.module.scss';
import { TFileUploadProps } from './FileUpload.types';

const FileUpload = ({
  name,
  label,
  hint,
  defaultFile,
  updateFile,
  error,
  accept,
}: TFileUploadProps): JSX.Element => {
  const [isFileInputFocused, setIsFileInputFocused] = useState(false); // This is used to emulate the input focus class on the label
  const handleFocus = () => setIsFileInputFocused(true);
  const handleBlur = () => setIsFileInputFocused(false);

  const previewUrl = defaultFile ? URL.createObjectURL(defaultFile) : undefined;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target?.files;
    const file = fileList ? fileList[0] : null;

    if (!file) return;
    updateFile(file);
  };

  return (
    <fieldset className="wmnds-fe-fieldset">
      <legend className="wmnds-fe-fieldset__legend">
        <p className="wmnds-m-b-md">
          <strong>{label}</strong>
        </p>
        <p className="wmnds-m-b-sm">{hint}</p>
      </legend>
      <div
        className={`wmnds-fe-group ${s.fileUploadFeGroup} ${error ? 'wmnds-fe-group--error' : ''}`}
      >
        {/* If there is an error, show here */}
        {error && <span className="wmnds-fe-error-message">{error?.message}</span>}

        {defaultFile ? (
          <>
            <div className={`${s.fileUploadUploaded}`}>
              <button
                className="wmnds-btn wmnds-btn--destructive"
                type="button"
                name={name}
                id={name}
                title="Remove uploaded file"
                onClick={() => updateFile(null)}
              >
                Remove file
                <Icon className="wmnds-btn__icon wmnds-btn__icon--right" iconName="general-trash" />
              </button>
              <span className="wmnds-m-l-md">{defaultFile.name}</span>
            </div>
            {defaultFile.type.indexOf('image') > -1 && (
              <div className="wmnds-m-t-lg">
                <img className={s.fileUploadPreview} src={previewUrl} alt="preview" />
              </div>
            )}
          </>
        ) : (
          <>
            <label
              htmlFor={name}
              className={`wmnds-btn wmnds-btn--primary ${
                isFileInputFocused ? s.fileUploadLabelFocused : ''
              }`}
            >
              Choose file
              <Icon
                className="wmnds-btn__icon wmnds-btn__icon--right"
                iconName="general-paperclip"
              />
              <input
                type="file"
                name={name}
                id={name}
                onBlur={handleBlur}
                onFocus={handleFocus}
                onChange={handleChange}
                className={s.fileUpload}
                accept={accept}
              />
            </label>
            <span className="wmnds-m-l-md">No file selected</span>
          </>
        )}
      </div>
    </fieldset>
  );
};

export default FileUpload;
