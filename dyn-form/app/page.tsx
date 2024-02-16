'use client';

import {useState, useEffect } from 'react';


function Page() {
  const url = "http://131b6ea8-87b5-4141-969d-29d7f4ad6b58.mock.pstmn.io";
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(url+'/api/v1/formTypes/1').then((res) => res.json()).then((data) => {
      setData(data);
      console.log(data);
    });
    console.log(data);
  }, []);


  return (
    <div>
      <h1>Dynamic Form</h1>
      
    </div>
  );
}

export default Page;