import { Check } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";

const SuccessMessage = ({
  label,
  onClose,
}: {
  label: string;
  onClose: () => void;
}) => {
  return (
    <Box className="flex flex-col items-end gap-4 h-full">
      <Box className="flex flex-col items-center justify-center w-full gap-2 h-full">
        <Check fontSize="large" />
        <Typography variant="h5">{label}</Typography>
      </Box>
      <Button onClick={onClose} variant="text" color="success">
        Finalizar
      </Button>
    </Box>
  );
};

export default SuccessMessage;
