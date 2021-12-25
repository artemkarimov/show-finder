import type { FunctionComponent } from 'react';

import Header from '@components/header';

const Layout: FunctionComponent = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default Layout;
