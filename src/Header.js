import React from 'react';
import {PageHeader, AutoComplete, Row, Col, Input} from 'antd';


function Header(){
  return(
    <>
      <Row align="middle">
        <Col flex={20}>
          <PageHeader
            className="site-page-header"
            title="Stock Tickers"
            subTitle="Quick & easy"
          />
        </Col>
        <Col flex={70}>
          <AutoComplete
            className = "searchBar"
            options={null}
            onSelect={null}
            onSearch={null}
          >
            <Input.Search
              placeholder="TWTR"
            />
          </AutoComplete>
        </Col>
        <Col flex ={1}>
          <Clock/>
        </Col>
      </Row>

    </>
  );
}

class Clock extends React.Component {
  constructor(props){
    super(props);
    //Only place you assign this.state is the constructor
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h2>{this.state.date.toLocaleTimeString()}</h2>
      </div>
    );
  }
}

export default Header;
