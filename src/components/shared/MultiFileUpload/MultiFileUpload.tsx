/* eslint-disable react/no-array-index-key */
import { useState } from 'react';

import { Icon } from 'components/shared';

import s from './MultiFileUpload.module.scss';
import { TMultiFileUploadProps } from './MultiFileUpload.types';

// prettier-ignore

const FileUpload = ({
  name,
  label,
  hint,
  defaultFiles,
  updateFiles,
  error,
  accept,
}: TMultiFileUploadProps): JSX.Element => {
  const [isFileInputFocused, setIsFileInputFocused] = useState(false); // This is used to emulate the input focus class on the label
  const handleFocus = () => setIsFileInputFocused(true);
  const handleBlur = () => setIsFileInputFocused(false);

  // const dFiles = defaultFiles ? [...defaultFiles] : [];

  // const previewUrl = defaultFile ? URL.createObjectURL(defaultFile) : undefined;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target?.files;
    const files = fileList ? [...fileList] : [];

    if (!files) return;
    updateFiles(files);
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

        <label
          htmlFor={name}
          className={`wmnds-btn wmnds-btn--primary ${isFileInputFocused ? s.fileUploadLabelFocused : ''
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
            multiple
          />
        </label>
        <span className="wmnds-m-l-md">No files selected</span>

        {defaultFiles ? (defaultFiles.map((file, i) => (
          // <li key={i}>
          // {file.name} - {file.type}
          // </li>
          <>
            <div key={i} className={`${s.fileUploadUploaded}`}>
              <button
                className="wmnds-btn wmnds-btn--destructive"
                type="button"
                name={i.toString()}
                id={i.toString()}
                title="Remove uploaded file"
                onClick={() => updateFiles(null)}
              >
                Remove file
                <Icon className="wmnds-btn__icon wmnds-btn__icon--right" iconName="general-trash" />
              </button>
              <span className="wmnds-m-l-md">{file.name}</span>
            </div>
            <div className="wmnds-m-t-lg">
              <img className={s.fileUploadPreview} src={URL.createObjectURL(file)} alt="preview" />
            </div>
          </>
        ))) : (<></>)}

      </div>
    </fieldset>
  );
};

export default FileUpload;
