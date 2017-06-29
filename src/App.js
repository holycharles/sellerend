import React, { Component } from 'react';
import { Layout } from 'antd';
const { Content, Footer } = Layout;
import './style/index.less';
import SiderCustom from './components/SiderCustom';
import SiderCustom_hy from './components/SiderCustom_hy';
import HeaderCustom from './components/HeaderCustom';


class App extends Component {
    state = {
        collapsed: false,
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    renderSiderCustom = (path)=> {
        let sider = []
        if(path == 'hy') {
            sider.push(<SiderCustom_hy path={this.props.location.pathname} collapsed={this.state.collapsed} key="sider"/>)
        } else {
            sider.push(<SiderCustom path={this.props.location.pathname} collapsed={this.state.collapsed} key="sider"/>)
        }
        return (
            sider
        )
    }
    render() {
        let  {route} = this.props;
        let path = route.path;
        return (
            <Layout className="ant-layout-has-sider">
                {this.renderSiderCustom(path)};

              <Layout>
                <HeaderCustom toggle={this.toggle} />
                <Content style={{ margin: '0 16px', overflow: 'initial' }}>
                  {this.props.children}
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                  汉艺网商家端V0.9
                </Footer>
              </Layout>
            </Layout>
        );
    }
}


export default App