/* eslint-disable react/no-array-index-key */
import { TProps } from './MultiFileCell.types';

const FileCell = ({ filesConfig }: TProps) => {
  const amount = filesConfig.length;

  return (
    <>
      {filesConfig.map((fileConfig, index) => {
        if (!fileConfig.files) return <></>;
        return fileConfig.files.map((file, i) => (
          <div key={i}>
            <p className="wmnds-m-b-none">{fileConfig.title}</p>
            <p className={index + 1 === amount ? 'wmnds-m-b-none' : 'wmnds-m-b-sm'}>{file.name}</p>
          </div>
        ));
      })}
    </>
  );
};

export default FileCell;
