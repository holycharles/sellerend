import React from 'react';
import ReactDOM from 'react-dom';
import App, {appModel} from './App';
import { message } from 'antd';
import './index.css';
import './style/lib/animate.css';
//import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
import Page from './components/Page';
import BasicForm from './components/forms/BasicForm';
import BasicTable from './components/tables/BasicTables';
import AdvancedTable from './components/tables/AdvancedTables';
import AsynchronousTable from './components/tables/AsynchronousTable';
import Login, {loginModel} from './components/pages/Login';
import Echarts from './components/charts/Echarts';
import Recharts from './components/charts/Recharts';
import Icons from './components/ui/Icons';
import Buttons from './components/ui/Buttons';
import Spins from './components/ui/Spins';
import Modals from './components/ui/Modals';
import Notifications from './components/ui/Notifications';
import Tabs from './components/ui/Tabs';
import Banners from './components/ui/banners';
import Drags from './components/ui/Draggable';
import Dashboard from './components/dashboard/Dashboard';
import Gallery from './components/ui/Gallery';
import NotFound from './components/pages/NotFound';
import BasicAnimations from './components/animation/BasicAnimations';
import ExampleAnimations from './components/animation/ExampleAnimations';
import TestForm, {testFormModel} from './components/hy/orders/BasicForm';
import CateSelect, {cateSelectModel} from './components/hy/product/CateSelect';
import ProductAdd, {productAddModel} from './components/hy/product/ProductAdd';
import dva, { connect } from 'dva';
import { Router, Route, IndexRedirect, hashHistory} from 'dva/router';
const app = dva({
    onError(e) {
        message.config({
            top: 8,
            duration: 3,
        });
        message.error(e.message, 3);
    },
});
app.model({
    namespace: 'init',
    state: {
        memberId: 0
    },
    reducers: {
        initState(state, { payload }) {
            return { ...state, ...payload};
        }
    },
    effects: {
        *init({payload}, {call, put}){
            let {memberId} = JSON.parse(localStorage.getItem("auth"));

            yield put({ type: 'initState', payload: {memberId}});
        },
    },
    subscriptions: {
        setup({dispatch}) {
            if(localStorage.getItem("auth")) {
                dispatch({type: 'init'});
            }
        }
    },
});
app.model(loginModel);
app.model(testFormModel);
app.model(cateSelectModel);
app.model(productAddModel);
const Wysiwyg = (location, cb) => {     // 按需加载富文本配置
    require.ensure([], require => {
        cb(null, require('./components/ui/Wysiwyg').default);
    }, 'Wysiwyg');
};

let authLogin = ()=> {
    if(!localStorage.getItem("auth") && !localStorage.getItem("remember")) {
        location.href="#/login"
    } else {

    }
}
const routes =
    <Route path={'/'} components={Page}  >
        <IndexRedirect to="hy/orders/form" />
        <Route path={'hy'} component={App} onEnter={authLogin}>
                <Route path={'orders/form'} component={TestForm} />
            <Route path={'product/addProduct'} component={CateSelect} />
            <Route path={'product/productAdd'} component={ProductAdd} />
        </Route>
        <Route path={'app'} component={App}>
          
            <Route path={'form'}>
                <Route path={'basicForm'} component={BasicForm} />
            </Route>
            <Route path={'table'}>
                <Route path={'basicTable'} component={BasicTable} />
                <Route path={'advancedTable'} components={AdvancedTable} />
                <Route path={'asynchronousTable'} components={AsynchronousTable} />
            </Route>
            <Route path={'chart'}>
                <Route path={'echarts'} component={Echarts} />
                <Route path={'recharts'} component={Recharts} />
            </Route>
            <Route path={'ui'}>
                <Route path={'icons'} component={Icons} />
                <Route path={'buttons'} component={Buttons} />
                <Route path={'spins'} component={Spins} />
                <Route path={'modals'} component={Modals} />
                <Route path={'notifications'} component={Notifications} />
                <Route path={'tabs'} component={Tabs} />
                <Route path={'banners'} component={Banners} />
                <Route path={'wysiwyg'} getComponent={Wysiwyg} />
                <Route path={'drags'} component={Drags} />
                <Route path={'gallery'} component={Gallery} />
            </Route>
            <Route path={'animation'}>
                <Route path={'basicAnimations'} component={BasicAnimations} />
                <Route path={'exampleAnimations'} component={ExampleAnimations} />
            </Route>
            <Route path={'dashboard/index'} component={Dashboard} />
        </Route>
        <Route path={'login'} components={Login} onEnter={authLogin} />
        <Route path={'404'} component={NotFound} />
    </Route>;


app.router(()=> (
  <Router history={hashHistory}>
      {routes}
  </Router>
  )
);

app.start('#root');