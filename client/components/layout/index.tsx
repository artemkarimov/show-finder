import type { FunctionComponent } from 'react';

import Header from '../header';

const Layout: FunctionComponent = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default Layout;
