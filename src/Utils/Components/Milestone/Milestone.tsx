import { useLayoutEffect, useRef } from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  ['2020', 'PlaneT founded in Benin'],
  ['2021', 'Reached 100,000 bookings'],
  ['2022', 'Expanded to 50+ airlines'],
  ['2023', 'Launched mobile app'],
  ['2024', '1 million happy travelers'],
  ['2025', '200+ global destinations'],
] as const;

const dateMutedColor = '#aeb8c5';
const dateActiveColor = '#0079bf';
const subtitleMutedColor = '#c5ccd5';
const subtitleActiveColor = '#6b7280';

export default function Milestone() {
  const timelineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    const dates = gsap.utils.toArray<HTMLElement>('[data-milestone-date]', timeline);
    const subtitles = gsap.utils.toArray<HTMLElement>('[data-milestone-subtitle]', timeline);
    const context = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(dates, { color: dateActiveColor });
        gsap.set(subtitles, { color: subtitleActiveColor });
        return;
      }

      gsap.set(dates, { color: dateMutedColor });
      gsap.set(subtitles, { color: subtitleMutedColor });

      dates.forEach((date, index) => {
        gsap.to(date, {
          color: dateActiveColor,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: date,
            start: 'top 78%',
            toggleActions: 'play reverse play reverse',
          },
          delay: index * 0.04,
        });
      });

      subtitles.forEach((subtitle, index) => {
        gsap.to(subtitle, {
          color: subtitleActiveColor,
          duration: 0.75,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: subtitle,
            start: 'top 82%',
            toggleActions: 'play reverse play reverse',
          },
          delay: index * 0.04,
        });
      });
    }, timeline);

    return () => context.revert();
  }, []);

  return (
    <div ref={timelineRef}>
      <Timeline position="alternate">
        {milestones.map(([date, subtitle], index) => (
          <TimelineItem key={date}>
            <TimelineOppositeContent sx={{ m: 'auto 0' }} variant="body2" align={index % 2 === 0 ? 'right' : 'left'}>
              <Typography data-milestone-date variant="h4" component="span">
                {date}
              </Typography>
              <Typography data-milestone-subtitle>{subtitle}</Typography>
            </TimelineOppositeContent>

            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color="primary" />
              <TimelineConnector />
            </TimelineSeparator>

            <TimelineContent sx={{ py: '12px', px: 2 }} />
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  );
}
