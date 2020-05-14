import React from 'react';
import { Card, Row, Col, Avatar } from 'antd';
import { AlignLeftOutlined } from '@ant-design/icons';

function NewsBody() {
  //fetch news content here
  //show loading while loading
  return (<>
    <Card title="News" className="card-news">
      <div className="articles-news" style={{ margin: "0px 22px 0px 0px", paddingBottom: "22px" }}>
        <NewsContents image="img" headline="A ‘much more severe’ selloff looms in the stock market, strategist warns" />
        <NewsContents image="img" headline="He started the day with $77,000 — by midnight, he owed $9 million" />
        <NewsContents image="img" headline="The stock rally is signaling an ‘abnormal’ economic recovery, not a V-shaped coronavirus rebound" />
        <NewsContents image="img" headline="Tesla’s California plant reopens despite shutdown order, Elon Musk dares county to arrest him" />
      </div>
    </Card>
  </>);
}

function NewsContents(props) {
  return (<Card style={{ display: "inline-block", width: "100%" }}>
    <Row>
      <Col span={4} style={{ marginRight: "5px" }}>
        <Avatar shape="square" size="large" icon={<AlignLeftOutlined />} />
      </Col>
      <Col span={19}>
        {props.headline}
      </Col>
    </Row>
  </Card>);
}

export {NewsBody};