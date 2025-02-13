import { useRef } from "react"
import { Form, Formik } from "formik"
import {
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    Box,
    IconButton,
    DialogTitle,
} from "@mui/material"
import CloseIcon from '@mui/icons-material/Close'
// import * as Yup from "yup"
import SectionsField from "./SectionsField"

// const schema = Yup.object().shape({
//     recipe: Yup.object().required('Veuillez saisir la recette sur laquelle vous souhaitez faire une contre-pesée.')
// });

const sx = {
    dialog: {
        '& .MuiDialog-paper': {
            width: 700,
            padding: '32px 24px',
            gap: '40px'
        },
    },
}

type Props = {
    onClose: () => void
    open: boolean
    onSubmit: (values: Record<string, any>) => void
    recipe: Record<string, any> | null
}
const SectionsSelectionDialogForm = ({
    onClose,
    open,
    onSubmit,
    recipe,
}: Props) => {
    const formikRef = useRef(null)

    const handleConfirm = () => {
        (formikRef.current as any)?.submitForm()
    }

    const _handleSubmit = (values: Record<string, any>) => {
        onSubmit(values)
        onClose()
    }

    const handleCancel = () => {
        onClose()
    }

    return (
        <Dialog open={open} onClose={onClose} sx={sx.dialog}>
            <DialogTitle>
                {recipe?.uniqueCode} - {recipe?.name}
            </DialogTitle>
            <DialogContent sx={{ p: 0, overflow: 'hidden' }}>
                <DialogContentText>
                    Choisissez la section sur laquelle vous devez faire une contre-pesée.
                </DialogContentText>
                <IconButton
                    aria-label="close"
                    onClick={handleCancel}
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                >
                    <CloseIcon />
                </IconButton>
                <Box sx={{ pt: 2 }}>
                    <Formik
                        innerRef={formikRef}
                        initialValues={{ recipe: null }}
                        // validationSchema={schema}
                        onSubmit={_handleSubmit}
                    >
                        {({ errors, setFieldValue }) => (
                            <Form>
                                <SectionsField
                                    sections={recipe?.sections}
                                />
                            </Form>
                        )}
                    </Formik>
                </Box>
            </DialogContent>
            <DialogActions  sx={{ p: 0 }}>
                <Button onClick={handleConfirm} color="primary" variant="contained">
                    Suivant
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default SectionsSelectionDialogForm
