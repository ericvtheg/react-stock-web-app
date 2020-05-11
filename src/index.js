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

ReactDOM.render(
  <React.StrictMode>
    <Layout style={{background: "white"}}>
      <Header />
      <Row>
          <Col flex={1} className="ticker-col">
            <TickerBody title="TWTR"/>
          </Col>
          <Col flex={1} className="news-stocks-col">
            <Row className="height-limit">
              <NewsBody />
            </Row>
            <Row className="height-limit">
              <StockBody />
            </Row>
          </Col>
      </Row>
      <Footer />
    </Layout>
  </React.StrictMode>,
  document.getElementById('root')
);
