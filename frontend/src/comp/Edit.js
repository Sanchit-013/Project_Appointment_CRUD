import React, { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"





const Edit = () => {
    const phoneRegex = /^[0-9]{10}$/

    const [name, setName] = React.useState('')
    const [age, setAge] = React.useState('')
    const [gender, setGender] = React.useState('')
    const [location, setLocation] = React.useState('')
    const [phone, setPhone] = React.useState('')
    const [appointment, setAppointment] = React.useState('')
    const navigate = useNavigate()
    const params = useParams()

    const getData = async () => {
        console.warn(params);
        let result = await fetch(`http://localhost:5000/Edit/${params.id}`)
        result = await result.json()
        setName(result.name)
        setAge(result.age)
        setGender(result.gender)
        setLocation(result.location)
        setPhone(result.phone)
        setAppointment(result.appointment)
    }

    useEffect(() => {
        getData();
    }, [])

    const editData = async () => {
        if (name.length === 0 || age.length === 0 || gender.length === 0 || location.length === 0 || phone.length === 0 || appointment.length === 0) {
            alert('Please fill all the fields')
            return false
        } else if (!phone.match(phoneRegex) || phone.length < 10) {
            alert("Phone no. must be 10 digits long in NUMBERS only")
        } else if (isNaN(age) || age.length !== 2) {
            alert("Invalid age")
        } else {
            console.warn(name, age, gender, location, phone, appointment);
            let result = await fetch(`http://localhost:5000/Edit/${params.id}`, {
                method: 'put',
                body: JSON.stringify({ name, age, gender, location, phone, appointment }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            result = await result.json()
            if (result) {
                navigate('/List')
            }
        }
    }




    const handle = (e) => {
        e.preventDefault()
    }

    return (
        <>
            <div className="Home">
                <div className="main1">
                    <div className="container1">
                        <div className="set">
                            <h1>Edit AN APPOINTMENT</h1>
                        </div>
                        <form onSubmit={handle}>
                            <table>
                                <tr>
                                    <td><span>*</span>Name</td>
                                    <td><input type="text" placeholder="Enter Name" size={30} value={name} onChange={(e) => { setName(e.target.value) }} /></td>
                                </tr>
                                <tr>
                                    <td><span>*</span>Age</td>
                                    <td><input type="text" placeholder="Enter Age" size={30} value={age} onChange={(e) => { setAge(e.target.value) }} /></td>
                                </tr>
                                <tr>
                                    <td><span>*</span>Gender</td>
                                    <td><select value={gender} onChange={(e) => { setGender(e.target.value) }}>
                                        <option value={""} selected>Select any Gender</option>
                                        <option value={"Male"}>Male</option>
                                        <option value={"Female"}>Female</option>
                                        <option value={"other"}>Other</option>
                                    </select></td>

                                </tr>
                                <tr>
                                    <td><span>*</span>Location</td>
                                    <td><input type="text" placeholder="Enter Location" size={30} value={location} onChange={(e) => { setLocation(e.target.value) }} /></td>
                                </tr>
                                <tr>
                                    <td><span>*</span>Phone no.</td>
                                    <td><input type="text" placeholder="Enter Phone No." size={30} value={phone} onChange={(e) => { setPhone(e.target.value) }} /></td>
                                </tr>
                                <tr>
                                    <td><span>*</span>Appointment Time</td>
                                    <td><input type="datetime-local" className="date" placeholder="Enter Appointment Time" size={30} value={appointment} onChange={(e) => { setAppointment(e.target.value) }} /></td>
                                </tr>
                            </table>
                            <div className="divv">
                                <button className="logs1" onClick={editData}>Edit Appointment</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>






        </>
    )

}
export default Edit;