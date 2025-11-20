import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "../../../node_modules/leaflet/dist/leaflet.css";
const Covarege = () => {
  const [serviceCenter, setServiceCenter] = useState([])

  useEffect(()=>{
    fetch('/warehouses.json')
    .then(res=>res.json())
    .then(data=>setServiceCenter(data));
  },[])
  const mapRef = useRef(null)
  const handelSearch = (e) =>{
      e.preventDefault()
      const searchValue = e.target.name.value;
      const dristic = serviceCenter.find(s => s.district.toLowerCase().includes(searchValue.toLowerCase()));
      if(dristic){
        const cord = [dristic.latitude, dristic.longitude]
        console.log(dristic, cord)
        mapRef.current.flyTo(cord, 13)
      }
  }

//   const handleLiveSearch = (e) => {
//   const searchValue = e.target.value;

//   if (!searchValue) return;

//   const dristic = serviceCenter.find((s) =>
//     s.district.toLowerCase().includes(searchValue.toLowerCase())
//   );

//   if (dristic && mapRef.current) {
//     mapRef.current.flyTo([dristic.latitude, dristic.longitude], 13);
//   }
// };


  console.log(serviceCenter)
  return (
    <div>
      <div className="py-15">
        <h2 className="text-4xl font-bold text-secondary">
          We are available in 64 districts
        </h2>
        <form onSubmit={handelSearch} action="" className="p-5">
          <input  type="text" name="name" className="border py-2"/>
          <button type="submit" className="rounded-r-xl border text-base py-2 cursor-pointer"> Search</button>
        </form>
      </div>
      <section>
        <MapContainer
          center={
             serviceCenter.length
              ? [serviceCenter[0].latitude, serviceCenter[0].longitude]
              : [23.8103, 90.4125]
          }
          zoom={7}
          scrollWheelZoom={true}
          className="h-[700px] w-full "
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
    {
        serviceCenter.map((center, index)=>
            <Marker key={index} position={[Number(center.latitude), Number(center.longitude)]}>
            <Popup>
              {center.region}, {center.district} <br /> Covered Areas: {center.covered_area.join(", ")} <br/>  Status: {center.status}
            </Popup>
          </Marker>
        )
    }
        </MapContainer>
      </section>
    </div>
  );
};

export default Covarege;
