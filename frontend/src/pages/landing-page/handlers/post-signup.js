import axios from 'axios'

const postSignup = async (url = "", data = {}) => {
  try {
    const res = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res;
  } catch (err) {
    console.log("POSTSIGN: ", err);
  }
};

export default postSignup;
