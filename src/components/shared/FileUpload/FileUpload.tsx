import { useState } from 'react';

import { Icon } from 'components/shared';
import { Nullable } from 'types/helpers';
import { TError } from 'types/validation';
import compressImage from 'helpers/compressImage';
import formatFileSize from 'helpers/formatFileSize';

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
  maxSizeBytes,
}: TFileUploadProps): JSX.Element => {
  const [isFileInputFocused, setIsFileInputFocused] = useState(false);
  const [sizeError, setSizeError] = useState<Nullable<TError>>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const handleFocus = () => setIsFileInputFocused(true);
  const handleBlur = () => setIsFileInputFocused(false);

  const previewUrl = defaultFile ? URL.createObjectURL(defaultFile) : undefined;

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target?.files;
    const file = fileList ? fileList[0] : null;

    if (!file) return;
    if (maxSizeBytes && file.size > maxSizeBytes) {
      if (file.type.startsWith('image/')) {
        setSizeError(null);
        setIsCompressing(true);
        try {
          const compressed = await compressImage(file, maxSizeBytes);
          setIsCompressing(false);
          updateFile(compressed);
        } catch {
          setIsCompressing(false);
          setSizeError({ message: 'Could not compress image. Please choose a smaller file.' });
        }
      } else {
        setSizeError({
          message: `File must be under ${(maxSizeBytes / (1024 * 1024)).toFixed(0)} MB`,
        });
      }
      return;
    }
    setSizeError(null);
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
        className={`wmnds-fe-group ${s.fileUploadFeGroup} ${
          error || sizeError ? 'wmnds-fe-group--error' : ''
        }`}
      >
        {sizeError && <span className="wmnds-fe-error-message">{sizeError.message}</span>}
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
              <span className="wmnds-m-l-md">
                {defaultFile.name} ({formatFileSize(defaultFile.size)})
              </span>
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
              } ${isCompressing ? 'wmnds-btn--disabled' : ''}`}
            >
              {isCompressing ? 'Compressing...' : 'Choose file'}
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
                disabled={isCompressing}
              />
            </label>
            <span className="wmnds-m-l-md">
              {isCompressing ? 'Compressing image...' : 'No file selected'}
            </span>
          </>
        )}
      </div>
    </fieldset>
  );
};

export default FileUpload;
