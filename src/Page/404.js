import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Container, Typography } from '@mui/material';

const PageNotFound = () => {
  // Set document title directly
  React.useEffect(() => {
    document.title = 'Error: Not Found | Carpatin Free';
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        flexGrow: 1
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          px: 5,
          py: 14,
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Box
          sx={{
            '& img': {
              maxWidth: '100%'
            }
          }}
        >
          <img src="http://localhost:3001/assets/illustration-not-found.svg" alt="Illustration Not Found" />
        </Box>
        <Typography
          align="center"
          sx={{ my: 2 }}
          variant="h3"
        >
          Nothing here!
        </Typography>
        <Typography
          align="center"
          color="text.secondary"
          variant="body2"
        >
          The page requested does not exist.
        </Typography>
        <Button
          to="/"
          component={RouterLink}
          sx={{ mt: 2 }}
          variant="contained"
          color="primary"
        >
          Take me home
        </Button>
      </Container>
    </Box>
  );
};

export default PageNotFound;
