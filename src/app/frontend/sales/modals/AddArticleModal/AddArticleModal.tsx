import AddArticleForm from "../../forms/AddArticleForm/AddArticleForm";
import { useCallback, useEffect, useState } from "react";
import { Box, Modal } from "@mui/material";
import SuccessMessage from "@/app/frontend/shared/components/SuccessMessage/SuccessMessage";
import { SaleArticle } from "../../forms/AddArticleForm/useAddArticleForm";

type AddArticleModalProps = {
  isOpen: boolean;
  onClose: () => void;
  handleSuccess: (article: SaleArticle) => void;
};

const AddArticleModal = ({
  isOpen,
  onClose,
  ...props
}: AddArticleModalProps) => {
  const [formSuccess, setFormSuccess] = useState<{ article: SaleArticle }>();

  useEffect(() => {
    setFormSuccess(undefined);
  }, [isOpen]);

  const onSuccess = useCallback(
    (article: SaleArticle) => {
      props.handleSuccess(article);
      onClose();
      // setFormSuccess({ article });
    },
    [onClose, props]
  );

  const successMessage = useCallback(
    () => <SuccessMessage onClose={onClose} label="Artículo agregado!" />,
    [onClose]
  );

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      className="flex items-center justify-center"
    >
      <Box className="bg-white p-4 rounded-2xl min-w-[300px]">
        {formSuccess?.article ? (
          successMessage()
        ) : (
          <AddArticleForm onClose={onClose} handleSuccess={onSuccess} />
        )}
      </Box>
    </Modal>
  );
};

export default AddArticleModal;
