import React, { useEffect, useState } from "react"
import { FaEdit, FaTrash, FaCheck } from 'react-icons/fa'
import { Link } from "react-router-dom";


function List() {


    const [data, setData] = React.useState([])

    const getList = async () => {
        let result = await fetch('http://localhost:5000/List')
        result = await result.json();
        setData(result)
    }

    useEffect(() => {
        getList()
    }, [])


    const delData = async (id) => {
        let output = await fetch(`http://localhost:5000/Del/${id}`, {
            method: 'delete'
        })
        output = await output.json();
        if (output) {
            alert("deleted")
            getList();


        }

    }





    const buttonHandler=(id)=>{

        console.log(id);

        let tick = document.querySelector(".tick")
        let other = document.querySelector(".delll")
        let edit = document.querySelector(".edittt")

        if(id === id){
            other.style.display = "none";
            edit .style.display = "none";
        }


        // if(show == true){
        //     setShow(false)
        // }


        // let del = document.querySelector(".delll a")
        // let edit = document.querySelector(".edittt a")
        // let tick = document.querySelector(".tick a")

        // tick.addEventListener("click",()=>{
        //     edit.style.display = "none"
        //     del.style.display = "none"
        // })

    }




    return (
        <>
            <div className="list">
                <div className='main2'>

                    <div className="List2">
                        <div className="tab2">
                            <div className="H2">
                                <h2>ALL APPOINTMENT LIST</h2>
                            </div>
                            <table>
                                <tr>
                                    <td><b>Serial No.</b></td>
                                    <td><b>Name</b></td>
                                    <td><b>Age</b> </td>
                                    <td><b>Gender</b></td>
                                    <td><b>Location</b></td>
                                    <td><b>Phone No.</b></td>
                                    <td><b>Appointment Time</b></td>
                                    <td><b>Action</b></td>
                                </tr>
                                {
                                    data.map((item, index) =>

                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.age}</td>
                                            <td>{item.gender}</td>
                                            <td>{item.location}</td>
                                            <td>{item.phone}</td>
                                            <td>{item.appointment}</td>
                                            <td>
                                                <button className="delll"><a onClick={() => delData(item._id)}><FaTrash /></a></button>
                                                <button className="edittt"><Link to={"/Edit/" + item._id}><FaEdit /></Link></button>
                                                <button className="tick"><a onClick={() => buttonHandler(item._id)}> <FaCheck /></a></button></td>
                                        </tr>
                                    )}
                            </table>
                            <div className="back">
                                <button className="bck"><a href="/Home">Add More</a></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default List;