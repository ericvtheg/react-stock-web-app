import React from 'react';
import {Card, Row, Col, Switch} from 'antd';

function CardBody(props){
  //fetch ticker content here
  //show loading while loading
    return(
      <Card title={props.title} className="card-ticker">
          {TickerContents()}
      </Card>
    );
  }

function TickerInfo(){
  return(
    <Row className="ticker-info-row">
      <Col flex={1}>
        <Card className="card-ticker-info">test</Card>
        <Card className="card-ticker-info">test</Card>
        <Card className="card-ticker-info">test</Card>
        <Card className="card-ticker-info">test</Card>
        <Card className="card-ticker-info">test</Card>
        <Card className="card-ticker-info">test</Card>
        <Card className="card-ticker-info">test</Card>
        <Card className="card-ticker-info">test</Card>
      </Col>
      <Col flex={1}>
        <Card className="card-ticker-info">test</Card>
        <Card className="card-ticker-info">test</Card>
        <Card className="card-ticker-info">test</Card>
        <Card className="card-ticker-info">test</Card>
        <Card className="card-ticker-info">test</Card>
        <Card className="card-ticker-info">test</Card>
        <Card className="card-ticker-info">test</Card>
        <Card className="card-ticker-info">test</Card>
      </Col>
    </Row>
  );
}

function NewsBody(){
  //fetch news content here
  //show loading while loading
  return(
    <>
      {/* <Switch checked={!loading} onChange={this.onChange} /> */}
      <Card loading={true} title="News" className="card-news">
          <NewsContents image="img" headline="This is a news headline" />
          <NewsContents image="img" headline="This is a news headline" />
          <NewsContents image="img" headline="This is a newasdfasdfasdfs headline" />
      </Card>
    </>
  );
}

function NewsContents(props){
  return(
    <Row>
      <Col flex={2} >
        <Card style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)'}}>
            <img src={props.image}></img>
        </Card>
      </Col>
      <Col flex={8}>
        <Card>{props.headline}</Card>
      </Col>
    </Row>
  );
}

function StockBody(){
  //fetch stock content here
  //show loading while loading
  return(
    <Card title="Indexes" className="card-stocks">
        <StockContents stockTitle="S&P 500" stockChange={15.04} stockChangePercent={3.05} />
        <StockContents stockTitle="Nasdaq" stockChange={5.04} stockChangePercent={.67} />
        <StockContents stockTitle="Russ 5000" stockChange={-10.01} stockChangePercent={-3.65} />
        <StockContents stockTitle="DJI      " stockChange={-10.01} stockChangePercent={-3.65} />
    </Card>
  );
}

function StockContents(props){
  return(
    <Row>
      <Col flex={5}>
  <Card>{props.stockTitle}</Card>
      </Col>
      <Col flex={Math.abs(props.stockChangePercent /.2)}>
        <Card style={{background: percToColor(props.stockChangePercent)}}>
          {props.stockChange} ({props.stockChangePercent}%)</Card>
      </Col>
    </Row>
  );
}



function TickerContents(){
  return(
    <Row>
      <Col className="graph-col">
        <Card className="card-graph">test</Card>
      </Col>
      <TickerInfo />
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


export {CardBody, StockBody, NewsBody};
export default CardBody;