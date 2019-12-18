import { SystemInfo } from "@/axios/jellyfin/objects/SystemInfo";
import axios from "axios";
import { User } from "@/axios/jellyfin/objects/User";
import { AuthenticateByName } from "@/axios/jellyfin/objects/AuthenticateByName";

export class JellyfinApi {
  private readonly url!: string;

  private appName: string = "Jellyfin Web VueJS";
  private appVersion: string = "0.0.1";
  private readonly accessToken: string | null = "0.0.1";
  private deviceName: string = "jellyfin-web-vue";
  private deviceId: string = "jellyfin-web-vue";

  constructor(url: string, accessToken: string | null) {
    this.url = url;
    this.accessToken = accessToken;
  }

  async getPublicSystemInfo(): Promise<SystemInfo> {
    let response = await axios.get<SystemInfo>(
      `${this.url}/System/Info/Public`
    );

    return response.data;
  }

  async getPublicUsers(): Promise<User> {
    try {
      let response = await axios.get<User>(`${this.url}/users/public`);

      return response.data;
    } catch (e) {
      if (!e.status) {
        throw new Error(
          "Server is offline. Start the server or check the URL."
        );
      } else {
        throw new Error(e.message);
      }
    }
  }

  private getRequestHeaders() {
    const values = [];

    values.push(`Client="${this.appName}"`);

    if (this.deviceName) {
      values.push(`Device="${this.deviceName}"`);
    }

    if (this.deviceId) {
      values.push(`DeviceId="${this.deviceId}"`);
    }

    values.push(`Version="${this.appVersion}"`);

    if (this.accessToken !== null) {
      values.push(`Token="${this.accessToken}"`);
    }

    let headers = { "X-Emby-Authorization": "" };

    if (values.length) {
      headers["X-Emby-Authorization"] = `MediaBrowser ${values.join(", ")}`;
    }

    return headers;
  }

  async tryLoginWithUsername(
    username: string,
    password: string
  ): Promise<AuthenticateByName> {
    try {
      let obj = {
        Username: username,
        Pw: password
      };

      let response = await axios.post<AuthenticateByName>(
        `https://cors-anywhere.herokuapp.com/${this.url}/Users/authenticatebyname`,
        obj,
        {
          headers: this.getRequestHeaders()
        }
      );

      return response.data;
    } catch (e) {
      if (e.response.status === 401) {
        // Login error
        throw new Error("Invalid user or password, check it and try again.");
      }

      throw new Error(e.response.data);
    }
  }

  async logout(): Promise<boolean> {
    try {
      let response = await axios.post(
        `https://cors-anywhere.herokuapp.com/${this.url}/Sessions/Logout`,
        undefined,
        {
          headers: this.getRequestHeaders()
        }
      );

      return response.status === 204;
    } catch (e) {
      if (e.response.status === 401) return true;

      throw new Error(e.message);
    }
  }
}
