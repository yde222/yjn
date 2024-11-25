import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import React from 'react';

export const MuiAppRouterCacheProvider = (props: React.PropsWithChildren) => {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      {props.children}
    </AppRouterCacheProvider>
  );
};
