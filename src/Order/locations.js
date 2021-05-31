import axios from "axios";
import React, { useEffect, useState } from "react";

const Locations = () => {
    const [loading, setLoading] = useState(true);
    const [location, setLocation] = useState([]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);

    axios.post(
            'https://podsable.com:4016/branch/full/list_eatin',
            {
                lang: 'th',
                lat: position.coords.latitude,
                long: position.coords.longitude,
            }
        )
    
    .then((res)=>{
        setLoading(false);
        console.log(res);

        if(res.data.isSuccess === true){
            // setLocation(res.data.data.map((lo) => console.log(lo.b_lat,lo.b_long,lo.b_name)));
            console.log(res.data.data.b_name)
            setLocation(res.data.data)
        }
    })
    .catch(() => {
        console.log('error')
    });
});

  },[]);
  if (loading === true) {
    return <div>loading...</div>
  }
  return (
    <div>
      {location.map(lo=>(
        <div style={{
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems: 'center',
            border: '1px solid rgba(0,0,0,0.5)',
            padding: '30px',
            margin: '20px',
            }}>
          <span>lat : {lo.b_lat}</span>
          <span>long : {lo.b_long}</span>
          <span>{lo.b_name}</span>
        </div>
      ))}
    </div>
  )
}

export default Locations
