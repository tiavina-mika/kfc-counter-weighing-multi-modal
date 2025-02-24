import { ChangeEvent, useState } from "react"
import {
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    FormHelperText,
    Stack,
    IconButton,
    Alert,
    DialogTitle,
    styled,
    TextField,
    Typography,
} from "@mui/material"
import CloseIcon from '@mui/icons-material/Close'
import { COLORS } from "../utils/constants"

const activeColor = COLORS.active
const primaryColor = COLORS.primary
const grayColor = COLORS.gray

const StyledWeightInput = styled(TextField, {
    shouldForwardProp: (prop) => prop !== "isPositiveNumber"
  })(({ isPositiveNumber = false }: { isPositiveNumber: boolean }) => {
    const styles: Record<string, any> = {
      flex: 1,
      padding: 0,
      '& .MuiOutlinedInput-notchedOutline': {
        textAlign: 'center',
        border: 'none'
      },
      '& .MuiInputBase-input': {
        fontSize: '40px',
        fontStyle: 'normal',
        fontWeight: 500,
        lineHeight: '120%',
        padding: 0,
        minWidth: 48,
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        // remove arrows for chrome, safari, edge
        '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
          '-webkit-appearance': 'none',
          margin: 0
        },
        // remove arrows for firefox
        '&[type=number]': {
          '-moz-appearance': 'textfield'
        }
      }
    }
  
    if (isPositiveNumber) {
      styles['& .MuiInputBase-input'] = {
        ...styles['& .MuiInputBase-input'],
        color: activeColor
      }
    }
  
    return styles
  })
  

const sx = {
    dialog: {
        '& .MuiDialog-paper': {
            width: 700,
            padding: '32px 24px',
            gap: '40px'
        },
    },
    column: {
        gap: "16px",
    },
    label: {
        color: primaryColor,
        fontSize: 28,
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: 1.4,
        textAlign: 'center',
    },
    value: {
        color: primaryColor,
        fontSize: 40,
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: 1.2,
    },
    subtitle: {
        color: grayColor,
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: 1,
    }
}

type Props = {
    onClose: () => void
    open: boolean
    onSubmit: (values: Record<string, any>) => void
    packagingExecution: Record<string, any> | null
}
const PreparedPackagingDialogForm = ({
    onClose,
    open,
    onSubmit,
    packagingExecution
}: Props) => {
    const [value, setValue] = useState<number>(0)
    const [error, setError] = useState<string>("")
    const [touched, setTouched] = useState<boolean>(false)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTouched(true)
        setValue(+event.target.value)
    }
    const handleConfirm = () => {
        if (touched && value <= 0) {
            setError("Veuillez saisir un nombre valide")
            return
        }
        onSubmit({ weight: value })
        onClose()
    }

    const handleCancel = () => {
        setValue(0)
        setTouched(false)
        setError("")
        onClose()
    }

    return (
        <Dialog open={open} onClose={onClose} sx={sx.dialog}>
            <DialogTitle>
                {packagingExecution?.recipeName}
            </DialogTitle>
            <DialogContent sx={{ p: 0, overflow: 'hidden' }}>
                <Alert severity="info">
                    Choisissez la recette pour laquelle vous souhaitez faire une contre-pesée.
                </Alert>
                <DialogContentText>
                    Veuillez compter  le nombre total de barquettes déjà réalisées.
                </DialogContentText>
                <IconButton
                    aria-label="close"
                    onClick={handleCancel}
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                >
                    <CloseIcon />
                </IconButton>
                <Stack direction="row">
                    <Stack sx={sx.column} alignItems="center">
                        <Typography sx={sx.label}>
                            Nombre de barquettes
                            global
                        </Typography>
                        <Typography sx={sx.value}>
                            3000
                        </Typography>
                        <Typography sx={sx.subtitle}>
                            barquettes
                        </Typography>
                    </Stack>
                    <Stack sx={sx.column} alignItems="center">
                        <Typography sx={sx.label}>
                            Nombre de barquettes
                            réalisées
                        </Typography>
                        <StyledWeightInput
                            type="number"
                            value={value}
                            onChange={handleChange}
                            isPositiveNumber={value > 0}
                        />
                        <Typography sx={sx.subtitle}>
                            barquettes
                        </Typography>
                    </Stack>
                </Stack>
                <FormHelperText error={!!error}>
                    {error}
                </FormHelperText>
            </DialogContent>
            <DialogActions  sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button onClick={handleCancel} color="primary">
                    Retour
                </Button>
                <Button onClick={handleConfirm} color="primary" variant="contained">
                    Valider
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default PreparedPackagingDialogForm
