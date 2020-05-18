import React from 'react';
import { Card, Col,  Button, Row, Dropdown, Menu } from 'antd';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, ResponsiveContainer } from 'recharts';
import { LineChartOutlined } from '@ant-design/icons';
import {alertError} from '../helpers/alert';

export class TickerGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      type: "TIME_SERIES_DAILY",
      interval: null
    };
    this.changeInterval = this.changeInterval.bind(this);
  }

  componentDidMount() {
    if(!this.props.isError)
      this.fetchGraphData();
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.stockTicker !== prevProps.stockTicker) {
      this.fetchGraphData(this.props.stockTicker);
    }
  }

  fetchGraphData(){
    fetch("http://localhost:3001/alphavantage/" + 
      this.state.type + "/" + (this.state.interval? this.state.interval + "/" :"") + this.props.stockTicker)
    .then(res => res.json())
    .then((result) => {
      alertError(result);
      this.setState({
        isLoaded: true,
        items: result
      });
    }, (error) => {
      this.setState({
        isLoaded: true,
        error
      });
    });
  }

  async changeInterval(range, inputInterval=null){
    await this.setState({type: range, interval:inputInterval});
    this.fetchGraphData();
  }


  render(){
    const data = this.state.items;
    console.log(data);
    return(
      <Col className = "graph-col" >
        <Card loading={!this.state.isLoaded} className="card-graph">
          <ResponsiveContainer aspect={1.7} width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5, }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis 
                yAxisId={0} 
                dataKey="open" 
                domain={['dataMin * .8','dataMax * 1.2']}  
              />
              {/* <YAxis 
                yAxisId={1} 
                orientation='right' 
                axisLine={false} 
                domain={['dataMin', 'dataMax']}
              /> */}
              <Tooltip />
              <Legend />
              {/* <Bar yAXisID={1} dataKey="volume" barSize={10} fill="#D3D3D3" /> */}
              <Line yAxisID={0} type="monotone" dataKey="open" stroke="#82ca9d" activeDot={{ r: 8 }} />
              <Line yAxisID={0} type="monotone" dataKey="close" stroke="#8884d8" activeDot={{ r: 8 }} />
            </ComposedChart>
          </ResponsiveContainer>
          <RangeSelection changeInterval={this.changeInterval}/>
        </Card>
      </Col>
    );
  }
}


function RangeSelection(props){  
  const menu = (
    <Menu onClick={(e) => props.changeInterval("TIME_SERIES_INTRADAY", e.key)}>
      <Menu.Item  key="15min" icon={<LineChartOutlined />}>
        15min
      </Menu.Item>
      <Menu.Item key="30min" icon={<LineChartOutlined />}>
        30min
      </Menu.Item>
      <Menu.Item key="60min" icon={<LineChartOutlined />}>
        60min
      </Menu.Item>
    </Menu>
  );
  return (
    <Row justify="center">
      <Dropdown overlay={menu}>
        <Button >
          Intraday
        </Button>
      </Dropdown>
      <Button onClick={() => props.changeInterval("TIME_SERIES_DAILY")}>
        Daily
      </Button>
      <Button onClick={() => props.changeInterval("TIME_SERIES_WEEKLY")}>
        Weekly
        </Button>
      <Button onClick={() => props.changeInterval("TIME_SERIES_MONTHLY")}>
        Monthly
      </Button>
      </Row> 
  );
}