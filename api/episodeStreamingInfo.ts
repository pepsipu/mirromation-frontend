import axios from 'axios';
import { getCookies } from './incapsula';
import config from '../config/config.json';

const { apiEndpoint } = config;

export default function getEpisodeStreamingInfo(episodeId: number | string): Promise<EpisodeStreamingSources> {
  return new Promise((resolve, reject) => {
    axios.get(`${apiEndpoint}/api/showexperience/${episodeId}`, {
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
