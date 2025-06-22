import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Button, alpha } from "@mui/material";
import { NavLink } from "react-router-dom";
import type { ReactNode } from "react";

interface NavLinkButtonProps {
  to: string;
  children: ReactNode;
}

export const NavLinkButton = ({ to, children }: NavLinkButtonProps) => (
  <Button
    component={NavLink}
    to={to}
    sx={(theme) => ({
      color: theme.palette.text.secondary,
      fontWeight: 500,
      padding: '8px 16px',
      borderRadius: '8px',
      '&.active': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        '&:hover': {
          backgroundColor: theme.palette.primary.dark,
        },
      },
      '&:not(.active):hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.08),
      },
    })}
  >
    {children}
  </Button>
); 


export const NavLinks = () => {
  const { t } = useTranslation();
  return (
    <Box sx={{ ml: 6, display: { xs: 'none', md: 'flex' }, gap: 2 }}>
      <NavLinkButton to="/places">{t('header.nav.places')}</NavLinkButton>
      <NavLinkButton to="/map">{t('header.nav.map')}</NavLinkButton>
    </Box>
  );
}; 