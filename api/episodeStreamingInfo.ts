import axios from 'axios';
import { getCookies } from 'api/incapsula';
import config from 'config/config.json';

const { apiEndpoint } = config;

function getEpisodeStreamingInfo(episodeId: number | string): Promise<EpisodeStreamingSources> {
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

export default getEpisodeStreamingInfo;

interface EpisodeStreamingSources {
  items?: (ItemsEntity)[] | null;
  watchHistorySaveInterval: number;
}
interface ItemsEntity {
  showAds: boolean;
  src: string;
  kind: string;
  experienceId: string;
  id: number;
  videoType: string;
  isPromo: boolean;
  aips?: (AipsEntity)[] | null;
}
interface AipsEntity {
  in: number;
  out: number;
}
