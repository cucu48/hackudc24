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
  }, []);


  return (
    <div>
      <div className="container">
        <h1>{data.form_type_name}</h1>
        <p>{data.form_type_description}</p>

      </div>
     
          {data.form_elements && data.form_elements.map((element, index) => (
            // if element type is text
            element.field_type === "text" ?
            <div key={index} className="container">
              <label>{element.field_name}</label>
              <input type="text" />
            </div>
            :
            // if element type is select
            element.field_type === "select" ?
            <div key={index} className="container">
              <label>{element.field_name}</label>
              <select>
                {element.element_options && element.element_options.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>
            :
            // if element type is radio
            element.field_type === "radio" ?
            <div key={index} className="container">
              <label>{element.field_name}</label>
              {element.element_options && element.element_options.map((option, index) => (
                <div key={index}>
                  <input type="radio" id={option} name={element.field_name} value={option} />
                  <label htmlFor={option}>{option}</label>
                </div>
              ))}
            </div>
            :
            // if element type is checkbox
            element.field_type === "checkbox" ?
            <div key={index} className="container">
              <label>{element.field_name}</label>
              {element.element_options && element.element_options.map((option, index) => (
                <div key={index}>
                  <input type="checkbox" id={option} name={element.field_name} value={option} />
                  <label htmlFor={option}>{option}</label>
                </div>
              ))}
            </div>
            :
            // if element type is textarea
            element.field_type === "textarea" ?
            <div key={index} className="container">
              <label>{element.field_name}</label>
              <textarea></textarea>
            </div>
            :
            // if element type is date
            element.field_type === "date" ?
            <div key={index} className="container">
              <label>{element.field_name}</label>
              <input type="date" />
            </div>
            :
            // if element type is time
            element.field_type === "time" ?
            <div key={index} className="container">
              <label>{element.field_name}</label>
              <input type="time" />
            </div>
            :
            // if element type is email
            element.field_type === "email" ?
            <div key={index} className="container">
              <label>{element.field_name}</label>
              <input type="email" />
            </div>
            :
            // if element type is number
            element.field_type === "number" ?
            <div key={index} className="container">
              <label>{element.field_name}</label>
              <input type="number" />
            </div>
            :
            // if element type is tel
            element.field_type === "tel" ?
            <div key={index} className="container">
              <label>{element.field_name}</label>
              <input type="tel" />
            </div>
            :
            // if element type is url
            element.field_type === "url" ?
            <div key={index} className="container">
              <label>{element.field_name}</label>
              <input type="url" />
            </div>
            :
            // if element type is color
            element.field_type === "color" ?
            <div key={index} className="container">
              <label>{element.field_name}</label>
              <input type="color" />
            </div>
            :
            // if element type is file
            element.field_type === "file" ?
            <div key={index} className="container">
              <label>{element.field_name}</label>
              <input type="file" />
            </div>
            :
            // if element type is password
            element.field_type === "password" ?
            <div key={index} className="container">
              <label>{element.field_name}</label>
              <input type="password" />
            </div>
            :
            // if element type is hidden
            element.field_type === "hidden" ?
            <div key={index} className="container">
              <label>{element.field_name}</label>
              <input type="hidden" />
            </div>
            :
            // if element type is submit
            element.field_type === "submit" ?
            <div key={index} className="container">
              <input type="submit" value={element.field_name} />
            </div>
            :
            // if element type is reset
            element.field_type === "reset" ?
            <div key={index} className="container">
              <input type="reset" value={element.field_name} />
            </div>
            :
            // if element type is button
            element.field_type === "button" ?
            <div key={index} className="container">
              <button>{element.field_name}</button>
            </div>
            :
            // if element type is image
            element.field_type === "image" ?
            <div key={index} className="container">
              <input type="image" src={element.element_src} alt={element.field_name} />
            </div>
            :
            // if element type is range
            element.field_type === "range" ?
            <div key={index} className="container">
              <label>{element.field_name}</label>
              <input type="range" />
            </div>
            :
            // if element type is search
            element.field_type === "search" ?
            <div key={index} className="container">
              <label>{element.field_name}</label>
              <input type="search" />
            </div>
            :
            // if element type is month
            element.field_type === "month" ?
            <div key={index} className="container">
              <label>{element.field_name}</label>
              <input type="month" />
            </div>
            :
            // if element type is week
            element.field_type === "week" ?
            <div key={index} className="container">
              <label>{element.field_name}</label>
              <input type="week" />
            </div>
            :
            // if element type is datetime-local
            element.field_type === "datetime-local" ?
            <div key={index} className="container">
              <label>{element.field_name}</label>
              <input type="datetime-local" />
            </div>
            :
            // if element type is datetime
            element.field_type === "datetime" ?
            <div key={index} className="container">
              <label>{element.field_name}</label>
              <input type="datetime" />
            </div>
          // end all ifs
            
          : null
          ))}
      </div>
    
  );
}

export default Page;