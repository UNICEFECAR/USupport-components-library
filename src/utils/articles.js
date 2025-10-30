/**
 *
 * @param {*} object with article data
 * @returns object with desctructured data for the article
 */
function destructureArticleData(article) {
  const articleId = article.id;
  const articleData = article.attributes;
  const body = articleData.body;
  const articleLabels = computeArticleLabels(articleData.labels?.data);
  const articleReadingTime = articleData.reading_time;

  const imageData = article.attributes.image?.data?.attributes;
  const articleThumbnailImage = imageData?.formats?.thumbnail?.url;
  const articleImageMedium = imageData?.formats?.medium?.url;
  const articleImageSmall = imageData?.formats?.small?.url;

  const categoryId = articleData.category?.data?.id;
  const categoryName = articleData.category?.data?.attributes?.name;
  const description = articleData.description;
  const ageGroupId = articleData.age_groups?.data[0]?.id;
  const pdf = articleData.pdf;
  const pdfUrl = pdf?.data?.attributes?.url;

  const author = articleData.author;

  return {
    id: articleId,
    title: articleData.title,
    imageThumbnail: articleThumbnailImage,
    imageMedium: articleImageMedium,
    imageSmall: articleImageSmall,
    readingTime: articleReadingTime,
    body: body,
    labels: articleLabels,
    creator: author,
    categoryId: categoryId,
    categoryName: categoryName,
    description,
    ageGroupId,
    likes: Number(articleData.likes) || 0,
    dislikes: Number(articleData.dislikes) || 0,
    pdfUrl,
  };
}

/**
 * Destructures video data from the CMS format into a simpler object
 * @param {Object} videoData - The raw video data from the CMS
 * @returns {Object} - The destructured video data
 */
const destructureVideoData = (videoData) => {
  // Handle case when video data is missing
  if (!videoData || !videoData.attributes) {
    return {};
  }
  const { id } = videoData;
  const {
    title,
    description,
    url,
    createdAt,
    updatedAt,
    publishedAt,
    thumbnail,
    category,
    labels: labelsData,
    vimeoThumbnailUrl,
    likes,
    dislikes,
    aws_url,
  } = videoData.attributes;

  // Get thumbnail URLs with fallbacks
  const thumbnailData = thumbnail?.data?.attributes;
  const imageLarge = thumbnailData?.url || "";
  const imageMedium = thumbnailData?.formats?.small?.url || imageLarge;
  const imageSmall = thumbnailData?.formats?.thumbnail?.url || imageMedium;

  // Get category data if available
  const categoryData = category?.data?.attributes;
  const categoryName = categoryData?.name || "";
  const categoryId = category?.data?.id || null;

  const labels = computeArticleLabels(labelsData?.data || []);

  // Parse video URL to extract video ID for embedding
  let videoId = "";
  let image = "";
  try {
    if (url && url.includes("youtube.com")) {
      // Extract YouTube video ID
      const urlParams = new URL(url).searchParams;
      videoId = urlParams.get("v") || "";
      image = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    } else if (url && url.includes("youtu.be")) {
      // Handle youtu.be short links
      videoId = url.split("/").pop().split("?")[0];
      image = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    } else if (url && url.includes("vimeo.com")) {
      videoId = url.split("/").pop().split("?")[0];
      image = vimeoThumbnailUrl;
    }

    if (!image) {
      image = imageLarge || imageMedium || imageSmall;
    }
  } catch (error) {
    console.error("Error parsing video URL:", error);
  }

  return {
    id,
    title,
    description,
    originalUrl: url,
    videoId,
    createdAt,
    updatedAt,
    publishedAt,
    imageLarge,
    imageMedium,
    imageSmall,
    categoryName,
    categoryId,
    labels,
    vimeoThumbnailUrl,
    image,
    likes: Number(likes),
    dislikes: Number(dislikes),
    creator: null,
    awsUrl: aws_url,
  };
};

function computeArticleLabels(labels) {
  return labels?.map((label) => {
    return { name: label.attributes.Name, id: label.id };
  });
}

const destructurePodcastData = async (data) => {
  const parts = data.attributes.url.split("/");
  const type = parts[parts.length - 2];
  const id = parts[parts.length - 1].split("?")[0];
  const spotifyId = `${type}/${id}`;

  const thumbnail = data.attributes.thumbnail;
  // Get thumbnail URLs with fallbacks
  const thumbnailData = thumbnail?.data?.attributes;
  let imageLarge = thumbnailData?.url || "";
  let imageMedium = thumbnailData?.formats?.small?.url || imageLarge;
  let imageSmall = thumbnailData?.formats?.thumbnail?.url || imageMedium;

  // If CMS thumbnails are missing, try to fetch from Spotify
  if (!imageLarge && spotifyId) {
    const spotifyThumbnail = await getSpotifyThumbnail(spotifyId);
    if (spotifyThumbnail) {
      imageLarge = spotifyThumbnail;
      imageMedium = spotifyThumbnail;
      imageSmall = spotifyThumbnail;
    }
  }

  const categoryData = data.attributes.category?.data?.attributes;
  const categoryName = categoryData?.name || "";
  const categoryId = data.attributes.category?.data?.id || null;

  const labelsData = data.attributes.labels?.data || [];
  const labels = computeArticleLabels(labelsData || []);

  return {
    id: data.id,
    title: data.attributes.title,
    description: data.attributes.description,
    url: data.attributes.url,
    imageLarge,
    imageMedium,
    imageSmall,
    categoryName,
    categoryId,
    labels,
    view_count: Number(data.attributes.view_count) || 0,
    likes: Number(data.attributes.likes) || 0,
    dislikes: Number(data.attributes.dislikes) || 0,
    spotifyId,
  };
};

const createArticleSlug = (title) => {
  return (
    title
      .toLowerCase()
      // Normalize Unicode characters (NFD = decomposed form)
      .normalize("NFD")
      // Remove diacritics/accents but keep the base characters
      .replace(/[\u0300-\u036f]/g, "")
      // Replace whitespace and non-word characters with hyphens
      // \p{L} matches any Unicode letter, \p{N} matches any Unicode number
      .replace(/[^\p{L}\p{N}]+/gu, "-")
      // Remove leading and trailing hyphens
      .replace(/^-+|-+$/g, "")
  );
};

/**
 * Fetches thumbnail URL for a Spotify podcast episode using Spotify's oEmbed API
 * @param {string} spotifyId - Spotify ID in format "episode/{id}" or "show/{id}"
 * @returns {Promise<string|null>} - Thumbnail URL or null if fetch fails
 */
const getSpotifyThumbnail = async (spotifyId) => {
  if (!spotifyId) return null;

  try {
    const spotifyUrl = `https://open.spotify.com/${spotifyId}`;
    const oEmbedUrl = `https://open.spotify.com/oembed?url=${encodeURIComponent(
      spotifyUrl
    )}&format=json`;

    const response = await fetch(oEmbedUrl);
    if (!response.ok) {
      console.warn(`Spotify oEmbed API returned ${response.status}`);
      return null;
    }

    const data = await response.json();
    return data.thumbnail_url || null;
  } catch (error) {
    console.error("Error fetching Spotify thumbnail:", error);
    return null;
  }
};

export {
  destructureArticleData,
  destructureVideoData,
  destructurePodcastData,
  createArticleSlug,
  getSpotifyThumbnail,
};
