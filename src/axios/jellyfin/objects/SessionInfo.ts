import { Capabilities } from "@/axios/jellyfin/objects/Capabilities";
import { PlayState } from "@/axios/jellyfin/objects/PlayState";

export interface SessionInfo {
  PlayState: PlayState;
  AdditionalUsers: any[];
  Capabilities: Capabilities;
  RemoteEndPoint: string;
  PlayableMediaTypes: any[];
  Id: string;
  UserId: string;
  UserName: string;
  Client: string;
  LastActivityDate: Date;
  LastPlaybackCheckIn: Date;
  DeviceName: string;
  DeviceId: string;
  ApplicationVersion: string;
  SupportedCommands: any[];
  IsActive: boolean;
  SupportsMediaControl: boolean;
  SupportsRemoteControl: boolean;
  HasCustomDeviceName: boolean;
  ServerId: string;
  UserPrimaryImageTag: string;
}
