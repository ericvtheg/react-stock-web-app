import React from 'react';
import { Card, Row, Col, Avatar } from 'antd';
import { AlignLeftOutlined } from '@ant-design/icons';

function NewsBody() {
  //fetch news content here
  //show loading while loading
  return (
    <div className="articles-news">
      <Card title="News" className="card-news">
          <NewsContents image="img" headline="A ‘much more severe’ selloff looms in the stock market, strategist warns" />
          <NewsContents image="img" headline="He started the day with $77,000 — by midnight, he owed $9 million" />
          <NewsContents image="img" headline="The stock rally is signaling an ‘abnormal’ economic recovery, not a V-shaped coronavirus rebound" />
          <NewsContents image="img" headline="Tesla’s California plant reopens despite shutdown order, Elon Musk dares county to arrest him" />
      </Card>
    </div>
  );
}

function NewsContents(props) {
  return (
    <Row style={{width: "100%"}}>
      <Card loading={true} className="article-single">
        <Col span={4} style={{ marginRight: "5px" }}>
          <Avatar shape="square" size="large" icon={<AlignLeftOutlined />} />
        </Col>
        <Col span={19}>
          {props.headline}
        </Col>
      </Card>
    </Row>
  );
}

export {NewsBody};