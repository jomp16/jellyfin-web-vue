import { Policy } from "@/axios/jellyfin/objects/Policy";
import { Configuration } from "@/axios/jellyfin/objects/Configuration";

export interface User {
  Name: string;
  ServerId: string;
  Id: string;
  HasPassword: boolean;
  HasConfiguredPassword: boolean;
  HasConfiguredEasyPassword: boolean;
  LastLoginDate: Date;
  LastActivityDate: Date;
  Configuration: Configuration;
  Policy: Policy;
  PrimaryImageTag: string;
  PrimaryImageAspectRatio?: number;
}
