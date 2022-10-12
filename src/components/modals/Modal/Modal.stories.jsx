import React, { useState } from "react";
import { Modal } from "./Modal";
import { Button } from "../../buttons/Button";

export default {
  title: "Components Library/modals/Modal",
  component: Modal,
  argTypes: {},
};

export const Default = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleClick() {
    console.log("CTA clicked");
  }

  return (
    <div>
      <Button label="Open Modal" onClick={openModal} />
      <Modal
        {...props}
        isOpen={isOpen}
        closeModal={closeModal}
        title="This is some really really long title here."
        text="This is a base modal."
        ctaLabel="Go back to home page."
        ctaHandleClick={handleClick}
      />
    </div>
  );
};
