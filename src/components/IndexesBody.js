import React from 'react';
import { Card, Row, Col } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { percentToColor } from "../helpers/PercentToColor";

function IndexesBody() {
  //show loading while loading
  return (
  <Card title="Indexes" style={{ height: "auto" }} className="card-stocks">
    <div>
      <IndexesContents key="SPY" stockTicker="SPY" stockTitle="S&P 500" />
      {/* <IndexesContents key="NDAQ" stockTicker="NDAQ" stockTitle="Nasdaq" stockPrice={9121.32} stockChange={141.66} stockChangePercent={1.58} />
      <IndexesContents key="DJI" stockTicker="DIA" stockTitle="DOW J" stockPrice={24331.32} stockChange={455.52} stockChangePercent={1.91} /> */}
    </div>
  </Card>);
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
    fetch("http://localhost:3001/alphavantage/GLOBAL_QUOTE/"+this.props.stockTicker)
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
    let arrowDirection;
    // this.state.items.change[0] === '-' ? arrowDirection = <CaretUpOutlined />: arrowDirection = <CaretDownOutlined />
    
    return (
      <Row gutter={[8, 8]}>
        <Card loading={!this.state.isLoaded} className="stock-indexes">
          <Col>
            {this.props.stockTitle}
          </Col>
          <Col style={{ 
            background: percentToColor(this.state.items.change), 
            textAlign: "right", 
            whiteSpace: "nowrap" }}>
            {arrowDirection}&nbsp;{this.state.items.change}
            <span>
              &nbsp;{this.state.items.price}
            </span>
          </Col>
        </Card>
      </Row>);
  }
}

export {IndexesBody};
