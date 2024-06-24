import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { Grid ,Card, CardContent } from '@mui/material';
export default function DashboardLoaderAnimation() {
  return (
    <Grid container spacing={2}>
        {
            [1,2,3,4,5,6].map((index)=>(
                <Grid item key={index} xs={12} sm={6} md={4}> 
                <Box style={{display:'flex',flexDirection: 'column', minWidth: '295px'}}>
                <CardContent style={{flex:1}}>
                    <Skeleton variant='rectangular' height={150} animation="wave"/>
                    <Skeleton variant='text' animation="wave" />
                    <Skeleton variant='text' animation="wave" />
                    <Skeleton variant='text' animation="wave" />
                </CardContent>
                </Box>
                </Grid>

            ))
        }
    </Grid>
  );
}