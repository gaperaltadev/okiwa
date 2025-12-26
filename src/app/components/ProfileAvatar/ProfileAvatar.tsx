import { auth } from "@/lib/firebase/client";
import { Logout, Person } from "@mui/icons-material";
import {
  Chip,
  ListItemButton,
  ListItemIcon,
  Menu,
  MenuList,
} from "@mui/material";
import { useCallback, useState } from "react";

const ProfileAvatar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleSignOut = useCallback(async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }, []);

  return (
    <>
      <Chip
        label={`Hola, ${auth.currentUser?.displayName}`}
        aria-controls={open ? "account-menu" : undefined}
        onClick={(e) => setAnchorEl(e.currentTarget)}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        icon={<Person />}
      />
      <Menu
        open={open}
        id="account-menu"
        className="right-0 top-0"
        onClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
      >
        <MenuList className="flex">
          <ListItemButton onClick={handleSignOut}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            <span className="text-xs">Cerrar sesión</span>
          </ListItemButton>
        </MenuList>
      </Menu>
    </>
  );
};

export default ProfileAvatar;
