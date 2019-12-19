import { UserData } from "@/axios/jellyfin/objects/UserData";
import { ImageTags } from "@/axios/jellyfin/objects/ImageTags";

export interface Item {
  Name: string;
  ServerId: string;
  Id: string;
  HasSubtitles: boolean;
  Container: string;
  PremiereDate: Date;
  CommunityRating: number;
  RunTimeTicks: number;
  ProductionYear: number;
  IndexNumber: number;
  ParentIndexNumber: number;
  IsFolder: boolean;
  Type: string;
  ParentBackdropItemId: string;
  ParentBackdropImageTags: string[];
  UserData: UserData;
  SeriesName: string;
  SeriesId: string;
  SeasonId: string;
  SeriesPrimaryImageTag: string;
  SeasonName: string;
  VideoType: string;
  ImageTags: ImageTags;
  BackdropImageTags: any[];
  LocationType: string;
  MediaType: string;
}
