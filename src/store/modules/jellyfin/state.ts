import { User } from "@/axios/jellyfin/objects/User";
import { SessionInfo } from "@/axios/jellyfin/objects/SessionInfo";
import { SystemInfo } from "@/axios/jellyfin/objects/SystemInfo";

export class JellyfinState {
  serverUrl: string = "http://localhost:9200";
  accessToken: string | null = null;
  currentUser: User | null = null;
  sessionInfo: SessionInfo | null = null;
  systemInfo: SystemInfo | null = null;
}
