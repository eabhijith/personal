import * as React from 'react';
import './App.css';
// import { styled } from '@mui/material/styles';
// import Paper from '@mui/material/Paper';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider  } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Header from './Components/Header/Header';
import Banner from './Components/Banner/Banner';
import Error from './Components/Error/Error';
// import Navbar from './Components/Navbar/Navbar';
import {  Route, Routes} from "react-router-dom";
import Home from './Components/Home/Home';
import Sidebar from './Components/Sidebar/Sidebar';


// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));




function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  

  const theme = React.useMemo(
    () =>
      createTheme({

        palette: {
          mode : prefersDarkMode ? 'dark' : 'light',
          ...(prefersDarkMode 
              ?{
                background: {
                  default: "#16375a",
                }
              }
              :{
                background: {
                  default: "white",
                }
              }
          ),
          // mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );
  return (
    <div >
      
      {/* <div className='container'>
        <div className='item'>1</div>
        <div className='item'>2</div>
        <div className='item'>3</div>

      </div>

      <div className='container'>
        <div className='item'>3</div>
        <div className='item'>4</div>
      </div> */}

      <ThemeProvider theme={theme}>
      <CssBaseline />

            {/* <Navbar/> */}
            <Sidebar/>
      <Routes>
             <Route path="/" element={<Home/>}/>
             <Route path="/personal" element={<Banner/>}/>
             <Route path="/about" element={<Header/>}>
             </Route>
      {/* <Header/>
      <Banner/>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          p: 1,
          m: 1,
          bgcolor: 'background.default',
          borderRadius: 1,
        }}
      >

        <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
              <CardMedia
                  component="img"
                  height="140"
                  image="/static/images/cards/contemplative-reptile.jpg"
                  alt="green iguana"
                />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              </CardActionArea>
            </Card>

      </Box>

      
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          p: 1,
          m: 1,
          bgcolor: 'background.default',
          borderRadius: 1,
        }}
      >
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
              <CardMedia
                  component="img"
                  height="140"
                  image="/static/images/cards/contemplative-reptile.jpg"
                  alt="green iguana"
                />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              </CardActionArea>
            </Card>

            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
              <CardMedia
                  component="img"
                  height="140"
                  image="/static/images/cards/contemplative-reptile.jpg"
                  alt="green iguana"
                />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              </CardActionArea>
            </Card>


            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
              <CardMedia
                  component="img"
                  height="140"
                  image="/static/images/cards/contemplative-reptile.jpg"
                  alt="green iguana"
                />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              </CardActionArea>
            </Card>

            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
              <CardMedia
                  component="img"
                  height="140"
                  image="/static/images/cards/contemplative-reptile.jpg"
                  alt="green iguana"
                />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              </CardActionArea>
            </Card>
        <Item>Item 2</Item>
        <Item>Item 3</Item>
        <Item>Item 4</Item>
        <Item>Item 5</Item>
        <Item>Item 6</Item>
      </Box> */}
            <Route />
            <Route element={<Error/>}/>
            
           </Routes>

    </ThemeProvider>




    </div>
  );
}

export default App;
