import {useState} from 'react';
export function CreateTodo(){
    const [title,setTitle]=  useState("");
    const[description,setDescription]=useState("")
  

    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",

          padding: 40,
          margin: 100,
          background: "red",
        }}
      >
        <input
          style={{
            padding: 10,
            margin: 10,
          }}
          type="text"
          placeholder="text"
          onChange={function (e) {
            const value = e.target.value;
            setTitle(e.target.value);
          }}
        />
        <br /> <br />
        <input
          style={{
            padding: 10,
            margin: 10,
          }}
          type="text"
          placeholder="text"
          onChange={function (e) {
            const value = e.target.value;
            setDescription(e.target.value);
          }}
        />
        <br />
        <button
          onClick={() => {
            fetch("http://localhost:3000/addTodo", {
              method: "POST",
              body:JSON.stringify({
                title: title,
                description: description,
              }),
              headers:{
                "contentType":"application/json"
              }
            }).then(async function () {
              const json = await res.json;
              alert("Todo Added");
            });
          }}
        >
          add todo
        </button>
      </div>
    );
}