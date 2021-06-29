import React, {useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import Alert from '../Alert'
import AnimalsApi from '../api'
import UserContext from '../users/UserContext'

function AdoptForm({src}){
    const {currentUser} = useContext(UserContext)
    const history = useHistory();
    const [formData,setFormData]=useState({
        pet_name: "",
        pet_img: src
    })
    const [formErrors,setFormErrors] = useState([])
    async function handleSubmit(e){
        try{
            e.preventDefault();
            await AnimalsApi.newPet(formData,currentUser.usr_id)
            history.push(`/users/${currentUser.usr_id}`)
        } catch(e){
            let errors = [e]
            setFormErrors(errors)
        }
    }
    function handleChange(e){
        const {name,value} = e.target;
        setFormData(l=>({...l,[name]:value}))
    }
    return(
        <div>
            <img alt='adopt-pet' src={src}/>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='pet_name'>Pet Name:</label>
                    <input id='pet_name' name='pet_name' value={formData.pet_name} onChange={handleChange} type='text' required/>
                </div>
                {formErrors.length ? <Alert messages={formErrors}/> : null}
                <button>Create!</button>
            </form>
        </div>
    )
}

export default AdoptForm;