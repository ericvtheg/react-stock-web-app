import React from 'react';
import { Card, Row, Col } from 'antd';
import { isGain } from '../helpers/isGain';

class SectorsBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }
  componentDidMount() {
    this.fetchSectorData();
    this.timerID = setInterval(
      () => this.fetchSectorData(),
      60000
      );
  }

  fetchSectorData(){
    fetch("http://localhost:3001/alphavantage/SECTOR/")
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

  conditionalRender(){
    if (this.state.isLoaded){
      const sectorCards = [];
      const sectorItems = this.state.items;
      let change, loaded;
      Object.keys(sectorItems).forEach(function(key) {
          loaded = true;
          change = sectorItems[key];
          sectorCards.push(
          <SectorContents key={key} loaded={loaded} title={key} change={change} />
          );
      })
      return sectorCards;
    }else{
      return <BlankContents />
    }
  }
  render(){
    let cardTitle = <> Sectors &nbsp; <span style={{fontSize:"small"}}className="light-gray">Real-Time Performance</span></>
    const display = this.conditionalRender();
    return (
    <div className="sectors">
      <Card title={cardTitle} className="card-stocks">
        {display}
      </Card>
    </div>
    );
  }
}

function SectorContents(props) {
  //event handle on click to switch between percent and actual value
  return (
    <Row gutter={[8, 8]}>
      <Card loading={!props.loaded} className="stock-indexes">
        <Col>
          {props.title}
            <span  style={{float:"right"}}>
              {isGain(props.change)}
            </span>
        </Col>
      </Card>
    </Row>
  );
}

function BlankContents(){
  return(
    <>
      <SectorContents key={0} loaded={false}  />
      <SectorContents key={1} loaded={false}  />
      <SectorContents key={2} loaded={false}  />
      <SectorContents key={3} loaded={false}  />
    </>
  );
}
  
export {SectorsBody};
