/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
const FormItem = Form.Item;
import dva, { connect } from 'dva';
import { routerRedux } from 'dva/router'
import {Request} from "../../utils"
export const loginModel = {
  namespace: 'login',
  state: {
    index: 0
  },
  reducers: {
   
  },
  effects: {
    *login({payload}, { call, put }) {
        try {
           const response = yield call(Request, 'seller/newseller/doLogin', payload);
           if(!response.success) {
               message.error(response.message);
           } else {
               let {data} = response;
               let sellerobj = JSON.stringify(data);
               let {remember} = payload;
               localStorage.setItem("remember", remember);
               localStorage.setItem("auth", sellerobj);
               yield put(routerRedux.push('hy/orders/form'));
           }
        } catch (error) {
            console.log(error);
        }
    }
  },
  subscriptions: {
   
  },
}
// @connect(({loginModel}) => ({...loginModel}))
class Login extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.dispatch({ type: 'login/login', payload: values });
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                <div></div>
                <div className="login-form" >
                    <div className="login-logo">
                        <span>汉艺网商家端后台</span>
                    </div>
                    <Form onSubmit={this.handleSubmit} style={{maxWidth: '300px'}}>
                        <FormItem>
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: '请输入用户名!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>记住我</Checkbox>
                            )}
                            <a className="login-form-forgot" href="" style={{float: 'right'}}>忘记密码</a>
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                                登录
                            </Button>
                            或 <a href="">现在就去注册!</a>

                        </FormItem>
                    </Form>
                </div>
            </div>

        );
    }
}
function mapStateToProps(state) {
  return { ...state.login };
}
//export default Form.create()(Login);

export default connect(mapStateToProps)(Form.create()(Login));