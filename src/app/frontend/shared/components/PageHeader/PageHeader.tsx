import { Box, Button } from "@mui/material";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: () => void;
  actionTitle?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
  const { title, subtitle, action, actionTitle, startIcon, endIcon } = props;
  return (
    <Box className="flex justify-between">
      <Box className="grid">
        <p className="text-2xl font-extrabold">{title}</p>
        <p className="text-gray-500">{subtitle}</p>
      </Box>
      <Box className="flex items-center">
        {action && (
          <Button
            startIcon={startIcon}
            endIcon={endIcon}
            size="small"
            color="inherit"
            onClick={action}
          >
            <p>{actionTitle}</p>
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default PageHeader;
