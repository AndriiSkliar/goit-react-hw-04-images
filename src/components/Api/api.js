import axios from "axios";

const API_KEY = "39534369-205412e6b12f43677745c2c2a";
axios.defaults.baseURL = "https://pixabay.com/api/";

export const fetchImagesWithQuery = async (searchQuery, page) => {
  const response = await axios.get(`?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`);

  return response.data.hits;
};


