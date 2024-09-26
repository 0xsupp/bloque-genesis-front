import { sanityClient } from "sanity:client";
import type { PortableTextBlock } from "@portabletext/types";
import type { ImageAsset, Slug } from "@sanity/types";
import groq from "groq";
import type { Author } from "./author.ts"

export async function getPosts(): Promise<Post[]> {
  return await sanityClient.fetch(
    groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc) {
        title,
        excerpt,
        slug,
        mainImage,
        "author": author->name
      }`);
}

export async function getPost(slug: string): Promise<Post> {
  return await sanityClient.fetch(
    groq`*[_type == "post" && slug.current == $slug][0]{
    _createdAt,
        title,
        excerpt,
        slug,
        mainImage,
        body,
        "author":author->{name, x},
        "relatedPosts": related[]->{
          title,
          excerpt,
          slug,
          mainImage
        }
    }`,
    {
      slug,
    }
  );
}


export interface Post {
  _type: "post";
  _createdAt: string;
  title?: string;
  slug: Slug;
  excerpt?: string;
  mainImage?: ImageAsset;
  author?: Author;
  readingTime?: number; 
  relatedPosts?: Post[];
  body: PortableTextBlock[];
}
