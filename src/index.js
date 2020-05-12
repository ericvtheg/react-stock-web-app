import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Layout, Row, Col } from 'antd';
import 'antd/dist/antd.css';
import './index.css';
import Header from './Header';
import {StockBody, NewsBody, TickerBody} from './CardBody';

function Footer(){
  return(
    <div className="footer">
      <a href="https://www.linkedin.com/in/ericventor/">
        Designed by Eric Ventor
      </a>
    </div>
  )
}
// xs={2} sm={4} md={6} lg={8} xl={8}
ReactDOM.render(
  <React.StrictMode>
    <Layout style={{background: "white"}}>
      <Header />
      <Layout style={{background: "white"}} >
        <Row style={{width:"100%", height:"100%"}}>
          <Col flex={"1 0 350px"} className="ticker-col">
            <TickerBody title="TWTR"/>
          </Col>
          <Col flex={"1 0 200px"} className="news-and-stocks-col">
            <Row className="height-limit">
              <NewsBody />
            </Row>
            <Row className="height-limit">
              <StockBody />
            </Row>
          </Col>
        </Row>
      </Layout>
      <Footer />
    </Layout>
  </React.StrictMode>,
  document.getElementById('root')
);
