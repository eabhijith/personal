import * as React from "react";
import "./Timeline.css";
import Timeline1 from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import Typography from "@mui/material/Typography";

import { ReactComponent as Step } from './Assets/_Step.svg';

const Timeline = () => {

  return (
    // <AppBar position="static" style={{background:'rgba(247,250,252,var(--bg-opacity))'}}>
    <div className="parent ea-Timeline-header">
      <Timeline1>

        {/* BEGIN : Time line Experience */}
        <TimelineItem>
          <TimelineOppositeContent style={{ flex: 0.001 }}/>
          {/* Time line Seperator */}
          <TimelineSeparator sx={{ py: "15px" }}>
            {/* <TimelineConnector /> */}
            {/* <TimelineDot>
              <FastfoodIcon />
            </TimelineDot> */}
              <Step/>
            <TimelineConnector />
          </TimelineSeparator>

          {/* Time line Content */}
          <TimelineContent sx={{ py: "30px", px: 2 }}>
            <Typography variant="h6" component="span">
              Experience
            </Typography>
              <div className='item-hover item-long right-border-black hoverblue'>
              <Typography variant="h6" component="span">
                My Name is Abhijith I am creating this page with a simple idea of using this as a personal resume My Name is Abhijith I am creating this page with a simple idea of using this as a personal resume
              </Typography>
              <br/>
              </div>
          </TimelineContent>

        </TimelineItem>


        {/* BEGIN : Time line Education */}
        <TimelineItem>
          <TimelineOppositeContent style={{ flex: 0.001 }} />
          {/* Time line Seperator */}
          <TimelineSeparator sx={{ py: "15px" }}>
            {/* <TimelineConnector /> */}
            {/* <TimelineDot>
              <FastfoodIcon />
            </TimelineDot> */}
            <Step />
            <TimelineConnector />
          </TimelineSeparator>

          {/* Time line Content */}
          <TimelineContent sx={{ py: "30px", px: 2 }}>
            <Typography variant="h6" component="span">
              Education
            </Typography>
            <div className='item-hover item-long right-border-black hoverblue'>
              <Typography variant="h6" component="span">
                My Name is Abhijith I am creating this page with a simple idea of using this as a personal resume My Name is Abhijith I am creating this page with a simple idea of using this as a personal resume
              </Typography>
              <Typography variant="h6" component="span">
                My Name is Abhijith I am creating this page with a simple idea of using this as a personal resume My Name is Abhijith I am creating this page with a simple idea of using this as a personal resume
              </Typography>
              <Typography variant="h6" component="span">
                My Name is Abhijith I am creating this page with a simple idea of using this as a personal resume My Name is Abhijith I am creating this page with a simple idea of using this as a personal resume
              </Typography>
              <Typography variant="h6" component="span">
                My Name is Abhijith I am creating this page with a simple idea of using this as a personal resume My Name is Abhijith I am creating this page with a simple idea of using this as a personal resume
              </Typography>
              <br />
            </div>
          </TimelineContent>

        </TimelineItem>

        {/* BEGIN : Time line Skills */}
        <TimelineItem>
          <TimelineOppositeContent style={{ flex: 0.001 }} />
          {/* Time line Seperator */}
          <TimelineSeparator sx={{ py: "15px" }}>
            {/* <TimelineConnector /> */}
            {/* <TimelineDot>
              <FastfoodIcon />
            </TimelineDot> */}
            <Step />
            <TimelineConnector />
          </TimelineSeparator>

          {/* Time line Content */}
          <TimelineContent sx={{ py: "30px", px: 2 }}>
            <Typography variant="h6" component="span">
              Skills
            </Typography>
            <div className='item-hover item-long right-border-black hoverblue'>
              <Typography variant="h6" component="span">
                My Name is Abhijith I am creating this page with a simple idea of using this as a personal resume My Name is Abhijith I am creating this page with a simple idea of using this as a personal resume
              </Typography>
              <br />
            </div>
          </TimelineContent>

        </TimelineItem>


        {/* BEGIN : Time line Tools */}
        <TimelineItem>
          <TimelineOppositeContent style={{ flex: 0.001 }} />
          {/* Time line Seperator */}
          <TimelineSeparator sx={{ py: "15px", pt:"27px"}}>
            {/* <TimelineConnector /> */}
            {/* <TimelineDot>
              <FastfoodIcon />
            </TimelineDot> */}
            <Step />
            <TimelineConnector />
          </TimelineSeparator>

          {/* Time line Content */}
          <TimelineContent sx={{ py: "30px", px: 2 }}>
            <Typography variant="h6" component="span">
              Tools
            </Typography>
            <div className='item-hover item-long right-border-black hoverblue'>
              <Typography variant="h6" component="span">
                My Name is Abhijith I am creating this page with a simple idea of using this as a personal resume My Name is Abhijith I am creating this page with a simple idea of using this as a personal resume
              </Typography>
              <br />
            </div>
          </TimelineContent>

        </TimelineItem>



      </Timeline1>
    </div>
  );
};
export default Timeline;