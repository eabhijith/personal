import { Component } from 'react'
// import 'bulma/css/bulma.min.css';
import "./Banner.css";
import { BannerContent } from "../Data/banner";

// import Grid from '@mui/material/Grid';
import parse from 'html-react-parser'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
interface BannerProps {


}

interface BannerState {

}

export default class Banner extends Component<BannerProps, BannerState> {


  //Define State on To Play Page
  public readonly state: BannerState = {
  }

  public render(): JSX.Element {
    return (
      <div>
        <div className='spacer layer1'>

          <div className='ea-container ea-bg-gray '>

            <div className='item right-border-gold item-very-long ea-bg-bluegradient item-hover item-long'>

              <Typography gutterBottom variant="h5" align="center" component="div">
                {BannerContent.title} 
              </Typography>
              <Typography  >
                {parse(BannerContent.body)}
              </Typography>
            </div>
            <Box className='item-banner ea-bg-bluegradient-light item-hover' sx={{ color: 'primary.contrastText', p: 2 }}>
              <div className="card_img ea-bg-yellow">
                <img src={`${BannerContent.displayPic}`} alt="user-pic" />
              </div>
            </Box>
          </div>
        </div>
      </div>
    );
  }
}