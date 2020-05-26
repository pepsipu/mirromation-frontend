import axios from 'axios';
import { getCookies } from './incapsula';

const { API_ENDPOINT } = process.env;

export function getTitleInformation(titleId: string, season: string = '1'): Promise<Object> {
  return new Promise((resolve, reject) => {
    axios.get(`${API_ENDPOINT}/api/episodes`, {
      params: {
        title_id: titleId,
        season,
        sort: 'order',
        sort_direction: 'ASC',
      },
      headers: {
        Cookie: getCookies(),
      },
    }).then((res) => {
      resolve(res.data);
    }).catch((err) => {
      reject(err);
    });
  });
}
