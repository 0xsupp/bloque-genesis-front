import type { ImageAsset, Slug } from "@sanity/types";

export interface Author {
    _type: "post";
    _createdAt: string;
    name: string;
    slug: Slug;
    avatar?: ImageAsset;
    x?:string;
  }