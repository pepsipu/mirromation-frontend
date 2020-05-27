import axios from 'axios';
import { getCookies } from './incapsula';

const { API_ENDPOINT } = process.env;

export default function getEpisodeStreamingInfo(episodeId: number | string): Promise<EpisodeStreamingSources> {
  return new Promise((resolve, reject) => {
    axios.get(`${API_ENDPOINT}/api/showexperience/${episodeId}`, {
      params: {
        pinst_id: 'checkUrArgs',
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

export interface EpisodeStreamingSources {
  items?: (ItemsEntity)[] | null;
  watchHistorySaveInterval: number;
}
export interface ItemsEntity {
  showAds: boolean;
  src: string;
  kind: string;
  experienceId: string;
  id: number;
  videoType: string;
  isPromo: boolean;
  aips?: (AipsEntity)[] | null;
}
export interface AipsEntity {
  in: number;
  out: number;
}
