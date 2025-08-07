import { Card, CardContent, CardActions, Typography } from '@mui/material';
import React from 'react'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


function ReactSkeleton() {
  return (
       <Card sx={{ minHeight: 350,width:300, borderRadius: 2, boxShadow: 3}}>
      <Skeleton height={180} width="100%" sx={{padding:"0rem 1rem" }} />

      <CardContent>
        <Typography variant="h6">
          <Skeleton width="60%" />
        </Typography>
        <Typography variant="body2" color="textSecondary">
          <Skeleton width="80%" />
        </Typography>
      </CardContent>

      <CardActions>
        <Skeleton width={80} height={36} />
        <Skeleton width={80} height={36} />
      </CardActions>
    </Card>

  )
}

export default ReactSkeleton