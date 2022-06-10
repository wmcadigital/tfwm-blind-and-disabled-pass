import { TProps } from './ImageCell.types';

const ImageCell = ({ image }: TProps) => {
  return (
    <>
      <p className="wmnds-m-b-sm">{image?.name}</p>
      <img src={image && window.URL.createObjectURL(image)} alt="" />
    </>
  );
};

export default ImageCell;
