import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuthContext } from "../../context/AuthContext";
import { UserActions } from "./UserActions";

export const AuthSection = () => {
  const { isAuthenticated } = useAuthContext();
  const { t } = useTranslation();

  return isAuthenticated ? (
    <UserActions />
  ) : (
    <Button color="inherit" component={NavLink} to="/auth/login">
      {t('auth.login_page_title')}
    </Button>
  );
}; 