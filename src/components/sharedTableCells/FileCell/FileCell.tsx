import { TProps } from './FileCell.types';

const FileCell = ({ filesConfig }: TProps) => {
  const amount = filesConfig.length;

  return (
    <>
      {filesConfig.map((fileConfig, index) => {
        if (!fileConfig.file) return <></>;
        return (
          <div key={fileConfig.file.name}>
            <p className="wmnds-m-b-none">{fileConfig.title}</p>
            <p className={index + 1 === amount ? 'wmnds-m-b-none' : 'wmnds-m-b-sm'}>
              {fileConfig.file.name}
            </p>
          </div>
        );
      })}
    </>
  );
};

export default FileCell;
