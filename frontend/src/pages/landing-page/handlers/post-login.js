import axios from 'axios'

const postLogin = async (url = "", data = {}) => {
  try {
    const res = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res;
  } catch (err) {
    console.log("POSTLOGIN: ", err);
  }
};

export default postLogin;