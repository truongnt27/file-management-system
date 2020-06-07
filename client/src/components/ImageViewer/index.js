import React, { useEffect } from 'react';
import { Lightbox } from 'react-modal-image';
import { useDispatch, useSelector } from 'react-redux';
import { Actions, Selectors } from 'state/modules/app/files';

import { get } from 'lodash';
export function ImageViewer({ open, onClose, src, alt }) {

  const closeLightbox = () => {
    onClose && onClose();
  };
  return (
    <div>
      {
        open &&
        <Lightbox
          alt={alt}
          large={src}
          medium={src}
          onClose={closeLightbox}
        />
      }
    </div>
  )
}

const ImageViewerSmartComponent = ({ fileId, open, onClose }) => {
  const fileStores = useSelector(Selectors.filesStore);
  const dispatch = useDispatch();

  useEffect(() => {
    fileStores.status === 'INIT'
      && dispatch({ type: Actions.FETCH_FILES })
  }, [fileStores.status])

  const file = get(fileStores, ['byId', fileId], {})
  const { name = '' } = file;
  return (
    <ImageViewer
      alt={name}
      onClose={onClose}
      open={open}
      src={`http://localhost:3002/api/files/${fileId}/download`}
    />
  )
}

export default ImageViewerSmartComponent
