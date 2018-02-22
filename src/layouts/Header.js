import React, { PureComponent } from 'react';
import { Layout, message } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import GlobalHeader from '../components/GlobalHeader';
import TopNavHeader from '../components/TopNavHeader';
import { getMenuData } from '../common/menu';
import styles from './Header.less';

const { Header } = Layout;

class HeaderView extends PureComponent {
  getHeadWidth = () => {
    if (!this.props.fixedHeader || this.props.layout === 'top') {
      return '100%';
    }
    if (!this.props.collapsed) {
      return 'calc(100% - 256px)';
    }
    if (this.props.collapsed) {
      return 'calc(100% - 80px)';
    }
  };
  handleNoticeClear = (type) => {
    message.success(`清空了${type}`);
    this.props.dispatch({
      type: 'global/clearNotices',
      payload: type,
    });
  };
  handleMenuClick = ({ key }) => {
    if (key === 'userCenter') {
      this.props.dispatch(routerRedux.push('/user-center'));
      return;
    }
    if (key === 'triggerError') {
      this.props.dispatch(routerRedux.push('/exception/trigger'));
      return;
    }
    if (key === 'userinfo') {
      this.props.dispatch(routerRedux.push('/userinfo/base'));
      return;
    }
    if (key === 'logout') {
      this.props.dispatch({
        type: 'login/logout',
      });
    }
  };
  handleNoticeVisibleChange = (visible) => {
    if (visible) {
      this.props.dispatch({
        type: 'global/fetchNotices',
      });
    }
  };
  render() {
    const {
      currentUser,
      logo,
      isMobile,
      collapsed,
      fetchingNotices,
      notices,
      location,
      handleMenuCollapse,
      silderTheme,
      layout,
      fixedHeader,
    } = this.props;
    const isTop = layout === 'top';
    return (
      <Header
        style={{ padding: 0, width: this.getHeadWidth() }}
        className={fixedHeader ? styles.fixedHeader : ''}
      >
        {isTop && !isMobile ? (
          <TopNavHeader
            logo={logo}
            theme={silderTheme}
            mode="horizontal"
            location={location}
            menuData={getMenuData()}
            isMobile={isMobile}
            onNoticeClear={this.handleNoticeClear}
            onCollapse={handleMenuCollapse}
            onMenuClick={this.handleMenuClick}
            onNoticeVisibleChange={this.handleNoticeVisibleChange}
            notices={notices}
            currentUser={currentUser}
            fetchingNotices={fetchingNotices}
          />
        ) : (
          <GlobalHeader
            logo={logo}
            currentUser={currentUser}
            fetchingNotices={fetchingNotices}
            notices={notices}
            collapsed={collapsed}
            isMobile={isMobile}
            onNoticeClear={this.handleNoticeClear}
            onCollapse={handleMenuCollapse}
            onMenuClick={this.handleMenuClick}
            onNoticeVisibleChange={this.handleNoticeVisibleChange}
          />
        )}
      </Header>
    );
  }
}

export default connect(({ user, global, setting, loading }) => ({
  currentUser: user.currentUser,
  collapsed: global.collapsed,
  fetchingNotices: loading.effects['global/fetchNotices'],
  notices: global.notices,
  layout: setting.layout,
  silderTheme: setting.silderTheme,
  fixedHeader: setting.fixedHeader,
}))(HeaderView);