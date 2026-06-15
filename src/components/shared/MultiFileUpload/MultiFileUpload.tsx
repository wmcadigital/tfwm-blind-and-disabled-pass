/* eslint-disable react/no-array-index-key */
import { useState } from 'react';

import { Icon } from 'components/shared';
import { Nullable } from 'types/helpers';
import { TError } from 'types/validation';
import compressImage from 'helpers/compressImage';
import formatFileSize from 'helpers/formatFileSize';

import s from './MultiFileUpload.module.scss';
import { TMultiFileUploadProps } from './MultiFileUpload.types';

const MultiFileUpload = ({
  name,
  label,
  hint,
  maxFiles,
  defaultFiles,
  updateFiles,
  removeFile,
  error,
  accept,
  maxSizeBytes,
}: TMultiFileUploadProps): JSX.Element => {
  const [isFileInputFocused, setIsFileInputFocused] = useState(false);
  const [sizeError, setSizeError] = useState<Nullable<TError>>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const handleFocus = () => setIsFileInputFocused(true);
  const handleBlur = () => setIsFileInputFocused(false);

  const selectedFiles = defaultFiles ? [...defaultFiles] : [];
  const fileInputText = () => {
    if (isCompressing) return 'Compressing images...';
    return selectedFiles.length > 0 ? 'Add more files' : 'No files selected';
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const filesArray = e.target?.files ? [...e.target.files] : [];
    e.target.value = '';

    if (filesArray.length === 0) return;

    if (maxSizeBytes) {
      const oversizedNonImage = filesArray.some(
        (f) => f.size > maxSizeBytes && !f.type.startsWith('image/'),
      );

      if (oversizedNonImage) {
        setSizeError({
          message: `Each file must be under ${(maxSizeBytes / (1024 * 1024)).toFixed(0)} MB`,
        });
        return;
      }

      const oversizedImages = filesArray.filter(
        (f) => f.size > maxSizeBytes && f.type.startsWith('image/'),
      );

      if (oversizedImages.length > 0) {
        setSizeError(null);
        setIsCompressing(true);
        try {
          const compressedFiles = await Promise.all(
            filesArray.map(async (f) => {
              if (f.size > maxSizeBytes) {
                return compressImage(f, maxSizeBytes);
              }
              return f;
            }),
          );
          setIsCompressing(false);
          const files = [...selectedFiles, ...compressedFiles];
          updateFiles(files.slice(0, maxFiles));
        } catch (err) {
          setIsCompressing(false);
          setSizeError({ message: (err as Error).message });
        }
      } else {
        const files = [...selectedFiles, ...filesArray];
        updateFiles(files.slice(0, maxFiles));
      }
    } else {
      const files = [...selectedFiles, ...filesArray];
      updateFiles(files.slice(0, maxFiles));
    }
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

        <label
          htmlFor={name}
          className={`wmnds-btn wmnds-btn--primary ${
            isFileInputFocused ? s.fileUploadLabelFocused : ''
          } ${isCompressing ? 'wmnds-btn--disabled' : ''}`}
        >
          {isCompressing ? 'Compressing...' : 'Choose file'}
          <Icon className="wmnds-btn__icon wmnds-btn__icon--right" iconName="general-paperclip" />
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
            disabled={isCompressing}
          />
        </label>
        <span className="wmnds-m-l-md">{fileInputText()}</span>

        {defaultFiles
          ? defaultFiles.map((file, i) => (
              <div key={i} className={`wmnds-m-t-md ${s.fileUploadUploaded}`}>
                <button
                  className="wmnds-btn wmnds-btn--destructive"
                  type="button"
                  name={i.toString()}
                  id={i.toString()}
                  title="Remove uploaded file"
                  onClick={() => removeFile(file)}
                >
                  Remove file
                  <Icon
                    className="wmnds-btn__icon wmnds-btn__icon--right"
                    iconName="general-trash"
                  />
                </button>
                <span className="wmnds-m-l-md">
                  {file.name} ({formatFileSize(file.size)})
                </span>
              </div>
            ))
          : null}
      </div>
    </fieldset>
  );
};

export default MultiFileUpload;
