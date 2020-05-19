import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { TickerGraph } from './TickerGraph';
import { isGain } from '../helpers/isGain';
import { formatNumber } from '../helpers/formatNumber';
import { alertError } from '../helpers/alert';

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
    this.fetchTickerData();
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.stockTicker !== prevProps.stockTicker) {
      this.setState({isLoaded: false});
      this.fetchTickerData(this.props.stockTicker);
    }
  }

  fetchTickerData(){
    fetch("http://localhost:3001/alphavantage/GLOBAL_QUOTE/"+this.props.stockTicker)
      .then(res => res.json())
      .then(
        (result) => {
          let isError = alertError(result);
          this.setState({
            isLoaded: true,
            items: result, 
            error: isError
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error: true
          });
        }
      )
  }

  FormatTitle(stockTicker, values){
    let title = 
      <span title={"$"+formatNumber(this.state.items["Change"])}> 
        {stockTicker} &nbsp;
        {isGain(values["Change-percent"])} &nbsp;
        ${formatNumber(values["Price"])} &nbsp;
        <span className="light-gray">{this.state.items["Trading-day"]}</span>
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
      <TickerContents quote={this.state.items} isError={this.state.error} />
    </Card>);
    }
}

function TickerContents(props) {
  const quote = props.quote;
  return (
    <Row>
      <TickerInfo key="Open" title="Open" value={formatNumber(quote["Open"])}  />
      <TickerInfo key="Close" title="Close" value={formatNumber(quote["Close"])} />
      <TickerInfo key="Volume" title="Volume" value={formatNumber(quote["Volume"])} />
      <TickerInfo key="High" title="High" value={formatNumber(quote["High"])} />
      <TickerInfo key="Low" title="Low" value={formatNumber(quote["Low"])} />
      {/* <TickerInfo key="Trading Day" title="Trading Day" value={quote["Trading-day"]}  /> */}
      <TickerGraph stockTicker={quote["Symbol"]} isError={props.isError}/>
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