import type {
  MicroCMSDate,
  MicroCMSImage,
  MicroCMSListContent,
  MicroCMSQueries,
} from "microcms-js-sdk"
import { createClient } from "microcms-js-sdk"

const client = createClient({
  serviceDomain: import.meta.env.PUBLIC_MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.PUBLIC_MICROCMS_API_KEY,
})

// カスタムフィールド: アーティストリンク
// https://hydrometeor.microcms.io/apis/music/custom-fields/artistLink
export type ArtistLink = {
  name: string
  url?: string
}

// カスタムフィールド: トラック
// https://hydrometeor.microcms.io/apis/music/custom-fields/track
export type Track = {
  title: string
  artistLinks: ArtistLink[]
}

// API: アルバム情報
// https://hydrometeor.microcms.io/apis/music
export type Music = {
  title: string
  releaseDate: MicroCMSDate
  thumbnail: MicroCMSImage
  iconLinks?: string
  spotifyAlbumID?: string
  youtubeMovieID?: string
  soundcloudEmbedUrl?: string
  bandcampEmbedUrl?: string
  trackList?: Track[]
} & MicroCMSListContent

// API: ニュース
// https://hydrometeor.microcms.io/apis/news
export type News = {
  title: string
  date: MicroCMSDate
} & MicroCMSListContent

// API: 公募情報
// https://hydrometeor.microcms.io/apis/blogs
export type Blog = {
  title: string
  body: string
  thumbnail: MicroCMSImage
} & MicroCMSListContent

export const getMusicList = async (queries?: MicroCMSQueries) => {
  return await client.getList<Music>({ endpoint: "music", queries })
}

export const getMusicByTitle = async (title: string): Promise<Music | null> => {
  const result = await client.getList<Music>({
    endpoint: "music",
    queries: { filters: `title[equals]${title}`, limit: 1 },
  })
  return result.contents[0] ?? null
}

export const getNewsList = async (): Promise<News[]> => {
  const result = await client.getList<News>({
    endpoint: "news",
    queries: { orders: "-date" },
  })
  return result.contents
}

export const getBlogsList = async (): Promise<Blog[]> => {
  const result = await client.getList<Blog>({
    endpoint: "blogs",
    queries: { orders: "-publishedAt" },
  })
  return result.contents
}

export const getBlogDetail = async (id: string): Promise<Blog> => {
  return await client.getListDetail<Blog>({
    endpoint: "blogs",
    contentId: id,
  })
}

export const getAlbumPreview = (contentId: string, draftKey: string) =>
  client.getListDetail<Music>({
    endpoint: "music",
    contentId,
    queries: { draftKey },
  })

export const getBlogPreview = (contentId: string, draftKey: string) =>
  client.getListDetail<Blog>({
    endpoint: "blogs",
    contentId,
    queries: { draftKey },
  })
