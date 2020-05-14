import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Layout, Row, Col } from 'antd';
import './index.css';
import { Header, IndexesBody, NewsBody, TickerBody } from './components/CardBody';

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
      <Layout style={{background: "white"}} >
        <Row style={{margin:"0px 20px"}}>
          <Col flex={"4 1 350px"} className="ticker-col antd-flex-grow-1">
            <TickerBody title="TWTR"/>
          </Col>
          <Col flex={"2 0 200px"} className="news-and-stocks-col">
            <Row className="height-limit">
              <NewsBody />
            </Row>
            <Row className="height-limit">
              <IndexesBody />
            </Row>
          </Col>
        </Row>
      </Layout>
      <Footer />
    </Layout>
  </React.StrictMode>,
  document.getElementById('root')
);
