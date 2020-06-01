import axios from 'axios';
import { getCookies } from './incapsula';
import config from '../config/config.json';

const { apiEndpoint } = config;

export default function getEpisodesFromTitleId(titleId: number | string, season: number | string = '1'): Promise<Title> {
  return new Promise((resolve, reject) => {
    axios.get(`${apiEndpoint}/api/episodes`, {
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

export interface Title {
  count: number;
  items?: (ItemsEntity)[] | null;
  facets: Object;
  limit: number;
  offset: number;
  total: number;
}

export interface ItemsEntity {
  mostRecentSvodStartTimestamp: number;
  mostRecentAvodEngUsEndTimestamp: number;
  synopsis: string;
  mediaCategory: string;
  mostRecentAvodEngUs: MostRecentAvodEngUs;
  quality: Quality;
  genres?: (string)[] | null;
  titleImages: TitleImages;
  thumb: string;
  title: string;
  starRating: number;
  access?: (string)[] | null;
  mostRecentAvodJpnAllTerrStartTimestamp: number;
  version?: (string)[] | null;
  primaryAvail: string;
  mostRecentAvodJpnUsStartTimestamp: number;
  itemId: number;
  altAvail: string;
  contentType: string;
  mostRecentAvodJpnUsEndTimestamp: number;
  poster: string;
  mostRecentAvodJpnUs: MostRecentAvodJpnUs;
  mostRecentAvodEngAllTerrEndTimestamp: number;
  mostRecentSvod: MostRecentSvod;
  mostRecentAvodJpnAllTerrEndTimestamp: number;
  ids: Ids;
  versionAudio: VersionAudio;
  item: Item;
  mostRecentAvodEngAllTerrStartTimestamp: number;
  engAllTerritoryAvail: string;
  audio?: (string)[] | null;
  mostRecentAvodEngUsStartTimestamp: number;
  mostRecentAvod: MostRecentAvod;
}

export interface MostRecentAvodEngUs {
}

export interface Quality {
  quality: string;
  height: number;
}

export interface TitleImages {
  continueWatchingMobile: string;
  applePosterCover: string;
  showDetailBoxArtXbox_360: string;
  backgroundImageXbox_360: string;
  featuredSpotlightShowTablet: string;
  newShowDetailHeroPhone: string;
  appleSquareCover: string;
  continueWatchingDesktop: string;
  showThumbnail: string;
  backgroundImageAppletvfiretv: string;
  showLogo: string;
  showDetailHeroSite: string;
  showBackgroundSite: string;
  featuredSpotlightShowPhone: string;
  newShowDetailHero: string;
  showDetailHeroDesktop: string;
  showDetailHeaderDesktop: string;
  showMasterKeyArt: string;
  showDetailHeaderMobile: string;
  showDetailBoxArtPhone: string;
  showDetailBoxArtTablet: string;
  backgroundVideo: string;
  showKeyart: string;
}

export interface MostRecentAvodJpnUs {
  startDate: string;
  endDate: string;
  startTimestamp: string;
  distributor: string;
  experience: number;
  purchased: boolean;
  subscriptionRequired: boolean;
  mediaCategory: string;
  siblingEndTimestamp: string;
  availId: number;
  quality: string;
  siblingType: string;
  isPromo: boolean;
  version: string;
  territory: string;
  image: string;
  versionId: number;
  itemTitle: string;
  tier: string;
  purchase: string;
  siblingStartTimestamp: string;
  language: string;
  ids: Ids1;
  devices?: (string)[] | null;
  endTimestamp: string;
  item: Item;
}

export interface Ids1 {
  externalSeasonId: string;
  externalAsianId: string;
  externalShowId: string;
  externalEpisodeId: string;
  externalEnglishId?: null;
  externalAlphaId: string;
}

export interface Item {
  seasonTitle: string;
  seasonId: number;
  episodeOrder: number;
  episodeNum: string;
  titleSlug: string;
  created: string;
  episodeId: number;
  titleId: number;
  seasonNum: string;
  ratings?: ((string)[] | null)[] | null;
  showImage: string;
  episodeSlug: string;
  runtime: string;
  seasonOrder: number;
  episodeName: string;
  titleName: string;
  titleExternalId: string;
}

export interface MostRecentSvod {
  startDate: string;
  endDate: string;
  startTimestamp: string;
  distributor: string;
  devices?: (string)[] | null;
  subscriptionRequired: boolean;
  mediaCategory: string;
  siblingEndTimestamp: string;
  availId: number;
  quality: string;
  siblingType: string;
  isPromo: boolean;
  version: string;
  territory: string;
  image: string;
  versionId: number;
  itemTitle: string;
  tier: string;
  purchase: string;
  siblingStartTimestamp: string;
  language: string;
  ids: Ids1;
  experience: number;
  endTimestamp: string;
  item: Item;
}

export interface Ids {
  externalShowId: string;
  externalSeasonId: string;
  externalEpisodeId: string;
}

export interface VersionAudio {
  Simulcast?: (string)[] | null;
}

export interface MostRecentAvod {
  startDate: string;
  endDate: string;
  startTimestamp: string;
  devices?: (string)[] | null;
  distributor: string;
  mediaCategory: string;
  siblingEndTimestamp: string;
  availId: number;
  quality: string;
  siblingType: string;
  isPromo: boolean;
  version: string;
  territory: string;
  image: string;
  versionId: number;
  itemTitle: string;
  tier: string;
  purchase: string;
  siblingStartTimestamp: string;
  language: string;
  ids: Ids1;
  experience: number;
  endTimestamp: string;
  item: Item;
}
