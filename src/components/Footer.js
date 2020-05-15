import React from 'react';
import { GithubOutlined, LinkedinOutlined, TwitterOutlined } from '@ant-design/icons';

export function Footer() {
  return (
    <div className="footer">
        <a href="https://www.linkedin.com/in/ericventor/" class="footer-icons" >
            <LinkedinOutlined />
        </a>
        <a href="https://www.linkedin.com/in/ericventor/"class="footer-icons" >
            <TwitterOutlined />
        </a>
        <a href="https://www.github.com/ericvtheg" class="footer-icons" >
            <GithubOutlined />
        </a>
    </div>
  );
}
