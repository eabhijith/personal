import { Component} from 'react'
// import 'bulma/css/bulma.min.css';
import  "./Banner.css";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface BannerProps {


}

interface BannerState {

}

export default class  Banner extends Component<BannerProps,BannerState> {


    //Define State on To Play Page
    public readonly state: BannerState = {
	  }


    
    public render(): JSX.Element {
      return (
          <div>

            <div className='container'>
                  <Card className='item'>
      <CardContent>
        <Typography gutterBottom variant="h5" align="center" component="div">
          Welcome to My page
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" align="center">
          This is a simple webpage created on github pages for personal use!
        </Typography>
      </CardContent>
    </Card>
            </div>

            <div className='container'>
                <div className='item item-long right-border-gold hoverblue'>
                  <Card className='item'>
      <CardContent>
        <Typography gutterBottom variant="h5" align="center" component="div">
          Hey There 
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" align="center">
          My Name is Abhijith I am creating this page with a simple idea of using this as a personal resume
        </Typography>
      </CardContent>
    </Card>
                </div>
                <div className='item left-border-gold hoverblue'>2</div>
            </div>

            <div className='container'>
                <div className='item item-long right-border-black hoverblue'>1</div>
                <div className='item left-border-black hoverblue'>2</div>
            </div>
              
          </div>
      );
    }
}