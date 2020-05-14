import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function TickerBody(props) {
  //fetch ticker content here
  //show loading while loading
  return (
  <Card title={props.title} className="card-ticker">
    <TickerContents />
  </Card>);
}

function TickerContents() {
  return (<Row>
    <TickerInfo title="High" />
    <TickerInfo title="Low" />
    <TickerInfo title="Volume" />
    <TickerInfo title="Open" />
    <TickerInfo title="Close" />
    <TickerInfo title="Trading Day" />
    <TickerGraph />
  </Row>);
}

function TickerInfo(props) {
  return (<Col flex={1} className="ticker-info-col">
    <Row className="ticker-info-row ant-card-body">
      <Statistic title={props.title} value={props.value} />
    </Row>
  </Col>);
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

export {TickerBody};