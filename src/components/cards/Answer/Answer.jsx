import React from "react";
import PropTypes from "prop-types";

import { Box } from "../../boxes";
import { Label } from "../../labels";
import { Line } from "../../separators";
import { Button } from "../../buttons";
import { Avatar } from "../../avatars";
import { Icon, Like } from "../../icons";
import { isDateToday } from "../../../utils/date";

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
  isInYourQuestions = false,
  renderIn = "client",
  handleLike = () => {},
  handleReadMore = () => {},
  handleScheduleConsultationClick = () => {},
  classes,
  t,
}) => {
  const labels = ["bullying", "school billing", "sad"];

  const providerInfo = question.providerData;

  const getDateText = () => {
    const date = new Date(question.questionCreatedAt);

    if (isDateToday(date)) {
      return t("today");
    } else {
      return `${date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`}.${
        date.getMonth() + 1 > 9
          ? date.getMonth() + 1
          : `0${date.getMonth() + 1}`
      }`;
    }
  };

  const renderHeadingAndLabels = () => {
    return (
      <div className="answer__heading-and-labels-container">
        <h4>{question.answerTitle}</h4>
        <div className="answer__labels-container">
          {labels.map((label, index) => {
            return <Label text={label} key={index} />;
          })}
        </div>
      </div>
    );
  };

  return (
    <Box classes={["answer", classes]}>
      {question.answerTitle ? (
        <>
          <div className="answer__heading-container">
            {isInYourQuestions ? (
              <div>
                <div className="answer__date-container">
                  <Icon name="calendar" color="#92989B" />
                  <p className="text answer__date-container__text">
                    {getDateText()}
                  </p>
                </div>
                <p className="text answer__heading-container__question-text">
                  {question.question}
                </p>
              </div>
            ) : (
              renderHeadingAndLabels()
            )}
            <Like
              handleClick={handleLike}
              likes={question.likes}
              dislikes={question.dislikes}
              answerId={question.answerId}
              isLiked={question.isLiked}
              isDisliked={question.isDisliked}
            />
          </div>
        </>
      ) : (
        <>
          <div className="answer__date-container">
            <Icon name="calendar" color="#92989B" />
            <p className="text answer__date-container__text">{getDateText()}</p>
          </div>
          <p className="text answer__question-heading">{question.question}</p>
          <Button
            type="link"
            label={t("read_more")}
            size="md"
            classes="answer__read-more-button"
          />
        </>
      )}
      <Line classes="answer__line" />
      {question.answerTitle ? (
        <>
          {isInYourQuestions && renderHeadingAndLabels()}
          <p className="text">{question.answerText}</p>
          <Button
            type="link"
            label={t("read_more")}
            size="md"
            classes="answer__read-more-button"
            onClick={() => handleReadMore(question)}
          />
          <div className="answer__bottom-container">
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
            </div>
            <div
              className="answer__schedule-button"
              onClick={handleScheduleConsultationClick}
            >
              <Icon name="calendar" color="#20809e" />
              <p className="text">{t("schedule_consultation")}</p>
            </div>
          </div>
          {renderIn === "provider" && (
            <Button
              label="Respond"
              size="md"
              classes="answer__respond-button"
            />
          )}
        </>
      ) : (
        <>
          {renderIn === "provider" && (
            <div className="answer__bottom-container">
              <Button label={t("respond")} />
              <Button
                label={t("archive")}
                type="ghost"
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
  // Add propTypes here
};

Answer.defaultProps = {
  // Add defaultProps here
};
