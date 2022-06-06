import * as React from "react";
import "./Timeline.css";
import Timeline1 from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import Typography from "@mui/material/Typography";
import TimelineDot from '@mui/lab/TimelineDot';
// import { ReactComponent as Step } from './Assets/_Step.svg';
import { ReactComponent as Step } from '../Assets/_Step.svg';

import space from '../Assets/space.jpeg';



import { ExperienceData } from "../Data/data";



const Timeline = () => {

  return (
    // <AppBar position="static" style={{background:'rgba(247,250,252,var(--bg-opacity))'}}>
    <div className="parent ea-Timeline-header">
      <Timeline1>

        {/* BEGIN : Time line Experience */}
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
              Experience
            </Typography>

            {ExperienceData.map((data, key) => {

              return (

                <div key={key} className="ea-experience-bg">

                  {/* Begin : Experience Item 1 */}
                  <Timeline1 >
                    <TimelineItem>
                      <TimelineOppositeContent style={{ flex: 0.001 }} />
                      <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>
                        <Typography variant="h6" component="span">
                          {`${data.duration} ${data.location}`}
                        </Typography>
                        <div className='ea-container'>
                          <div className='item left-border-gold item-hover ea-container-small'>
                              <div className='item-row'>
                                <img className="company-img" src={`${data.logo}`} alt="company" />
                              </div>
                              <div className='item-row'>
                                <div >
                                <div className='item-row-left'>
                                  <Typography variant="h6" color="text.secondary" align="left">
                                      {data.company}
                                    </Typography>
                                </div>
                                <div className='item-row-left'>
                                    <Typography variant="subtitle1" color="text.secondary" align="left">
                                      {data.role}
                                    </Typography>
                                </div>
                                </div>
                              </div>
                          </div>
                          <div className='item-hover item-long left-border-gold right-border-black hoverblue'>
                            <ul >
                              {data.experience.map((data, key) => {
                                return (
                                  <Typography variant="subtitle1" color="text.secondary" align="left">
                                    <li key={key}>· {data}</li>
                                  </Typography>
                                );
                              })}
                            </ul>
                          </div>
                        </div>
                      </TimelineContent>
                    </TimelineItem>
                  </Timeline1>
                  {/* End : Experience Item 1 */}
                </div>



              );

            })}



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
            <div className='ea-container'>
              <div className='item left-border-gold item-hover'>
                <Typography variant="subtitle1" color="text.secondary" align="center">
                  JNTU Anantapur
                </Typography>
              </div>
              <div className='item left-border-gold item-hover'>
                <Typography variant="subtitle1" color="text.secondary" align="center">
                  JNTU Anantapur
                </Typography>
              </div>
              <div className='item left-border-gold item-hover'>
                <Typography variant="subtitle1" color="text.secondary" align="center">
                  JNTU Anantapur
                </Typography>
              </div>
              <div className='item left-border-gold item-hover'>
                <Typography variant="subtitle1" color="text.secondary" align="center">
                  JNTU Anantapur
                </Typography>
              </div>
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
          <TimelineSeparator sx={{ py: "15px", pt: "27px" }}>
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