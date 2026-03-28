import useSWR from "swr"
import { getAlbumPreview } from "@/libs/microcms"

import MusicPreviewImpl from "./MusicPreviewImpl"

export default function MusicPreview() {
  const params = new URLSearchParams(window.location.search)
  const contentId = params.get("contentId")
  const draftKey = params.get("draftKey")

  const {
    data: music,
    error,
    isLoading,
    isValidating,
  } = useSWR(
    contentId == null || draftKey == null
      ? null
      : ["/preview/music", contentId, draftKey],
    ([, contentId, draftKey]) => getAlbumPreview(contentId, draftKey),
  )

  if (error) return <div>エラーが発生しました</div>
  if (isLoading) return <div>読み込み中...</div>
  if (isValidating) return <div>更新中...</div>

  return music ? (
    <MusicPreviewImpl music={music} />
  ) : (
    <div>アルバムが見つかりません</div>
  )
}
