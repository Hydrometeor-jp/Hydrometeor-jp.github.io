import type {
  MicroCMSDate,
  MicroCMSImage,
  MicroCMSListContent,
  MicroCMSQueries,
} from "microcms-js-sdk"
import { createClient } from "microcms-js-sdk"

const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY,
})

// カスタムフィールド: アーティストリンク
// https://hydrometeor.microcms.io/apis/albums/custom-fields/artistLink
export type ArtistLink = {
  name: string
  url?: string
}

// カスタムフィールド: トラック
// https://hydrometeor.microcms.io/apis/albums/custom-fields/track
export type Track = {
  title: string
  artistLinks: ArtistLink[]
}

// API: アルバム情報
// https://hydrometeor.microcms.io/apis/albums
export type Album = {
  title: string
  releaseDate: MicroCMSDate
  thumbnail: MicroCMSImage
  iconLinks?: string
  spotifyAlbumID?: string
  youtubeMovieID?: string
  trackList?: Track[]
} & MicroCMSListContent

// API: ニュース
// https://hydrometeor.microcms.io/apis/news
export type News = {
  title: string
  date: MicroCMSDate
} & MicroCMSListContent

// API: Submissions
// https://hydrometeor.microcms.io/apis/submissions
export type Submission = {
  title: string
  body: string
} & MicroCMSListContent

export const getMusicList = async (queries?: MicroCMSQueries) => {
  return await client.getList<Album>({ endpoint: "albums", queries })
}

export const getMusicByTitle = async (title: string): Promise<Album | null> => {
  const result = await client.getList<Album>({
    endpoint: "albums",
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

export const getSubmissionsList = async (): Promise<Submission[]> => {
  const result = await client.getList<Submission>({
    endpoint: "submissions",
  })
  return result.contents
}
