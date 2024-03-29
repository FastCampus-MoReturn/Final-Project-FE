import { SetStateAction } from 'react';
import _ from 'lodash';
import { errorMessage } from '@/apis/auth';

const dragEvent = (
  isDraggingSetter: (arg0: boolean) => void,
  cb: (oneFile: SetStateAction<File>) => void,
) => {
  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    isDraggingSetter(true);
  };
  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    isDraggingSetter(false);
  };
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    _.throttle(
      () => {
        if (e.dataTransfer.files) {
          isDraggingSetter(true);
        }
      },
      1000,
      { leading: true },
    );
  };
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // 파일 타입 체크
    const files = Array.from(e.dataTransfer.files).filter((file) => {
      // image/jpeg, image/png, image/gif, application/pdf

      if (file.type !== 'application/pdf') {
        errorMessage('pdf 파일만 업로드 가능합니다');
        return false;
      }
      return true;
    });
    // 파일 하나만 업로드하도록 제한

    if (files.length > 1) {
      errorMessage(`한 개 이상의 파일이 선택되어
"${files[0].name}"
파일만 업로드 되었습니다`);
    } else if (files.length === 0) {
      errorMessage(`pdf 파일이 선택되지 않았습니다`);
      isDraggingSetter(false);
      return;
    }

    cb(e.dataTransfer.files[0]);
    isDraggingSetter(false);
  };
  return { onDragEnter, onDragLeave, onDragOver, onDrop };
};

export default dragEvent;
