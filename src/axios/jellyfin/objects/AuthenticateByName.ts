import { User } from "@/axios/jellyfin/objects/User";
import { SessionInfo } from "@/axios/jellyfin/objects/SessionInfo";

export interface AuthenticateByName {
  User: User;
  SessionInfo: SessionInfo;
  AccessToken: string;
  ServerId: string;
}
