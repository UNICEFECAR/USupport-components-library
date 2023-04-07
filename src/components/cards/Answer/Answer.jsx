import React from "react";
import PropTypes from "prop-types";

import { Box } from "../../boxes";
import { Label } from "../../labels";
import { Line } from "../../separators";
import { Button } from "../../buttons";
import { Avatar } from "../../avatars";
import { Icon, Like } from "../../icons";

const AMAZON_S3_BUCKET = `${import.meta.env.VITE_AMAZON_S3_BUCKET}`;

import "./answer.scss";

/**
 * Answer
 *
 * Answer Q&A card
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
}) => {
  const labels = ["bullying", "school billing", "sad"];

  const providerInfo = question.providerData;

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
              <p className="text">{question.question}</p>
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
            <p className="text answer__date-container__text">Today</p>
          </div>
          <p className="text answer__question-heading">{question.question}</p>
          <Button
            type="link"
            label="Read more"
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
            label="Read more"
            size="md"
            classes="answer__read-more-button"
            onClick={() => handleReadMore(question)}
          />
          <div className="answer__bottom-container">
            <div className="answer__answered-by-container">
              <p className="text">Answered by:</p>
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
              <p className="text">Schedule a consultation</p>
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
              <Button label="Respond" />
              <Button
                label="Archive"
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
