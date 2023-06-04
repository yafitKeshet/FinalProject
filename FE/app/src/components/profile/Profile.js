import React, { useState } from 'react';
import './Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { faCakeCandles } from '@fortawesome/free-solid-svg-icons'
import { faSchool } from '@fortawesome/free-solid-svg-icons'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { faBriefcase} from '@fortawesome/free-solid-svg-icons'
import { faUser} from '@fortawesome/free-solid-svg-icons'
import { faImage} from '@fortawesome/free-solid-svg-icons'


const Profile = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
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
  });

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform save operation or API call here
    toggleEditMode();
  };

  return (
    <div className="profile-container">
      <h2 className='title'>עמוד פרופיל</h2>
      <form onSubmit={handleSubmit}>
        <div className="profile-fields">
            <label><FontAwesomeIcon icon={faEnvelope} size="lg" style={{color: "#273f68",}} /> אימייל</label>
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
          <label> <FontAwesomeIcon icon={faLock} size="lg" />  סיסמא</label>
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
          <label> <FontAwesomeIcon icon={faUser} size="lg"/>  שם פרטי</label>
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
          <label> <FontAwesomeIcon icon={faUser} size="lg"/>  שם משפחה</label>
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
          <label> <FontAwesomeIcon icon={faCakeCandles} size="lg"/>  תאריך לידה</label>
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
          <label> <FontAwesomeIcon icon={faSchool} size="lg" />  פקולטה</label>
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
          <label> <FontAwesomeIcon icon={faCalendar} size="lg"/>  שנת לימודים נוכחית/ בוגר</label>
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
          <label> <FontAwesomeIcon icon={faBriefcase} size="lg"/>  שם חברה</label>
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
          <label> <FontAwesomeIcon icon={faBriefcase} size="lg"/>  שנת תחילת עבודה</label>
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
          <label> <FontAwesomeIcon icon={faBriefcase} size="lg" style={{ color: '#273f68' }}/>  תיאור העבודה</label>
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
          <label><FontAwesomeIcon icon={faImage} size='lg' className='profileIcons'/>  תמונת פרופיל</label>
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

        <button type="submit" className="save-button" style={{ display: isEditMode ? 'block' : 'none' }}>
          Save
        </button>
      </form>

      <button className="edit-button" onClick={toggleEditMode}>
        {isEditMode ? 'Cancel' : 'Edit'}
      </button>
    </div>
  );
};

export default Profile;
