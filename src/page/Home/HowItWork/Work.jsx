import React, { useEffect, useState } from "react";

const Work = () => {
  const [contents, SetContent] = useState([]);
  useEffect(() => {
    fetch("../Wark.json")
      .then((res) => res.json())
      .then((data) => SetContent(data))
      .catch((err) => console.log(err));
  }, []);
  return(
<div className=" py-20 ">
<h3 className="text-xl font-bold text-secondary p-5">How it Works</h3>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 ">
 {contents.map((content, i) =>(
       <section key={i} className="bg-white rounded-2xl shadow-2xl py-5 px-2 flex flex-col items-center justify-center space-y-3 cursor-pointer hover:bg-primary transition-all duration-700 hover:translate-x-4">
        <img src={content.Image} alt="" />
        <h2 className="text-xl font-bold text-secondary">{content.tittle}</h2>
        <p className="text-base text-black/60 text-center">{content.description}</p>
    </section>
 ))}
</div>
</div>
  ) 
};

export default Work;
