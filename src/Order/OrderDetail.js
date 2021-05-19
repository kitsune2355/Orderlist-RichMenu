import axios from "axios";
import React, { useEffect, useState } from "react";

const OrderDetail = () => {

    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState({});
    const [product, setProduct] = useState({});

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
    <div >
    <div class="container-fluid">
        <div class="row">
            kiki
        </div>
    </div>
          <p>ประเภทการรับสินค้า : {order.receive_channel}</p>
          <p>ราคาของออเดอร์ : {order.sum_price} บาท</p>
          <p>ค่าส่ง : {order.delivery_cost} บาท</p>
          <p>ส่วนลดค่าส่ง : {order.discount_delievry_cost} บาท</p>
          <p>ช่องการการชำระ : {order.payment_channel_name}</p>
          <p>ที่อยู่ที่จัดส่ง : {order.mem_address}</p>
          <p>สินค้าทั้งหมด : {product.pr_name}</p>
      </div>
  )
};

export default OrderDetail
