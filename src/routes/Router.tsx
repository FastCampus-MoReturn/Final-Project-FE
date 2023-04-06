import { Route, Routes } from 'react-router-dom';
import NotFound from '@/pages/NotFound';
import PdfSend from '@/pages/PdfSend';
import Commentary from '@/pages/Commentary';
import PDFComp from '@/components/pdf-send/step02/PDFComp';
import InfoCheckPage from '@/pages/InfoCheckPage';
import PdfStep from '@/pages/PdfStep';

import PdfCommentary2 from '@/pages/PdfCommentary2';
import Dictionary from '@/pages/Dictionary';

const Router = () => {
  return (
    <Routes>
      <Route path="infocheck" element={<InfoCheckPage />} />
      <Route path="dictionary" element={<Dictionary />} />
      <Route path="pdf-send" element={<PdfSend />} />
      <Route path="step" element={<PdfStep />} />
      <Route path="commentary" element={<Commentary />} />
      <Route path="commentary" element={<PdfCommentary2 />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
