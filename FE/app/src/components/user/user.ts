import axios from "axios";

export const getConfig = (token) => {
  return {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
};
export const getUserProfile = async (token) => {
  const user = {
    email: "",
    password: "",
    private_name: "",
    birthday_date: "",
    last_name: "",
    faculty: "",
    year: "",
    job_company_name: "",
    job_start_year: "",
    job_description: "",
    user_image: "",
    cv_resume: "",
    token: token,
  };

  const config = getConfig(token);
  try {
    let userDataRequest = await axios.get(
      "http://localhost:8080/profile",
      config
    );
    if (userDataRequest !== undefined && userDataRequest.status === 200) {
      user.private_name =
        userDataRequest.data.private_name.charAt(0).toUpperCase() +
        userDataRequest.data.private_name.slice(1);
      user.birthday_date = userDataRequest.data.birthday_date;
      user.last_name =
        userDataRequest.data.last_name.charAt(0).toUpperCase() +
        userDataRequest.data.last_name.slice(1);
      user.faculty = userDataRequest.data.faculty;
      user.year = userDataRequest.data.year;
      user.job_company_name = userDataRequest.data.job_company_name;
      user.job_start_year = userDataRequest.data.job_start_year;
      user.job_description = userDataRequest.data.job_description;
      user.user_image = userDataRequest.data.user_image;
      user.cv_resume = userDataRequest.data.cv_resume;
      user.token = token;
      user.email = userDataRequest.data.user_email;
      user.password = userDataRequest.data.password;

      return user;
    }
  } catch (err) {
    if (err.response !== undefined && err.response.status === 401) {
      // Unable to get user profile data
      console.log("failed to get user profile data");
      return null;
    }
  }
  return null;
};

export const getUserFromJWT = (token) => {
  console.log("token: ", token);

  const base64Url = token.split(".")[1]; // Get the payload part
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); // Convert from Base64Url to Base64
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload).sub;
};

export const getUserFromEmail = async (props) => {
  try {
    let config = getConfig(props.token);
    let profileRequest = await axios.get(
      "http://localhost:8080/profile/" + props.email,
      config
    );
    if (profileRequest !== undefined && profileRequest.status === 200) {
      console.log("we got author profile");
      return profileRequest.data;
    }
  } catch (err) {
    console.log(err);
    return "";
  }
};
