import React from 'react';
import ReactDOM from 'react-dom';
import { Layout, Row, Col } from 'antd';
import './index.css';
import { Header, NewsBody, TickerBody, SectorsBody, Footer } from './components/CardBody';

class CardBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockTicker: "FB"
    };
  }
  render(){
    return(
      <>
        <Header searchFunction={value => {if(value !== "") this.setState({stockTicker: value.toUpperCase()})}}/>
        <Layout style={{background: "white"}} >
          <Row style={{margin:"0px 20px"}}>
            <Col flex={"4 1 350px"} className="ticker-col antd-flex-grow-1">
              <TickerBody stockTicker={this.state.stockTicker}/>
            </Col>
            <Col flex={"2 0 200px"} className="news-and-stocks-col">
              <Row className="height-limit">
                <NewsBody keyword=""/>
              </Row>
              <Row className="height-limit">
                <SectorsBody />
              </Row>
            </Col>
          </Row>
        </Layout>
        <Footer />
      </>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Layout style={{background: "white"}}>
      <CardBody />
    </Layout>
  </React.StrictMode>,
  document.getElementById('root')
);
