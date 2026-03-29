import IconLink from "@/components/IconLink"
import type { Music } from "@/libs/microcms"
import { paddingZero } from "@/libs/util"

export default function MusicPreviewImpl({ music }: { music: Music }) {
  return (
    <section class="max-w-4xl mx-auto px-8 py-16">
      <div class="flex flex-col md:flex-row gap-16">
        {/* サムネイル */}
        <div class="shrink-0">
          <img
            src={`${music.thumbnail.url}?w=600&fm=webp`}
            alt={music.thumbnail.alt ?? music.title}
            width={300}
            height={300}
            class="w-full md:w-72 object-cover"
          />

          <div class="mt-8">
            {music.iconLinks && (
              <div class="flex gap-2 justify-center">
                {music.iconLinks
                  .split("\n")
                  .map((url) => url.trim())
                  .filter((url) => url.length > 0)
                  .map((url) => (
                    <IconLink url={url} />
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* <!-- タイトル + トラックリスト --> */}
        <div class="flex flex-col gap-8">
          <h1 class="text-2xl">{music.title}</h1>

          {music.trackList && music.trackList.length > 0 && (
            <ol class="flex flex-col gap-2">
              {music.trackList.map((track, i) => (
                <li class="grid grid-cols-[2rem_1fr] gap-x-4 text-sm">
                  <span class="text-neutral-400">{paddingZero(i + 1, 2)}</span>
                  <span>
                    {track.artistLinks.map((artist, j) => (
                      <>
                        {artist.url ? (
                          <a
                            href={artist.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="underline hover:text-neutral-500 transition-colors"
                          >
                            {artist.name}
                          </a>
                        ) : (
                          <span>{artist.name}</span>
                        )}
                        {j < track.artistLinks.length - 1 && (
                          <span class="text-neutral-400 mr-1">, </span>
                        )}
                      </>
                    ))}
                    <span class="text-neutral-400 mx-2">—</span>
                    <span>{track.title}</span>
                  </span>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
      {(music.spotifyAlbumID ||
        music.bandcampEmbedUrl ||
        music.soundcloudEmbedUrl ||
        music.youtubeMovieID) && (
        <div class="flex flex-col gap-8 mt-16">
          {music.spotifyAlbumID && (
            <iframe
              src={`https://open.spotify.com/embed/music/${music.spotifyAlbumID}`}
              title={`${music.title} - Spotify`}
              width="100%"
              height="352"
              class="max-w-120 mx-auto"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          )}
          {music.bandcampEmbedUrl && (
            <iframe
              src={music.bandcampEmbedUrl}
              title={`${music.title} - Bandcamp`}
              seamless
              class="mx-auto border-0 w-full max-w-120 h-[472px]"
            />
          )}
          {music.soundcloudEmbedUrl && (
            <iframe
              src={music.soundcloudEmbedUrl}
              title={`${music.title} - SoundCloud`}
              width="100%"
              height="400"
              allow="autoplay"
              loading="lazy"
              scrolling="no"
              frameborder="no"
              class="max-w-120 mx-auto"
            />
          )}

          {music.youtubeMovieID && (
            <div class="relative w-full aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${music.youtubeMovieID}`}
                title={`${music.title} - YouTube`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                class="absolute inset-0 w-full h-full"
              />
            </div>
          )}
        </div>
      )}
    </section>
  )
}
