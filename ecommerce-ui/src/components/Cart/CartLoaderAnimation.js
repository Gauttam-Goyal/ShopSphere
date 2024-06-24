import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { Grid, Card, CardContent } from '@mui/material';
export default function LoaderAnimation() {
  return (
    [1, 2, 3, 4, 5, 6].map((index) => (
      <Grid item key={index}>
        <Box style={{ display: 'flex', flexDirection: 'column', minWidth: '295px' }}>
          <CardContent style={{ flex: 1 }}>
            <Skeleton variant='rectangular' height={150} animation="wave" />
          </CardContent>
        </Box>
      </Grid>

    ))
  );
}