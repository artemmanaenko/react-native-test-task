import type { PropsWithChildren } from 'react';

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <main className="layout">
      <header className="layout-header">
        <h1>Orders</h1>
        <p>Web reference implementation</p>
      </header>
      {children}
    </main>
  );
};
