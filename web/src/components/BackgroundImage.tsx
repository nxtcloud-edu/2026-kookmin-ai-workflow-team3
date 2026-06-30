type BackgroundImageProps = {
  src?: string
  alt?: string
}

export function BackgroundImage({ src, alt = '' }: BackgroundImageProps) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {src ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover object-center"
        />
      ) : (
        <div className="h-full w-full bg-slate-blue" />
      )}
      <div className="absolute inset-0 bg-linear-to-t from-deep-navy via-deep-navy/80 to-deep-navy/40" />
    </div>
  )
}
