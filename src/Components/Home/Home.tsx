import { Component } from 'react'
import Banner from '../Banner/Banner'
import Timeline from '../Timeline/Timeline'
import "./Home.css";

interface HomeProps {

}

interface HomeState {
}

export default class Home extends Component<HomeProps, HomeState> {
  public render(): JSX.Element {
    return (
      <div className="ea-body">
        <Banner />
        <Timeline />
      </div>
    );
  }
}