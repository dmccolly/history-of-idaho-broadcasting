import Link from 'next/link'
import Image from 'next/image'

interface HeroServerProps {
  headline: string
  subheadline?: string
  description?: string
  primary_button_text?: string
  primary_button_link?: {
    url: string
    target?: string
  }
  secondary_button_text?: string
  secondary_button_link?: {
    url: string
    target?: string
  }
  background_image?: {
    filename: string
    alt?: string
  }
  background_video?: {
    filename: string
  }
  layout_style?: 'default' | 'centered' | 'split'
}

export default function HeroServer({
  headline,
  subheadline,
  description,
  primary_button_text,
  primary_button_link,
  secondary_button_text,
  secondary_button_link,
  background_image,
  background_video,
  layout_style = 'default'
}: HeroServerProps) {
  const layoutClass = {
    default: 'text-left',
    centered: 'text-center',
    split: 'lg:text-left text-center'
  }[layout_style]

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-black pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      {/* Background overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-800/30 to-gray-900/30"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className={`grid lg:grid-cols-2 gap-12 items-center ${layout_style === 'centered' ? 'lg:grid-cols-1 text-center' : ''}`}>
          {/* Content Column */}
          <div className={`${layout_style === 'centered' ? 'mx-auto max-w-4xl' : ''}`}>
            <div className={layoutClass}>
              {/* Subheadline */}
              {subheadline && (
                <p className="text-sm font-semibold text-blue-400 uppercase tracking-wide mb-4 drop-shadow-sm">
                  {subheadline}
                </p>
              )}

              {/* Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-playfair-display text-white mb-6 leading-tight drop-shadow-lg">
                {headline}
              </h1>

              {/* Description */}
              {description && (
                <p className="text-xl text-gray-200 mb-8 leading-relaxed drop-shadow-sm">
                  {description}
                </p>
              )}

              {/* Buttons */}
              {(primary_button_text || secondary_button_text) && (
                <div className="flex flex-col sm:flex-row gap-4">
                  {primary_button_text && primary_button_link && (
                    <Link
                      href={primary_button_link.url}
                      target={primary_button_link.target || '_self'}
                      className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      {primary_button_text}
                    </Link>
                  )}

                  {secondary_button_text && secondary_button_link && (
                    <Link
                      href={secondary_button_link.url}
                      target={secondary_button_link.target || '_self'}
                      className="inline-flex items-center justify-center px-8 py-3 border border-white/30 text-base font-medium rounded-lg text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      {secondary_button_text}
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Media Column - Video or Image with offset style line */}
          {(background_video || background_image) && layout_style !== 'centered' && (
            <div className="relative">
              {/* Offset decorative line */}
              <div className="absolute -top-8 -left-8 w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
              
              <div className="relative">
                {background_video ? (
                  <div className="relative aspect-video bg-black overflow-hidden rounded-none shadow-2xl">
                    <video
                      autoPlay
                      muted
                      loop
                      className="w-full h-full object-cover"
                      controls
                    >
                      <source src={background_video.filename} type="video/mp4" />
                    </video>
                  </div>
                ) : background_image ? (
                  <div className="relative aspect-video bg-gray-900 overflow-hidden rounded-none shadow-2xl">
                    <Image
                      src={background_image.filename}
                      alt={background_image.alt || ''}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}