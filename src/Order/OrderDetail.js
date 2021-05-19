import axios from "axios";
import React, { useEffect, useState } from "react";
import './style.css'

const OrderDetail = () => {

    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState({});
    const [product, setProduct] = useState({});
    const [productTwo, setProductTwo] = useState({});

    useEffect(() => {
    axios.post(
        'https://podsable.com:4017/order-online-bill',
        {
            od_online_number: 'OD-ARP17151227',
            lang: 'th'
        }
        )
    
    .then((res)=>{
        setLoading(false);
        console.log(res.data);

        if(res.data.isSuccess === true){
            setOrder(res.data.data[0]);
            setProduct(res.data.data[0].product[0]);
            setProductTwo(res.data.data[0].product[1]);
        }
    })
    .catch(() => {
        console.log('error')
    });
  }, []);

  if (loading === true) {
    return <div>loading...</div>
  }
  return (
    <div class="container-fluid">
        <div className="logo">
            <img src="/assets/img_logo.png" />
        </div>
        <div class="row mx-2 mt-5 pb-2 line">
            <div className="col-12 px-0 d-flex justify-content-between">
                <div>ประเภทการรับสินค้า : </div>
                <div>{order.receive_channel}</div>
            </div>
        </div>
        <div class="row mx-2 mt-3 pb-2 line">
            <div className="col-12 px-0 d-flex justify-content-between">
                <div>ราคาของออเดอร์ : </div>
                <div>{order.sum_price}</div>
            </div>
            <div className="col-12 px-0 d-flex justify-content-between">
                <div>ค่าส่ง : </div>
                <div>{order.delivery_cost}</div>
            </div>
            <div className="col-12 px-0 d-flex justify-content-between">
                <div>ส่วนลดค่าส่ง : </div>
                <div>{order.discount_delievry_cost}</div>
            </div>
            
        </div>

        <div class="row mx-2 mt-3 pb-2 line">
            <div className="col-12 px-0 pb-2 d-flex justify-content-between">
                <div>ช่องการการชำระ : </div>
                <div>{order.payment_channel_name}</div>
            </div>
        </div>
        <div class="row mx-2 mt-3 pb-2 ">
            <div className="col-12 px-0 pb-2 ">
                <div>ที่อยู่ที่จัดส่ง : </div>
                <div>&emsp;{order.mem_address}</div>
            </div>
            <div className="col-12 px-0 ">
                <div>สินค้าทั้งหมด : </div>
                <div>&emsp;{product.pr_name}</div>
                <div>&emsp;{productTwo.pr_name}</div>
            </div>
        </div>
    </div>
  )
};

export default OrderDetail
