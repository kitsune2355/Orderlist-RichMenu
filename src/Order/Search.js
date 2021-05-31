import axios from 'axios';
import React ,{useState} from 'react'
import OrderDetail from './OrderDetail';

const Search = () => {

  const [order ,setOrder] = useState({ID: "", data:null});
  

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(order.ID !== ""){
      await axios.post(
        'https://podsable.com:4017/order-online-bill',
        {
            od_online_number: order.ID,
            lang: 'th'
        }
      ).then(res =>{
        if(res.data.isSuccess){
          console.log(res)
          setOrder({...order, data : res.data.data})
        }else{
          setOrder({...order, data:null})
        }
      }).catch(err=>{
        alert("เซิฟเวอร์ผิดพลาด กรุณาลองใหม่ในภายหลัง")
      })
    }
    else{
      alert("กรุณากรอกรหัสสินค้า")
    }
  }

  return (
    <div>
      <div className="logo">
        <img src="/assets/img_logo.png" />
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Order ID:
          <input type="text" value={order.ID} onChange={(e) => setOrder({...order,ID:e.target.value}) } />
        </label>
        <input type="submit" value="ค้นหา"/>
        </form>
        {!order.data ? 
          <div>
            ไม่มีข้อมูล
          </div>
          :
          order.data.map((order, key)=>
            <div className="container-fluid" key={key}>
              
              <div className="row mx-2 mt-5 pb-2 line">
                  <div className="col-12 px-0 d-flex justify-content-between">
                      <strong>ประเภทการรับสินค้า : </strong>
                      <div>{order.receive_channel}</div>
                  </div>
              </div>

              <div className="row mx-2 mt-3 pb-2 ">
                  <div className="col-12 px-0 ">
                      <strong>สินค้าทั้งหมด : </strong>

                      {order.product.map((product,key)=>
                      <div className="col-12 px-0 d-flex justify-content-between" key={key}>
                        <div>{product.pr_name}</div>
                        <div>{product.price}</div>
                      </div>
                      )}

                  </div>
              </div>
              
              <div className="row mx-2 pb-2">
                  <div className="col-12 px-0 d-flex justify-content-between">
                      <strong>ค่าส่ง : </strong>
                      <div>{order.delivery_cost}</div>
                  </div>
                  <div className="col-12 px-0 d-flex justify-content-between">
                      <strong>ส่วนลดค่าส่ง : </strong>
                      <div>-{order.discount_delievry_cost}</div>
                  </div>
              </div>

              <div className="row mx-2 pb-2">
                  <div className="col-12 px-0 d-flex justify-content-between">
                      <strong>ราคาของออเดอร์ : </strong>
                      <div>{order.sum_price}</div>
                  </div>
              </div>

              <div className="row mx-2 pb-2 line">
                  <div className="col-12 px-0 pb-2 d-flex justify-content-between">
                      <strong>ช่องการการชำระ : </strong>
                      <div>{order.payment_channel_name}</div>
                  </div>
              </div>
              <div className="row mx-2 mt-3 pb-2 ">
                  <div className="col-12 px-0 pb-2 ">
                      <strong>ที่อยู่ที่จัดส่ง : </strong>
                      <div>&emsp;{order.mem_address}</div>
                  </div>
              </div>
            </div>
          )
          
        }
     
    </div>
  )
}

export default Search
