import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const getStoriesList = async (storyType: string, page: number) => {
  const response = await axios.get(`${API_URL}/${storyType}.json`);
  return response.data.slice(page * 10, page * 10 + 10);
};

export const getStories = async (storyType: string, pageParam = 0) => {
  const newStoriesList = await getStoriesList(storyType, pageParam);
  const newStories = await Promise.all(
    newStoriesList.map((id: number) => getStory(id))
  );

  return newStories;
};

export const getStory = async (id: number) => {
  const response = await axios.get(`${API_URL}/item/${id}.json`);

  return response.data;
};
