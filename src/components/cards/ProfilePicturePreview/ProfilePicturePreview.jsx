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
  );
};

ProfilePicturePreview.propTypes = {
  // Add propTypes here
};

ProfilePicturePreview.defaultProps = {
  // Add defaultProps here
};
