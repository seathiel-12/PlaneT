import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';

export default function Milestone() {
  return (
    <Timeline position="alternate">
      <TimelineItem>
            <TimelineOppositeContent
            sx={{ m: 'auto auto' }}
            align="right"
            variant="h4"
            color="text.secondary"
            >
                <Typography variant="h4" component="span" color='primary'>2020</Typography>
                <Typography>PlaneT founded in Benin</Typography>
            </TimelineOppositeContent>

            <TimelineSeparator>
            <TimelineConnector />
                <TimelineDot color='primary'></TimelineDot>
            <TimelineConnector />
            </TimelineSeparator>

            <TimelineContent sx={{ py: '12px', px: 2 }}></TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          variant="body2"
          align='right'
          color="text.secondary"
        >
                <Typography variant="h4" component="span" color='primary'>2021</Typography>
                <Typography>Reached 100,000 bookings</Typography>
        </TimelineOppositeContent>

        <TimelineSeparator>
          <TimelineConnector />
                <TimelineDot color="primary"></TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        
        <TimelineContent sx={{ py: '12px', px: 2 }}></TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          variant="body2"
          align='left'
          color="text.secondary"
        >
                <Typography variant="h4" component="span" color="primary">2022</Typography>
                <Typography>Expanded to 50+ airlines</Typography>
        </TimelineOppositeContent>

        <TimelineSeparator>
          <TimelineConnector />
                <TimelineDot color="primary"></TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        
        <TimelineContent sx={{ py: '12px', px: 2 }}></TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          variant="body2"
          align='right'
          color="text.secondary"
        >
                <Typography variant="h4" component="span" color='primary'>2023</Typography>
                <Typography>Launched mobile app</Typography>
        </TimelineOppositeContent>

        <TimelineSeparator>
          <TimelineConnector />
                <TimelineDot color="primary"></TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        
        <TimelineContent sx={{ py: '12px', px: 2 }}></TimelineContent>
      </TimelineItem>

  <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          variant="body2"
          align='left'
          color="text.secondary"
        >
                <Typography variant="h4" component="span" color='primary'>2024</Typography>
                <Typography>1 million happy travelers</Typography>
        </TimelineOppositeContent>

        <TimelineSeparator>
          <TimelineConnector />
                <TimelineDot color="primary"></TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        
        <TimelineContent sx={{ py: '12px', px: 2 }}></TimelineContent>
      </TimelineItem>

        <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          variant="body2"
          align='right'
          color="text.secondary"
        >
                <Typography variant="h4" component="span" color='primary'>2025</Typography>
                <Typography>200+ global destinations</Typography>
        </TimelineOppositeContent>

        <TimelineSeparator>
          <TimelineConnector />
                <TimelineDot color="primary"></TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        
        <TimelineContent sx={{ py: '12px', px: 2 }}></TimelineContent>
      </TimelineItem>

    </Timeline>
  );
}
