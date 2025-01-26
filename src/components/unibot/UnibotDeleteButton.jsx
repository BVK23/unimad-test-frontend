import { useState } from "react";
import { DeleteIcon } from "../icons";
import UnibotModal from "../unibot-modal";
import { useDeleteMessage } from "./useDeleteMessage";

// Assuming you're using headless UI Dialog component

const UnibotDeleteButton = ({ sectionName, messageId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const deleteMessage = useDeleteMessage(sectionName);

  // Handle delete with confirmation modal
  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteMessage.mutate(messageId);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <DeleteIcon
        className="cursor-pointer text-primary-light-gray hover:text-red-500"
        onClick={handleDeleteClick} // Trigger modal on click
      />

      <UnibotModal
        isOpen={isModalOpen}
        heading="Delete Message"
        paragraph="Are you sure you want to delete this message?"
        redButtonText="Yes, Delete"
        onRedButtonClick={handleConfirmDelete}
        greyButtonText="No, Keep it"
        onGreyButtonClick={handleCancel}
        handleClose={handleCancel}
      />
    </>
  );
};

export default UnibotDeleteButton;
