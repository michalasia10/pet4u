import { Button, useTheme } from "@mui/material"

type ActionButtonProps = {
    icon: React.ReactNode
    label: string
    onClick?: () => void
}


export const ActionButton = ({ icon, label, onClick }: ActionButtonProps) => {
    const theme = useTheme()
    return <Button
        size="large"
        startIcon={icon}
        onClick={onClick}
        sx={    
            {
                flex: 1,
                backgroundColor: theme.palette.secondary.dark,
                color: theme.palette.primary.contrastText,
                '&:hover': { backgroundColor: theme.palette.secondary.main }
            }
        }>
        {label}
    </Button>
}