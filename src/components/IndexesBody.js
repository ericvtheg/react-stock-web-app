import React from 'react';
import { Card, Row, Col } from 'antd';
import { percentToColor } from "../helpers/PercentToColor";
import {isGain} from '../helpers/IsGain';
import { FormatNumber } from '../helpers/FormatNumber';

function IndexesBody() {
  return (
    <Card title="Indexes" style={{ height: "auto" }} className="card-stocks">
      <div>
        <IndexesContents key="SPY" stockTicker="SPY" stockTitle="S&P 500" />
        <IndexesContents key="NDAQ" stockTicker="NDAQ" stockTitle="Nasdaq" />
        <IndexesContents key="RUT" stockTicker="^RUT" stockTitle="Russell 2000 " />
      </div>
    </Card>
  );
}

class IndexesContents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }
  componentDidMount() {
    fetch("http://localhost:3000/alphavantage/GLOBAL_QUOTE/"+this.props.stockTicker)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
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
  //event handle on click to switch between percent and actual value
  render() {
    return (
      <Row gutter={[8, 8]}>
        <Card loading={!this.state.isLoaded} className="stock-indexes">
          <Col>
            {this.props.stockTitle}
            <span 
              title={this.state.items["Change"]}
              style={{float:"right"}}
            >
              {isGain(this.state.items["Change-percent"])}
              &nbsp; {FormatNumber(this.state.items.Price)}
            </span>
          </Col>
        </Card>
      </Row>);
  }
}

export {IndexesBody};
