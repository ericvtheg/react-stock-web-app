import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { TickerGraph } from './TickerGraph';
import {isGain} from '../helpers/IsGain';
import { FormatNumber } from '../helpers/FormatNumber';

class TickerBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: {}
    };
  }
  componentDidMount() {
    fetch("http://localhost:3000/alphavantage/GLOBAL_QUOTE/"+this.props.stockTicker)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  FormatTitle(stockTicker, values){
    let title = 
      <span title={"$"+FormatNumber(this.state.items["Change"])}> 
        {stockTicker} &nbsp;
        {isGain(values["Change-percent"])} &nbsp;
        ${FormatNumber(values["Price"])} &nbsp;
      </span>
    return title
  }

  render(){
    return (
    <Card 
      loading={!this.state.isLoaded}
      title={this.FormatTitle(this.props.stockTicker, this.state.items)} 
      className="card-ticker"
    >
      <TickerContents quote={this.state.items}/>
    </Card>);
    }
}

function TickerContents(props) {
  const quote = props.quote;
  return (
    <Row>
      <TickerInfo key="Open" title="Open" value={FormatNumber(quote["Open"])}  />
      <TickerInfo key="Close" title="Close" value={FormatNumber(quote["Close"])} />
      <TickerInfo key="Volume" title="Volume" value={FormatNumber(quote["Volume"])} />
      <TickerInfo key="High" title="High" value={FormatNumber(quote["High"])} />
      <TickerInfo key="Low" title="Low" value={FormatNumber(quote["Low"])} />
      {/* <TickerInfo key="Trading Day" title="Trading Day" value={quote["Trading-day"]}  /> */}
      <TickerGraph stockTicker={quote["Symbol"]}/>
    </Row>
  );
}

function TickerInfo(props) {
  return (
    <Col flex={1} className="ticker-info-col">
      <Row className="ticker-info-row ant-card-body">
        <Statistic title={props.title} value={props.value} />
      </Row>
    </Col>
  );
}

export {TickerBody};