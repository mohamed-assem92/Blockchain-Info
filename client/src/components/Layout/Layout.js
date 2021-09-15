import React from 'react';
import Layout from 'antd/es/layout';
import './Layout.css';
import { Link } from 'react-router-dom';
import logo from '../../logo1.png';

const { Header, Content, Footer } = Layout;

const LayoutComponent = ({ children }) => (
  <Layout className="layout">
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <Link className="link-font" to="/">
        <img alt="logo" src={logo} style={{ width: '3rem', height: '3rem' }} />
        &nbsp;&nbsp; Assem&apos;s Blockchain Info
      </Link>
    </Header>
    <Content
      className="site-layout"
      style={{ padding: '0 50px', marginTop: 85 }}
    >
      <div
        className="site-layout-content"
        style={{
          padding: 24,
          height: '82vh',
        }}
      >
        {children}
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>
      Made with 😍 by Mohamed Assem
    </Footer>
  </Layout>
);

export default LayoutComponent;
