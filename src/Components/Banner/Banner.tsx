import { Component} from 'react'
// import 'bulma/css/bulma.min.css';
import  "./Banner.css";

// import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
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

            

            <div className='spacer layer1'>

              <div className='ea-container ea-bg-gray '>

              <div className='item item-very-long ea-bg-bluegradient item-hover'>

                <Typography gutterBottom variant="h5" align="center" component="div">
                        Hello 👋🏼
                      </Typography>
                      <Typography  >
                      My name is Abhijith I'm a Senior Software Engineer with background in 
                      various programming languages and currently I'm specializing in Apex and Javascript 
                      and advocating for functional programming (the good parts!).
                      <br/>
                      <ul>
                        <li>🔭 I’m currently working on Developing a full stack application for Ecommerce platform</li>
                        <li>🌱 I’m currently learning Python , R (KDD and modelling of models)</li>
                      </ul>
                      </Typography>

                      


              </div>

              <Box className='item-banner ea-bg-bluegradient-light item-hover' sx={{  color: 'primary.contrastText', p: 2 }}>
                        <div className="card_img ea-bg-yellow"> 
                          <img src="https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-1100x628.jpg" alt="user-pic"/>
                        </div>
                    </Box>


            </div>

            <div className='ea-container '>

              
              <div className='item-very-long ea-bg-gray item-hover'>
              <Typography component="div"  variant="body1">
              <Box   sx={{ bgcolor: 'green', color: 'background.paper', p: 2 }}>
                  <Typography gutterBottom variant="h5" align="center" component="div">
                        Hello 👋🏼
                      </Typography>
                      <Typography color="background.paper" >
                      My name is Abhijith I'm a Senior Software Engineer with background in 
                      various programming languages and currently I'm specializing in Apex and Javascript 
                      and advocating for functional programming (the good parts!).
                      <br/>
                      <ul>
                        <li>🔭 I’m currently working on Developing a full stack application for Ecommerce platform</li>
                        <li>🌱 I’m currently learning Python , R (KDD and modelling of models)</li>
                      </ul>
                      </Typography>
              </Box>
              </Typography>

              </div>
                  
                  {/* <Card className='item-banner  ea-bg-yellow item-very-long' >
                    <CardContent>
                      
                    </CardContent>
                  </Card> */}
                  {/* <div className='item-banner ea-bg-yellow ea-bg-tranparent'>
                  </div> */}
                    {/* <Box className='item-banner' sx={{ bgcolor: 'info.main', color: 'primary.contrastText', p: 2 }}> */}
                    <Box className='item-banner' sx={{  color: 'primary.contrastText', p: 2 }}>
                        <div className="card_img ea-bg-yellow"> 
                          <img src="https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-1100x628.jpg" alt="user-pic"/>
                        </div>
                    </Box>
                  {/* <Card className='item-banner ea-bg-yellow ea-bg-tranparent' >

                    <CardContent>
                    <div className="card_img ea-bg-yellow"> 
                        <img src="https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-1100x628.jpg" alt="user-pic"/>
                    </div>
                    </CardContent>
                  </Card> */}
            </div>


            <div className='ea-container'>
                <div className='item item-long right-border-gold hoverblue'>
                  <Card className='item' >
      <CardContent>
        <Typography gutterBottom variant="h5" align="center" component="div">
          Hey There 
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" align="center">
          My Name is Abhijith I am creating this page with a simple idea of using this as a personal resume
          My Name is Abhijith I am creating this page with a simple idea of using this as a personal resume
        </Typography>
      </CardContent>
    </Card>
                </div>
                <div className='item left-border-gold hoverblue'>2</div>
            </div>

            <div className='ea-container'>
                <div className='item-hover item-long right-border-black hoverblue'>1</div>
                <div className='item-hover left-border-black hoverblue'>2</div>
            </div>

              <div className='ea-container'>
                <div className='item-hover item-long right-border-black hoverblue'>1</div>
                <div className='item-hover left-border-black hoverblue'>2</div>
            </div>

            </div>
          </div>
      );
    }
}