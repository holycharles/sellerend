/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import { createHashHistory } from 'history'
import { Table, Button,Input, Row,Icon, Col, Card,Form,Cascader } from 'antd';
import { getOrders } from '../../../axios';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import reqwest from 'reqwest';
import { Link } from 'react-router';
const FormItem = Form.Item;
let cateId;
class AddProduct extends React.Component {

    componentDidMount() {
        this.fetch();
    };
    state = {
        options: []
    };



    onChange(value){
        cateId=value[2];

    };
    goNext()
    {
        this.history.pushState(null, '/addProduct')
    };

    fetch = (params = {}) => {
        console.log('params:', params);
      /*  this.setState({ loading: true });*/
        reqwest({
            url: 'http://localhost:8890/seller/newServer/product/chooseCate.html',
            method: 'get',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: {

                sellerId: 1,

            },
            type: 'json',
        }).then((data) => {
            console.log("11111111111111111"+data.data)

            this.setState({
                options: data.data,
            });
        });
    };
    componentWillUnmount(){
        this.setState= null
    };
    render() {

       // const navigate = this.props.navigation;

        return (

            <div className="gutter-example">


            <Cascader   options={this.state.options}  onChange={this.onChange}  style={{ width: '100%'}} />
               {/* <button  style={{ width: '100%'}} onClick={this.goNext}>确定</button>*/}
                <Link to={{ pathname: '/app/ui/ProductAdd', query: { name: "3" } }}>确定</Link>
             </div>
        );
    }
}


export default AddProduct;
