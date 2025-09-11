import React from "react";

function OptimizedImage({
  src,
  alt = "",
  widths = [320, 480, 640],
  height = 250,
  className = "",
  sizes="(max-width: 640px) 250px, (max-width: 1024px) 250px, 320px",
}) {
  if (!src || !src.includes("cloudinary.com")) {
    return <img src={src} alt={alt} className={className} loading="lazy" />;
  }

  const buildSrcSet = (format) =>
    widths
      .map(
        (w) =>
          `${src.replace(
            /upload\//,
            `upload/f_${format},q_auto,w_${w},h_${height},c_fill/`
          )} ${w}w`
      )
      .join(", ");

  return (
    <picture>
      <source type="image/avif" srcSet={buildSrcSet("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={buildSrcSet("webp")} sizes={sizes} />
      <img
        src={src.replace(
          /upload\//,
          `upload/f_jpg,q_auto,w_${widths[0]},h_${height},c_fill/`
        )}
        srcSet={buildSrcSet("jpg")}
        sizes={sizes}
        alt={alt}
        loading="lazy"
        className={className}
      />
    </picture>
  );
}

export default OptimizedImage;
