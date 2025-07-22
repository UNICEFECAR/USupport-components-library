import { GridItem, CardMedia } from "@USupport-components-library/src";
import {
  destructureArticleData,
  useWindowDimensions,
} from "@USupport-components-library/utils";

import "./articles-grid.scss";

const getGridSpanForIndex = (index, pattern = [2, 3, 1]) => {
  const totalItemsInCycle = pattern.reduce((sum, count) => sum + count, 0);
  const cyclePosition = index % totalItemsInCycle;

  let currentPosition = 0;
  for (let i = 0; i < pattern.length; i++) {
    const itemsInThisRow = pattern[i];
    const columnsPerItem = 12 / itemsInThisRow;

    if (cyclePosition < currentPosition + itemsInThisRow) {
      return columnsPerItem;
    }
    currentPosition += itemsInThisRow;
  }

  return 4;
};

export const ArticlesGrid = ({
  articles = [],
  onArticleClick,
  t,
  pattern = [2, 3, 1],
  className = "",
}) => {
  const { width } = useWindowDimensions();
  const isNotDescktop = width < 1366;

  const handleArticleClick = (article) => {
    if (onArticleClick) {
      onArticleClick(article.id, article.title);
    }
  };

  if (!articles || articles.length === 0) {
    return (
      <GridItem md={8} lg={12} classes="articles__articles-item">
        <div className="articles-grid">
          <div className="articles-grid__no-results">
            <p>{t("no_results")}</p>
          </div>
        </div>
      </GridItem>
    );
  }

  return (
    <GridItem md={8} lg={12} classes={`articles__articles-item ${className}`}>
      <div className="articles-grid">
        <div className="articles-grid__container">
          {articles.map((article, index) => {
            const articleData = destructureArticleData(article);
            const gridSpan = getGridSpanForIndex(index, pattern);

            return (
              <div
                key={`${articleData.id}-${index}`}
                className="articles-grid__item"
                style={{ gridColumn: `span ${gridSpan}` }}
              >
                <CardMedia
                  type={
                    gridSpan === 12 && !isNotDescktop ? "landscape" : "portrait"
                  }
                  size={gridSpan === 12 && !isNotDescktop ? "lg" : "sm"}
                  title={articleData.title}
                  image={articleData.imageMedium || articleData.imageSmall}
                  description={articleData.description}
                  labels={articleData.labels}
                  creator={articleData.creator}
                  readingTime={articleData.readingTime}
                  categoryName={articleData.categoryName}
                  isLikedByUser={article.isLikedByUser}
                  isDislikedByUser={article.isDislikedByUser}
                  likes={articleData.likes || 0}
                  dislikes={articleData.dislikes || 0}
                  isRead={article.isRead}
                  t={t}
                  onClick={() => handleArticleClick(articleData)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </GridItem>
  );
};
