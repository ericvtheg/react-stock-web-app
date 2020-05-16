import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Layout, Row, Col } from 'antd';
import './index.css';
import { Header, IndexesBody, NewsBody, TickerBody, SectorsBody, Footer } from './components/CardBody';

ReactDOM.render(
  <React.StrictMode>
    <Layout style={{background: "white"}}>
      {/* pass down function here that receives search input? */}
      <Header />
      <Layout style={{background: "white"}} >
        <Row style={{margin:"0px 20px"}}>
          <Col flex={"4 1 350px"} className="ticker-col antd-flex-grow-1">
            <TickerBody stockTicker="TWTR"/>
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
    </Layout>
  </React.StrictMode>,
  document.getElementById('root')
);
