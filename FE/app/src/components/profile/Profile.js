import React, { useState } from 'react';
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


const Profile = () => {
  const initialFormData = {
    user_email: 'moryo@mta.ac.il',
    password: '11',
    private_name: 'mor',
    last_name: 'yaakov',
    birthday_date: '20.6.2013',
    faculty: 'ComputerScience',
    year: 'First',
    job_company_name: 'dcs',
    job_start_year: 0,
    job_description: 'string',
    user_image: 'string',
  };

  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [savedFormData, setSavedFormData] = useState(initialFormData);

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
          <label>תמונת פרופיל<FontAwesomeIcon icon={faImage} size='lg' className='profileIcons' /></label>
          {isEditMode ? (
            <input
              type="text"
              name="user_image"
              value={formData.user_image}
              onChange={handleChange}
            />
          ) : (
            <span>{formData.user_image}</span>
          )}
        </div>

        <button type="submit" className="save-button" style={{ display: isEditMode ? 'block' : 'none'}}>
          Save
        </button>
      </form>

      <button className="edit-button" onClick={toggleEditMode} style={{backgroundColor: isEditMode? 'red': ''}}>
        {isEditMode ? 'Cancel' : 'Edit'}
      </button>
    </div>
  );
};

export default Profile;
