import { Routes, Route } from "react-router-dom";

import Braintree from './Braintree/Braintree';
import Exchange from './Exchange/Exchange';
import PageNotFound from './PageNotFound';

function PageRouter() {
  return (
    <Routes>
      <Route index element={<Exchange />} />
      <Route path="top-up" element={<Braintree />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default PageRouter;
