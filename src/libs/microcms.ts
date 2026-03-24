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
export type Albums = {
  title: string
  releaseDate: MicroCMSDate
  thumbnail: MicroCMSImage
  trackList?: Track[]
} & MicroCMSListContent

export const getAlbums = async (queries?: MicroCMSQueries) => {
  return await client.getList<Albums>({ endpoint: "albums", queries })
}
