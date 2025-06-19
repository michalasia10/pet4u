import { AppBar, Box, Container, Toolbar } from "@mui/material";
import { AuthSection } from "./AuthSection";
import { Logo } from "./Logo";
import { NavLinks } from "./NavLinks";

export const Header = () => {
  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ height: 72 }}>
          <Logo />
          <NavLinks />
          <Box sx={{ flexGrow: 1 }} />
          <AuthSection />
        </Toolbar>
      </Container>
    </AppBar>
  );
}; 