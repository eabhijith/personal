import { Component} from 'react'
// import 'bulma/css/bulma.min.css';
import  "./Banner.css";
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
                <div className='item'>Main Content</div>
            </div>

            <div className='container'>
                <div className='item item-long'>1</div>
                <div className='item'>2</div>
            </div>

            <div className='container'>
                <div className='item item-long'>1</div>
                <div className='item'>2</div>
            </div>
              
          </div>
      );
    }
}