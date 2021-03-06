import React, {useState} from 'react';
import './Profile.css';
// import ProfileIcon from './ProfileIcon';

//Why not update the app state? It would rerender everything with each char typed
//Good practice to use separate state for forms and update the app state when
//the user starts an action (submit/etc)
const Profile = ({ isProfileOpen, toggleModal, user, loadUser }) => {
  
  const [name, setName] = useState(user.name);
  const [age, setAge] = useState(user.age);
  const [pet, setPet] = useState(user.pet);

  const onFormChange = (event) => {
    switch(event.target.name) {
      case 'user-name':
        setName(event.target.value)
        break;
      case 'user-age':
        setAge(event.target.value)
        break;
      case 'user-pet':
        setPet(event.target.value)
        break;
      default:
        return;
    }
  }

  const onProfileUpdate = (data) => {
    fetch(`http://localhost:3000/profile/${user.id}&${user.age}&${user.pet}`, {
      method: 'post',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': window.sessionStorage.getItem('token')
       },
      body: JSON.stringify({formInput: data})
    }).then(resp => {
      //304 means the resp was cached by the browser and returns it
      if (resp.status === 200 || resp.status === 304) {
        console.log("the pet is: " + user.pet)
        toggleModal();
        //keep what was there + overwrite maybe the age,name,pet
        loadUser({...user, ...data});
      }
    }).catch(err => console.log(err))
  }

  return (
    <div className="profile-modal">
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
        <main className="pa4 black-80 w-80">
          <img
            src="http://tachyons.io/img/logo.jpg"
            className="h3 w3 dib" alt="avatar"
          />
          <h1>{name}</h1>
          <h4>{`Images Submitted: ${user.entries}`}</h4>
          <p>{`Member since: ${new Date(user.joined).toLocaleDateString()}`}</p>
          <hr />
          <label className="mt2 fw6" htmlFor="user-name">Name:</label>
          <input
            onChange={onFormChange}
            className="pa2 ba w-100"
            placeholder={user.name}
            type="text"
            name="user-name"
            id="name"
          />
          <label className="mt2 fw6" htmlFor="user-age">Age:</label>
          <input
            onChange={onFormChange}
            className="pa2 ba w-100"
            placeholder={user.age}
            type="text"
            name="user-age"
            id="age"
          />
          <label className="mt2 fw6" htmlFor="user-pet">Pet:</label>
          <input
            onChange={onFormChange}
            className="pa2 ba w-100"
            placeholder={user.pet}
            type="text"
            name="user-pet"
            id="pet"
          />
          <div className='mt4' style={{display: 'flex', justifyContent: 'space-evenly'}}>
            <button 
              onClick={() => onProfileUpdate({name, age, pet})}
              className='b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20'>
              Save
            </button>
            <button className='b pa2 grow pointer hover-white w-40 bg-light-red b--black-20'
              onClick={toggleModal}>
              Cancel
            </button>
          </div>
        </main>
        <div className="modal-close" onClick={toggleModal}>&times;</div>
      </article>
    </div>
  );

}

export default Profile;