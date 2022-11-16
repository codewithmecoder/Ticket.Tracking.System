import { axiosInstance } from './axiosBase';

const fetcher = async <T>(url: string, headers = {}): Promise<T | null> => {
  console.log(headers);
  try {
    const { data } = await axiosInstance.get<T>(url, {
      headers,
    });

    return data;
  } catch (e) {
    return null;
  }
};

export default fetcher;
