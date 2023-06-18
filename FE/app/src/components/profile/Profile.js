import React, { useState, useEffect} from 'react';
import './Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { faCakeCandles } from '@fortawesome/free-solid-svg-icons'
import { faSchool } from '@fortawesome/free-solid-svg-icons'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { faBriefcase } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import axios  from 'axios';


const Profile = () => {
  const userProfileData = {
    user_email: '',
    password: '',
    private_name: '',
    last_name: '',
    birthday_date: '',
    faculty: '',
    year: '',
    job_company_name: '',
    job_start_year: 0,
    job_description: '',
    user_image: '',
  };

  // Get User Profile handler
  const getUserProfile = async () => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem("token"),
      },
    };

    try {
      let userDataRequest = await axios.get('http://localhost:8080/profile', config);
      if (userDataRequest !== undefined && userDataRequest.status === 200) {
        // Retrieve user profile data
        let userData = userDataRequest.data;
        // Update the form data with the retrieved values
        setFormData({
          user_email: userData.user_email,
          password: userData.password,
          private_name: userData.private_name,
          last_name: userData.last_name,
          birthday_date: userData.birthday_date,
          faculty: userData.faculty,
          year: userData.year,
          job_company_name: userData.job_company_name,
          job_start_year: userData.job_start_year,
          job_description: userData.job_description,
          user_image: userData.user_image,
        });
      }
    } catch (err) {
      if (err.response !== undefined && err.response.status === 401) {
        // Unable to get user profile data
        console.log('Failed to get user profile data');
      }
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState(userProfileData);
  const [savedFormData, setSavedFormData] = useState(userProfileData);

  const toggleEditMode = () => {
    if (isEditMode) {
      setIsEditMode(false);
      setFormData(savedFormData);
    } else {
      setIsEditMode(true);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save the form data
    setSavedFormData(formData);
    toggleEditMode();
  };

  return (
    <div className="profile-container">
      <h2 className='title'>עמוד פרופיל</h2>
      <form className='profile-form' onSubmit={handleSubmit}>
        <div className="profile-fields">
          <label>דוא"ל<FontAwesomeIcon icon={faEnvelope} size="lg" style={{ color: "#273f68", }} /></label>
          {isEditMode ? (
            <input
              type="text"
              name="user_email"
              value={formData.user_email}
              onChange={handleChange}
            />
          ) : (
            <span>{formData.user_email}</span>
          )}
        </div>
        <div className="profile-fields">
          <label>סיסמא<FontAwesomeIcon icon={faLock} size="lg" /></label>
          {isEditMode ? (
            <input
              type="text"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          ) : (
            <span>{formData.password}</span>
          )}
        </div>
        <div className="profile-fields">
          <label>שם פרטי<FontAwesomeIcon icon={faUser} size="lg" /></label>
          {isEditMode ? (
            <input
              type="text"
              name="private_name"
              value={formData.private_name}
              onChange={handleChange}
            />
          ) : (
            <span>{formData.private_name}</span>
          )}
        </div>
        <div className="profile-fields">
          <label>שם משפחה<FontAwesomeIcon icon={faUser} size="lg" /></label>
          {isEditMode ? (
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
            />
          ) : (
            <span>{formData.last_name}</span>
          )}
        </div>
        <div className="profile-fields">
          <label>תאריך לידה<FontAwesomeIcon icon={faCakeCandles} size="lg" /></label>
          {isEditMode ? (
            <input
              type="text"
              name="birthday_date"
              value={formData.birthday_date}
              onChange={handleChange}
            />
          ) : (
            <span>{formData.birthday_date}</span>
          )}
        </div>
        <div className="profile-fields">
          <label>פקולטה<FontAwesomeIcon icon={faSchool} size="lg" /></label>
          {isEditMode ? (
            <input
              type="text"
              name="faculty"
              value={formData.faculty}
              onChange={handleChange}
            />
          ) : (
            <span>{formData.faculty}</span>
          )}
        </div>
        <div className="profile-fields">
          <label>שנת לימודים נוכחית/ בוגר<FontAwesomeIcon icon={faCalendar} size="lg" /></label>
          {isEditMode ? (
            <input
              type="text"
              name="year"
              value={formData.year}
              onChange={handleChange}
            />
          ) : (
            <span>{formData.year}</span>
          )}
        </div>
        <div className="profile-fields">
          <label>שם חברה<FontAwesomeIcon icon={faBriefcase} size="lg" /></label>
          {isEditMode ? (
            <input
              type="text"
              name="job_company_name"
              value={formData.job_company_name}
              onChange={handleChange}
            />
          ) : (
            <span>{formData.job_company_name}</span>
          )}
        </div>
        <div className="profile-fields">
          <label>שנת תחילת עבודה<FontAwesomeIcon icon={faBriefcase} size="lg" /></label>
          {isEditMode ? (
            <input
              type="text"
              name="job_start_year"
              value={formData.job_start_year}
              onChange={handleChange}
            />
          ) : (
            <span>{formData.job_start_year}</span>
          )}
        </div>
        <div className="profile-fields">
          <label>תיאור העבודה<FontAwesomeIcon icon={faBriefcase} size="lg" style={{ color: '#273f68' }} /></label>
          {isEditMode ? (
            <input
              type="text"
              name="job_description"
              value={formData.job_description}
              onChange={handleChange}
            />
          ) : (
            <span>{formData.job_description}</span>
          )}
        </div>
        <div className="profile-fields">
          <label>תמונת פרופיל<FontAwesomeIcon icon={faImage} size="lg" /></label>
          {isEditMode ? (
            <input
              type="text"
              name="user_image"
              value={formData.user_image}
              onChange={handleChange}
            />
          ) : (
            <img src={formData.user_image} alt="Profile" />
          )}
        </div>
        {isEditMode ? (
          <div className="buttons">
            <button type="submit">שמור</button>
            <button onClick={toggleEditMode}>ביטול</button>
          </div>
        ) : (
          <button onClick={toggleEditMode}>עריכת פרופיל</button>
        )}
      </form>
    </div>
  );
};
export default Profile;



