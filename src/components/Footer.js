import React from 'react';
import { GithubOutlined, LinkedinOutlined, TwitterOutlined } from '@ant-design/icons';

export function Footer() {
  return (
    <div className="footer">
        <a href="https://www.linkedin.com/in/ericventor/" className="footer-icons" >
            <LinkedinOutlined />
        </a>
        <a href="https://twitter.com/EricNotor"className="footer-icons" >
            <TwitterOutlined />
        </a>
        <a href="https://www.github.com/ericvtheg" className="footer-icons" >
            <GithubOutlined />
        </a>
    </div>
  );
}
