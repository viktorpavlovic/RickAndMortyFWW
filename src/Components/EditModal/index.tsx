import React, { useState } from "react";
import "./edit-modal.scss";
import { Button, Form, Input } from "antd";

type FieldType = {
  name?: string;
  species?: string;
};
interface EditModalProps {
  handleClose: () => void;
  clickedChar: FieldType | null;
  updateFavorites: (updatedChar: FieldType) => void;
}

const EditModal: React.FC<EditModalProps> = ({
  handleClose,
  clickedChar,
  updateFavorites,
}) => {
  const [editedCharacter, setEditedCharacter] = useState<FieldType | null>(
    clickedChar
  );

  const handleOverlayClick = (event: { target: any; currentTarget: any }) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };
  const handleInputChange = (field: keyof FieldType, value: string) => {
    setEditedCharacter((prevCharacter) => ({
      ...prevCharacter,
      [field]: value,
    }));
  };
  const handleFormSubmit = () => {
    if (editedCharacter) {
      updateFavorites(editedCharacter);
      handleClose();
    }
  };

  return (
    <div className="edit-modal" onClick={handleOverlayClick}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ ...clickedChar }}
        autoComplete="off"
      >
        <span className="close-modal" onClick={handleClose}>
          X
        </span>
        <Form.Item<FieldType>
          label="Name"
          name="name"
          rules={[{ required: true, message: "Edit character name" }]}
        >
          <Input
            value={editedCharacter?.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Species"
          name="species"
          rules={[{ required: true, message: "Edit character specie" }]}
        >
          <Input
            value={editedCharacter?.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" onClick={handleFormSubmit}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditModal;
