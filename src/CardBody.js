import React from 'react';
import {Card, Row, Col, Avatar, Statistic} from 'antd';
import {CaretUpOutlined, CaretDownOutlined, AlignLeftOutlined} from '@ant-design/icons';

function TickerBody(props){
  //fetch ticker content here
  //show loading while loading
    return(
      <Card title={props.title} className="card-ticker">
          <TickerContents />
      </Card>
    );
  }

function TickerContents(){
  return(
    <Row>
      <TickerInfo title="High" />
      <TickerInfo title="Low" />
      <TickerInfo title="Volume" />
      <TickerInfo title="Open" />
      <TickerInfo title="Close" />
      <TickerInfo title="Trading Day" />
      <Col className="graph-col">
        <Card className="card-graph">test</Card>
      </Col>
    </Row>
  );
}

function TickerInfo(props){
  return(
    <Col flex={1} className="ticker-info-col">
      <Row className="ticker-info-row ant-card-body">
        <Statistic title={props.title} value={props.value} />
      </Row>
    </Col>
  );
}

function NewsBody(){
  //fetch news content here
  //show loading while loading
  return(
    <>
      {/* <Switch checked={!loading} onChange={this.onChange} /> */}
      <Card title="News" className="card-news">
          <NewsContents image="img" headline="A ‘much more severe’ selloff looms in the stock market, strategist warns" />
          <NewsContents image="img" headline="He started the day with $77,000 — by midnight, he owed $9 million" />
          <NewsContents image="img" headline="Pence plans to return to White House, while Fauci and others self-isolate after potential exposure to coronavirus" />
      </Card>
    </>
  );
}

function NewsContents(props){
  return(
    <Card>
      <Row align="middle">
        <Col flex={2} >
          <Avatar 
            shape="square" 
            size="large" 
            icon={<AlignLeftOutlined />} 
            style={{margin:'2px'}}
          />
        </Col>
        <Col flex={8}>
          <li className="news-headline">{props.headline}</li>
        </Col>
      </Row>
    </Card>
  );
}

function StockBody(){
  //fetch stock content here
  //show loading while loading
  return(
    <Card title="Indexes" className="card-stocks">
        <StockContents 
          stockTitle="S&P 500&nbsp;&nbsp;&nbsp;"
          stockPrice={292.44}
          stockChange={4.76} 
          stockChangePercent={1.65} />
        <StockContents 
          stockTitle="Nasdaq&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
          stockPrice={9121.32}
          stockChange={141.66} 
          stockChangePercent={1.58} />
        <StockContents 
          stockTitle="Russ 5000"
          stockPrice={29670.68}
          stockChange={556.92} 
          stockChangePercent={1.91} />
        <StockContents 
          stockTitle="DOW J&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
          stockPrice={24331.32}
          stockChange={455.52} 
          stockChangePercent={1.91} />
    </Card>
  );
}

function StockContents(props){
  let arrowDirection; 
  if(props.stockChangePercent > 0) {
    arrowDirection = <CaretUpOutlined />
  }else{
    arrowDirection = <CaretDownOutlined />
  }

  //event handle on click to switch between percent and actual value
   
  return(
    <Row>
      <Col flex={5}>
        <Card>{props.stockTitle}</Card>
      </Col>
      <Col flex={Math.abs(props.stockChangePercent /.2)}>
        <Card style={{background: percToColor(props.stockChangePercent), whiteSpace: "pre"}}>
          {arrowDirection}&nbsp;{props.stockChange.toLocaleString()} ({props.stockChangePercent}%)
          <span>
              &nbsp;{props.stockPrice.toLocaleString()}
          </span>
        </Card>
      </Col>
    </Row>
  );
}

function percToColor(pct) {
  var percentColors = [
    { pct: 0.0, color: { r: 0xff, g: 0x00, b: 0 } },
    { pct: 0.5, color: { r: 0xff, g: 0xff, b: 0 } },
    { pct: 1.0, color: { r: 0x00, g: 0xff, b: 0 } } ];

  for (var i = 1; i < percentColors.length - 1; i++) {
      if (pct < percentColors[i].pct) {
          break;
      }
  }
  var lower = percentColors[i - 1];
  var upper = percentColors[i];
  var range = upper.pct - lower.pct;
  var rangePct = (pct - lower.pct) / range;
  var pctLower = 1 - rangePct;
  var pctUpper = rangePct;
  var color = {
      r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
      g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
      b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
  };
  return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
  // or output as hex if preferred
};


export {TickerBody, StockBody, NewsBody};
export default TickerBody;