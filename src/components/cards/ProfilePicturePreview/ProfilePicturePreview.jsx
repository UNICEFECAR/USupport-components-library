import React from "react";
import PropTypes from "prop-types";
const AMAZON_S3_BUCKET = `${import.meta.env.VITE_AMAZON_S3_BUCKET}`;

import { Icon } from "../../icons/Icon";
import { NewButton } from "../../buttons";

import "./profile-picture-preview.scss";

/**
 * ProfilePicturePreview
 *
 * Profile picture preview
 *
 * @return {jsx}
 */
export const ProfilePicturePreview = ({
  image,
  handleDeleteClick,
  handleChangeClick,
  changePhotoText,
  imageFile,
}) => {
  const imageSrc = imageFile ? imageFile : AMAZON_S3_BUCKET + "/" + image;
  return (
    <div className="profile-picture-preview-wrapper">
      <div className="profile-picture-preview">
        <div className="profile-picture-preview__image-container">
          <div className="profile-picture-preview__image-container__delete-button">
            <Icon
              onClick={handleDeleteClick}
              name="delete"
              size="sm"
              color="#fff"
            />
          </div>
          <img src={imageSrc} alt="profile-picture" />
        </div>
        <NewButton
          type="text"
          onClick={handleChangeClick}
          label={changePhotoText}
        />
      </div>
    </div>
  );
};

ProfilePicturePreview.propTypes = {
  /**
   * Image url
   **/
  image: PropTypes.string,

  /**
   * handleDeleteClick
   * */
  handleDeleteClick: PropTypes.func,

  /**
   * handleChangeClick
   * */
  handleChangeClick: PropTypes.func,

  /**
   * changePhotoText
   * */
  changePhotoText: PropTypes.string,

  /**
   * imageFile
   * */
  imageFile: PropTypes.string,
};

ProfilePicturePreview.defaultProps = {
  // Add defaultProps here
};
