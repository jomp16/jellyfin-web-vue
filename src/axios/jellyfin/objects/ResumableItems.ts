import { Item } from "@/axios/jellyfin/objects/Item";

export interface ResumableItems {
  Items: Item[];
  TotalRecordCount: number;
}
