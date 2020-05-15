import React from 'react';
import { Card, Col } from 'antd';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
export class TickerGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: {},
      type: "TIME_SERIES_DAILY",
      interval: null
    };
  }

  componentDidMount() {
    this.fetchGraph();
  }

  // probably dont need this
  calculateDomains(data){
    let minClose = 0, maxClose = 0;
    let minVol = 0, maxVol = 0;
    for (let i in data){
      if (minClose > i["close"]) minClose = i["close"];
      if (maxClose < i["close"]) maxClose = i["close"];
      if (minVol > i["volume"]) minVol = i["volume"];
      if (maxVol < i["volume"]) maxVol = i["volume"];
    }
    minClose *= .9;
    maxClose *= 1.1;
    maxVol *= 2;
    return [[minClose, maxClose],[minVol/maxVol, maxVol/maxVol]]
  }

  fetchGraph(){
    fetch("http://localhost:3000/alphavantage/" + 
    this.state.type + "/" + this.props.stockTicker)
    .then(res => res.json())
    .then((result) => {
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

  render(){
    const data = this.state.items;
    const domains = this.calculateDomains(data);
    const lineDomain = domains[0];
    const barDomain = domains[1];
    console.log(domains);
    return(
      <Col className = "graph-col" >
        <Card loading={!this.state.isLoaded} className="card-graph">
          <ResponsiveContainer aspect={1.7} width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5, }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis 
                yAxisId={0} 
                dataKey="close" 
                domain={['dataMin * .9','dataMax * 1.1']}  
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
        </Card>
      </Col>
    );
  }
}
