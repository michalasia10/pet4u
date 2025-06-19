import { useState } from "react";
import type { MouseEvent } from "react";
import { Person, Logout } from "@mui/icons-material";
import {
  IconButton,
  Menu,
  MenuItem,
  alpha,
} from "@mui/material";
import { useTranslation } from "react-i18next";

interface ProfileMenuProps {
  onLogout: () => void;
}

export const ProfileMenu = ({ onLogout }: ProfileMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { t } = useTranslation();

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    onLogout();
    handleMenuClose();
  };

  return (
    <>
      <IconButton
        onClick={handleMenuOpen}
        sx={(theme) => ({
          width: 40,
          height: 40,
          bgcolor: alpha(theme.palette.primary.main, 0.1),
          color: 'primary.main',
          '&:hover': {
            bgcolor: alpha(theme.palette.primary.main, 0.2),
          },
        })}
      >
        <Person />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        slotProps={{
          paper: {
            elevation: 1,
            sx: {
              mt: 1.5,
              minWidth: 180,
              borderRadius: 2,
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleMenuClose} sx={{ py: 1.5 }}>
          <Person fontSize="small" sx={{ mr: 2 }} /> {t('header.profileMenu.profile')}
        </MenuItem>
        <MenuItem onClick={handleLogoutClick} sx={{ py: 1.5 }}>
          <Logout fontSize="small" sx={{ mr: 2 }} /> {t('header.profileMenu.logout')}
        </MenuItem>
      </Menu>
    </>
  );
}; 