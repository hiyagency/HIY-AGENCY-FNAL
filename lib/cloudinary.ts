const CLOUDINARY_VIDEO_MARKER = "/video/upload/";

function encodePublicId(publicId: string) {
  return publicId
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/");
}

function insertVideoTransform(url: string, transform: string) {
  const markerIndex = url.indexOf(CLOUDINARY_VIDEO_MARKER);
  if (markerIndex === -1) return url;

  const start = markerIndex + CLOUDINARY_VIDEO_MARKER.length;
  const rest = url.slice(start);
  const withoutVersion = rest.replace(/^v\d+\//, "");
  const base = url.slice(0, start);

  return `${base}${transform}/${withoutVersion}`;
}

export function getCloudinaryVideoUrl({
  publicId,
  secureUrl,
  width = 1280,
}: {
  publicId?: string | null;
  secureUrl?: string | null;
  width?: number;
}) {
  const transform = `f_auto,q_auto:good,c_limit,w_${width}`;
  const cleanedUrl = secureUrl?.trim();

  if (cleanedUrl?.includes(CLOUDINARY_VIDEO_MARKER)) {
    return insertVideoTransform(cleanedUrl, transform);
  }

  if (cleanedUrl) {
    return cleanedUrl;
  }

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME?.trim();
  const cleanedPublicId = publicId?.trim();

  if (!cloudName || !cleanedPublicId) {
    return "";
  }

  return `https://res.cloudinary.com/${cloudName}/video/upload/${transform}/${encodePublicId(
    cleanedPublicId,
  )}`;
}

export function getCloudinaryPosterUrl({
  publicId,
  secureUrl,
  posterUrl,
  width = 1280,
}: {
  publicId?: string | null;
  secureUrl?: string | null;
  posterUrl?: string | null;
  width?: number;
}) {
  const cleanedPoster = posterUrl?.trim();
  if (cleanedPoster) return cleanedPoster;

  const transform = `f_jpg,q_auto:good,c_limit,w_${width},so_0`;
  const cleanedUrl = secureUrl?.trim();

  if (cleanedUrl?.includes(CLOUDINARY_VIDEO_MARKER)) {
    return insertVideoTransform(cleanedUrl, transform).replace(/\.[a-z0-9]+(\?.*)?$/i, ".jpg");
  }

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME?.trim();
  const cleanedPublicId = publicId?.trim();

  if (!cloudName || !cleanedPublicId) {
    return "";
  }

  return `https://res.cloudinary.com/${cloudName}/video/upload/${transform}/${encodePublicId(
    cleanedPublicId,
  )}.jpg`;
}
