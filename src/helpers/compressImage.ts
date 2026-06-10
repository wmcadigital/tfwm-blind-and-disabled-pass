const MAX_DIMENSION = 1200;

const loadImage = (file: File): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };
    img.src = url;
  });

const compressImage = async (file: File, maxSizeBytes: number): Promise<File> => {
  const img = await loadImage(file);

  let { width, height } = img;
  if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
    const ratio = Math.min(MAX_DIMENSION / width, MAX_DIMENSION / height);
    width = Math.round(width * ratio);
    height = Math.round(height * ratio);
  }

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');
  ctx.drawImage(img, 0, 0, width, height);

  const toBlob = (quality: number): Promise<Blob> =>
    new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error('Canvas toBlob returned null'));
        },
        'image/jpeg',
        quality,
      );
    });

  const compressDownTo = async (quality: number): Promise<Blob> => {
    const blob = await toBlob(quality);
    if (blob.size > maxSizeBytes && quality > 0.2) {
      return compressDownTo(Math.round((quality - 0.1) * 10) / 10);
    }
    return blob;
  };

  const blob = await compressDownTo(0.8);

  const newName = file.name.replace(/\.\w+$/, '.jpg');
  return new File([blob], newName, { type: 'image/jpeg' });
};

export default compressImage;
