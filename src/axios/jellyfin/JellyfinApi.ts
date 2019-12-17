import { SystemInfo } from "@/axios/jellyfin/objects/SystemInfo";
import axios from "axios";
import { User } from "@/axios/jellyfin/objects/User";

export class JellyfinApi {
  private readonly url!: string;

  constructor(url: string) {
    this.url = url;
  }

  async getPublicSystemInfo(): Promise<SystemInfo> {
    let response = await axios.get<SystemInfo>(
      `${this.url}/System/Info/Public`
    );

    return response.data;
  }

  async getPublicUsers(): Promise<User> {
    let response = await axios.get<User>(`${this.url}/users/public`);

    return response.data;
  }
}
