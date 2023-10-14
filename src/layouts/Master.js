import { Outlet } from "react-router";
import { useState,useEffect } from 'react';
import { Layout, Menu,Button } from 'antd';
import {
  PoweroffOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { logout,me,refresh } from "../redux/actions/AuthAction";
import { useSelector,useDispatch } from "react-redux";
import useInterval from '@use-it/interval';
import Cookies from 'universal-cookie';

const { Header, Content, Footer, Sider } = Layout;
const cookies = new Cookies();

function Master() {
  const [collapsed, setCollapsed] = useState(false),
        auth = useSelector(state => state.auth),
        dispatch = useDispatch()
  
  useEffect( () => {
    // if(auth.user == null){
    //   // dispatch(me())
    // }
  }, [])

  useInterval(() => {
    // Your custom logic here
    dispatch(refresh({}))
  }, 1200000);

  let navigate = useNavigate();

  let onCollapse = collapsed => {
    setCollapsed(collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1">
            <Link to="/"> Dashboard </Link> 
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/pending/invitations"> Invitations </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background bg-0" style={{ padding: 0,backgroundColor:"white" }} >
            <div style={{ float: 'right', marginRight: '17px' }}>
              <Button
                placement="bottomRight"
                icon={<PoweroffOutlined />}
                onClick={()=>{
                  dispatch(logout())
                }}
              >
                logout
              </Button>
            </div>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}> test </Footer>
      </Layout>
    </Layout>
  );
}

export default Master;
