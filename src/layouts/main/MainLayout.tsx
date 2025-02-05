import {Box, Container, Typography} from '@mui/material';
import {PropsWithChildren} from 'react';
import styles from './MainLayout.module.scss';

export default function MainLayout({children}: PropsWithChildren) {
  return (
    <Box>
      <header>
        <Container>
          <Box sx={{p: '10px 0', display: 'flex', justifyContent: 'center'}}>
            <a href={'/'} className={styles.logo}>
              <Typography textAlign={'center'} variant="h1">
                EASY FLIGHTS
              </Typography>
            </a>
          </Box>
        </Container>
      </header>

      <main>{children}</main>
    </Box>
  );
}
