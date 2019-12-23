import { User } from "@/axios/jellyfin/objects/User";
import { ResumableItems } from "@/axios/jellyfin/objects/ResumableItems";

export class JellyfinUsersState {
  users: User[] = [];
  resumableItems: ResumableItems | null = null;
  nextUpEpisodes: ResumableItems | null = null;
}
