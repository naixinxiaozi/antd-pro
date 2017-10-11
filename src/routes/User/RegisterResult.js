import React from 'react';
import { Button } from 'antd';
import { Link } from 'dva/router';
import Result from '../../components/Result';

const actions = (
  <div>
    <Button type="primary"><a href="">查看邮箱</a></Button>
    <Button><Link to="/">返回首页</Link></Button>
  </div>
);

export default () => (
  <div style={{ width: 520, margin: '0 auto' }}>
    <Result
      type="success"
      title="你的账户：AntDesign@example.com 注册成功"
      description="激活邮件已发送到你的邮箱中，邮件有效期为24小时。请及时登录邮箱，点击邮件中的链接激活帐户。"
      actions={actions}
      style={{ marginTop: 64 }}
    />
  </div>
);