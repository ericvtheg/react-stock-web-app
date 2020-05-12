import React, { PureComponent }  from 'react';
import {Card, Row, Col, Avatar, Statistic} from 'antd';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
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
      <TickerGraph/>
    </Row>
  );
}

function TickerGraph() {
  const data = [
    {
      name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
    },
    {
      name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
    },
    {
      name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
    },
    {
      name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
    },
    {
      name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
    },
    {
      name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
    },
    {
      name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
    },
  ];
  return <Col className="graph-col">
    <Card className="card-graph">
      <ResponsiveContainer aspect={1.7} width="100%" height="100%">
        <LineChart data={data} margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          <Line type="monotone" dataKey="amt" stroke="#50ef9d" />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  </Col>;
}

function TickerInfo(props){
  return(
    <Col flex={1}  className="ticker-info-col">
      <Row className="ticker-info-row ant-card-body">
        <Statistic  title={props.title} value={props.value} />
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
          <div className="articles-news" style={{marginRight:"22px"}}>
            <NewsContents image="img" headline="A ‘much more severe’ selloff looms in the stock market, strategist warns" />
            <NewsContents image="img" headline="He started the day with $77,000 — by midnight, he owed $9 million" />
            <NewsContents image="img" headline="The stock rally is signaling an ‘abnormal’ economic recovery, not a V-shaped coronavirus rebound" />
            <NewsContents image="img" headline="Tesla’s California plant reopens despite shutdown order, Elon Musk dares county to arrest him" />
          </div>
      </Card>
    </>
  );
}

function NewsContents(props){
  return(
    <Card style={{display:"inline-block", width: "100%"}}>
      <Row>
        <Col span={4} style={{marginRight: "5px"}}>
          <Avatar 
            shape="square" 
            size="large" 
            icon={<AlignLeftOutlined />} 
          />
        </Col>
        <Col span={19}>
          {props.headline}
        </Col>
      </Row>
    </Card>
  );
}

function StockBody(){
  //fetch stock content here
  //show loading while loading
  return(
    <Card title="Indexes" style={{height:"auto"}} className="card-stocks">
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
      <Col flex={1}>
        <Card>{props.stockTitle}</Card>
      </Col>
      <Col flex={3}>
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
  return 'rgb(' + [color.r, color.g, color.b].join(',') + ', 0.8)';
  // or output as hex if preferred
};


export {TickerBody, StockBody, NewsBody};
export default TickerBody;