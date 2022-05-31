import { Component} from 'react'
import Banner from '../Banner/Banner'

interface HomeProps {

}

interface HomeState {
}

export default class  Home extends Component<HomeProps,HomeState> {
    public render(): JSX.Element {
      return (
          <div>
            <Banner/>
          </div>
      );
    }
}