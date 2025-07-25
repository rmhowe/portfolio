const normalizeSrc = (src: string) => {
  return src.startsWith('/') ? src.slice(1) : src;
};

export default function cloudflareLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  if (process.env.NODE_ENV === 'development') {
    return src;
  }
  const params = [`width=${width}`, 'format=auto', `quality=${quality || 70}`];
  const paramsString = params.join(',');
  return `/cdn-cgi/image/${paramsString}/${normalizeSrc(src)}`;
}
