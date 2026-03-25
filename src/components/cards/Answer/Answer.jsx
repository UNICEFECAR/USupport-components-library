import React, { useContext } from "react";
import PropTypes from "prop-types";

import { Box } from "../../boxes";
import { Label } from "../../labels";
import { Line } from "../../separators";
import { Button, NewButton } from "../../buttons";
import { Avatar } from "../../avatars";
import { Icon, Like } from "../../icons";
import { ThemeContext, isDateToday } from "../../../utils";

const AMAZON_S3_BUCKET = `${import.meta.env.VITE_AMAZON_S3_BUCKET}`;

import "./answer.scss";

/**
 * Answer
 *
 * Answer MyQA card
 *
 * @return {jsx}
 */
export const Answer = ({
  question,
  renderIn = "client",
  handleLike = () => {},
  handleReadMore = () => {},
  handleScheduleConsultationClick = () => {},
  handleRespond = () => {},
  handleArchive = () => {},
  handleProviderClick = () => {},
  classes,
  t,
}) => {
  const { theme } = useContext(ThemeContext);

  const providerInfo = question.providerData;

  const getDateText = (dateString) => {
    const date = new Date(dateString);

    if (isDateToday(date)) {
      return t("today");
    } else {
      const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
      const month =
        date.getMonth() + 1 > 9
          ? date.getMonth() + 1
          : `0${date.getMonth() + 1}`;
      const year = date.getFullYear();

      return `${day}.${month}.${year}`;
    }
  };

  const renderHeadingAndLabels = () => {
    return (
      <div className="answer__heading-and-labels-container">
        {renderIn === "client" || renderIn === "website" ? (
          <>
            <h4 className="answer__limited-text">{question.answerTitle}</h4>
            <div className="answer__labels-container">
              {question.tags &&
                question.tags.map((label, index) => {
                  return (
                    <Label text={label} classes="answer__label" key={index} />
                  );
                })}
            </div>
          </>
        ) : null}
      </div>
    );
  };

  const providerIdForRedirection =
    providerInfo?.providerId || providerInfo?.provider_detail_id;

  const canRedirectToProvider = !!providerIdForRedirection;

  const handleCardClick = () => {
    handleReadMore(question);
  };

  const stopPropagation = (event) => {
    event.stopPropagation();
  };

  return (
    <Box liquidGlass classes={["answer", classes]} onClick={handleCardClick}>
      {question.answerTitle ? (
        <>
          {renderIn === "client" || renderIn === "website" ? (
            <>
              {/* Question creation date */}
              <div className="answer__date-container">
                <Icon name="calendar" color="#92989B" />
                <p className="text answer__date-container__text">
                  {getDateText(question.questionCreatedAt)}
                </p>
              </div>
              {/* Tags at top */}
              {question.tags && question.tags.length > 0 && (
                <div className="answer__labels-container">
                  {question.tags.map((label, index) => {
                    return (
                      <Label text={label} classes="answer__label" key={index} />
                    );
                  })}
                </div>
              )}
              <h4 className="answer__title">{question.answerTitle}</h4>
              <p className="text answer__limited-text">{question.answerText}</p>
              <div className="answer__read-more-container">
                <NewButton
                  label={t("read_more")}
                  onClick={(event) => {
                    stopPropagation(event);
                    handleReadMore(question);
                  }}
                />
              </div>
              <div className="answer__author-likes-row">
                <div
                  className={`answer__answered-by-container answer__answered-by-container--client ${
                    canRedirectToProvider
                      ? "answer__answered-by-container--client--clickable"
                      : ""
                  }`}
                >
                  <p className="text">{t("answer_by")}</p>
                  <Avatar
                    image={AMAZON_S3_BUCKET + "/" + providerInfo.image}
                    alt="Specialist avatar"
                    size="xs"
                    onClick={
                      canRedirectToProvider
                        ? (event) => {
                            stopPropagation(event);
                            handleProviderClick(providerIdForRedirection);
                          }
                        : undefined
                    }
                    classes="answer__answered-by-container__avatar"
                  />
                  <p
                    className={`text answer__bottom-container__provider-name ${
                      canRedirectToProvider
                        ? "answer__bottom-container__provider-name--clickable"
                        : ""
                    }`}
                    onClick={
                      canRedirectToProvider
                        ? (event) => {
                            stopPropagation(event);
                            handleProviderClick(providerIdForRedirection);
                          }
                        : undefined
                    }
                  >
                    {providerInfo.name} {providerInfo.surname}
                  </p>
                  <p className="text answer__bottom-container__answer-date">
                    {t("date_answered", {
                      date: getDateText(question.answerCreatedAt),
                    })}
                  </p>
                </div>
              </div>
              {/* Schedule consultation link at bottom */}
              <div
                className="answer__schedule-button"
                onClick={(event) => {
                  stopPropagation(event);
                  handleScheduleConsultationClick(question);
                }}
              >
                <Icon
                  name="calendar"
                  color={theme === "highContrast" ? "#8A4BF3" : "#8A4BF3"}
                />
                <p
                  className={`text answer__schedule-button__text ${
                    theme === "highContrast"
                      ? "answer__schedule-button__text--hc"
                      : ""
                  }`}
                >
                  {t("schedule_consultation")}
                </p>
                <div
                  className="answer__likes"
                  onClick={(event) => {
                    stopPropagation(event);
                  }}
                >
                  <Like
                    handleClick={handleLike}
                    likes={question.likes}
                    dislikes={question.dislikes}
                    answerId={question.answerId}
                    isLiked={question.isLiked}
                    isDisliked={question.isDisliked}
                    renderInClient={renderIn === "client"}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="answer__heading-container">
                <div>
                  <div className="answer__date-container">
                    <Icon name="calendar" color="#92989B" />
                    <p className="text answer__date-container__text">
                      {getDateText(question.questionCreatedAt)}
                    </p>
                  </div>
                  <p className="text answer__heading-container__question-text answer__limited-text">
                    {question.question}
                  </p>
                </div>
                <div onClick={stopPropagation}>
                  <Like
                    handleClick={handleLike}
                    likes={question.likes}
                    dislikes={question.dislikes}
                    answerId={question.answerId}
                    isLiked={question.isLiked}
                    isDisliked={question.isDisliked}
                    renderInClient={renderIn === "client"}
                  />
                </div>
              </div>
              <Line classes="answer__line" />
              {renderHeadingAndLabels()}
              {renderIn === "provider" ||
              (renderIn === "country-admin" && question.answerText) ? (
                <>
                  <h4 className="answer__provider-heading-text answer__limited-text">
                    {question.answerTitle}
                  </h4>
                  <div className="answer__labels-container answer__margin-bottom-1-2">
                    {question.tags &&
                      question.tags.map((label, index) => {
                        return (
                          <Label
                            text={label}
                            classes="answer__label"
                            key={index}
                          />
                        );
                      })}
                  </div>
                </>
              ) : null}
              <p className="text answer__limited-text">{question.answerText}</p>
              <div className="answer__read-more-container">
                <NewButton
                  type="text"
                  label={t("read_more")}
                  onClick={(event) => {
                    stopPropagation(event);
                    handleReadMore(question);
                  }}
                  // size="md"
                  // classes="answer__read-more-button"
                />
              </div>
              {(renderIn === "provider" || renderIn === "country-admin") && (
                <div className="answer__answered-by-container">
                  <p className="text">{t("answer_by")}</p>
                  <Avatar
                    image={AMAZON_S3_BUCKET + "/" + providerInfo.image}
                    alt="Specialist avatar"
                    size="xs"
                    classes="answer__answered-by-container__avatar"
                  />
                  <p className="text">
                    {providerInfo.name} {providerInfo.surname}
                  </p>
                  <p className="text answer__bottom-container__answer-date">
                    {t("date_answered", {
                      date: getDateText(question.answerCreatedAt),
                    })}
                  </p>
                </div>
              )}
              {renderIn === "provider" && (
                <Button
                  label={t("respond")}
                  size="md"
                  classes="answer__respond-button"
                  onClick={(event) => {
                    stopPropagation(event);
                    handleRespond(question);
                  }}
                />
              )}
            </>
          )}
        </>
      ) : (
        <>
          <div className="answer__date-container">
            <Icon name="calendar" color="#92989B" />
            <p className="text answer__date-container__text">
              {getDateText(question.questionCreatedAt)}
            </p>
          </div>
          <p className="text answer__question-heading answer__limited-text">
            {question.question}
          </p>
          <Button
            type="link"
            label={t("read_more")}
            size="md"
            classes="answer__read-more-button"
            onClick={(event) => {
              stopPropagation(event);
              handleReadMore(question);
            }}
          />
          {renderIn === "provider" && (
            <div className="answer__bottom-container">
              <Button
                label={t("respond")}
                onClick={(event) => {
                  stopPropagation(event);
                  handleRespond(question);
                }}
              />
              <Button
                label={t("archive")}
                onClick={(event) => {
                  stopPropagation(event);
                  handleArchive(question);
                }}
                type="secondary"
                size="md"
                color="red"
                classes="answer__bottom-container__archive-button"
              />
            </div>
          )}
        </>
      )}
    </Box>
  );
};

Answer.propTypes = {
  /**
   * question object
   * @required
   */
  question: PropTypes.object.isRequired,

  /**
   * renderIn string
   * @default "client"
   */
  renderIn: PropTypes.string,

  /**
   * handleLike function
   * @default () => {}
   */
  handleLike: PropTypes.func,

  /**
   * handleReadMore function
   * @default () => {}
   */
  handleReadMore: PropTypes.func,

  /**
   * handleScheduleConsultationClick function
   * @default () => {}
   */
  handleScheduleConsultationClick: PropTypes.func,

  /**
   * handleRespond function
   * @default () => {}
   */
  handleRespond: PropTypes.func,

  /**
   * handleArchive function
   * @default () => {}
   */
  handleArchive: PropTypes.func,

  /**
   * handleProviderClick function
   * @default () => {}
   */
  handleProviderClick: PropTypes.func,

  /**
   * classes string
   * */
  classes: PropTypes.string,

  /**
   * t translation function
   * @required
   * */
  t: PropTypes.func.isRequired,
};
