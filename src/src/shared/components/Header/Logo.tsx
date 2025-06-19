import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

export const Logo = () => {
  const { t } = useTranslation();
  return (
  <Typography
    variant="h5"
    color="primary"
    component={NavLink}
    to="/"
    sx={{ 
      fontWeight: 'bold', 
      flexGrow: 0, 
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: 1,
    }}
  >
    <img src='/pet4u.png' alt={t('app_title')} style={{ width: '40px', height: '40px' }} />
    {t('app_title')}
    </Typography>
  );
}; 