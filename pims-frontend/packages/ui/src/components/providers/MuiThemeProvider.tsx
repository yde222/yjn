'use client';

import { createTheme, THEME_ID, ThemeProvider } from '@mui/material/styles';
import React from 'react';

export const MuiThemeProvider = (
  props: React.PropsWithChildren<{
    mode: string | undefined;
  }>,
) => {
  // eslint-disable-next-line import/no-named-as-default-member
  const theme = React.useMemo(() => {
    return createTheme({
      typography: {
        fontFamily: 'Pretendard Variable',
      },
      components: {
        MuiStepIcon: {
          styleOverrides: {
            root: {
              '&': {
                gap: '0.5rem',
                color: 'var(--text-assistive-1)',
                width: '20px',
                height: '20px',
              },
              '&.Mui-active': {
                color: 'var(--primary-normal);',
              },
            },
          },
        },
        MuiStepLabel: {
          styleOverrides: {
            label: {
              '&': {
                color: 'var(--text-assistive-1)',
                fontSize: '16px',
                fontWeight: 600,
              },
              '&.Mui-active': {
                color: 'var(--primary-normal)',
                fontSize: '16px',
                fontWeight: 600,
              },
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              boxShadow: 'none',
              borderWidth: '1px',
            },
          },
        },
        MuiTableRow: {
          styleOverrides: {
            root: {
              boxShadow: 'none',
            },
          },
        },
        MuiTableCell: {
          styleOverrides: {
            head: {
              boxShadow: 'none',
            },
            root: {
              '.Mui-TableHeadCell-Content-Labels': {
                width: '100%',
                justifyContent: 'space-between',
              },
            },
          },
        },
        MuiTableHead: {
          styleOverrides: {
            root: {
              boxShadow: 'none',
            },
          },
        },
      },
      palette: {
        primary: {
          main: 'hsl(var(--primary))',
          contrastText: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          main: 'hsl(var(--secondary))',
          contrastText: 'hsl(var(--secondary-foreground))',
        },
        error: {
          main: 'hsl(var(--destructive))',
          contrastText: 'hsl(var(--destructive-foreground))',
        },
        background: {
          default: 'hsl(var(--background-normal))',
          paper: 'hsl(var(--card))',
        },
        text: {
          primary: 'hsl(var(--foreground))',
          secondary: 'hsl(var(--muted-foreground))',
          disabled: 'hsl(var(--text-disabled))',
        },
      },
    });
  }, [props.mode]);

  return (
    <ThemeProvider theme={{ [THEME_ID]: theme }}>
      {props.children}
    </ThemeProvider>
  );
};
