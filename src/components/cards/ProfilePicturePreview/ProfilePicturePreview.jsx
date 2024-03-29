import React from "react";
import PropTypes from "prop-types";
const AMAZON_S3_BUCKET = `${import.meta.env.VITE_AMAZON_S3_BUCKET}`;
import { Icon } from "../../icons/Icon";

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
        <Icon
          onClick={handleDeleteClick}
          name="circle-action-close-purple"
          size="md"
        />
        <img src={imageSrc} alt="profile-picture" />
        <p onClick={handleChangeClick} className="small-text">
          {changePhotoText}
        </p>
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
