import { useEffect, useRef } from "react"
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
    FormHelperText,
    Stack,
} from "@mui/material"
import CloseIcon from '@mui/icons-material/Close'
import * as Yup from "yup"
import SectionsField from "./SectionsField"

const sectionSchema = Yup.object().shape({
    weight: Yup.number().required('Veuillez saisir le poids de cette contre-pesée.'),
    reason: Yup.string()
})
const schema = Yup.object().shape({
    sections: Yup.array().of(sectionSchema).test(
        'at-least-one-weight',
        'Veuillez compléter la section sur laquelle vous souhaitez faire votre contre-pesée.',
        (sections) => sections?.some(section => section.weight)
    ).min(1, 'Veuillez sélectionner au moins une section.')
});

const sx = {
    dialog: {
        '& .MuiDialog-paper': {
            width: 700,
            padding: '32px 24px',
            gap: '40px'
        },
    },
    dialogTitle: {
        color: '#262626',
        fontFamily: 'Roboto',
        fontSize: 24,
        fontStyle: 'normal',
        fontWeight: 500,
        lineHeight: 1.33,
    },
    dialogContent: {
        p: 0,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
    dialogActions: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    const descriptionElementRef = useRef<HTMLElement>(null);
    useEffect(() => {
      if (open) {
        const { current: descriptionElement } = descriptionElementRef;
        if (descriptionElement !== null) {
          descriptionElement.focus();
        }
      }
    }, [open]);


    const handleConfirm = () => {
        (formikRef.current as any)?.submitForm()
    }

    const _handleSubmit = (values: Record<string, any>) => {
        console.log('values: ', values);
        return
        onSubmit(values)
        onClose()
    }

    const handleCancel = () => {
        onClose()
    }

    return (
        <Dialog open={open} onClose={onClose} scroll="body" sx={sx.dialog}>
            <DialogTitle sx={{ p: 0 }}>
                {recipe?.uniqueCode} - {recipe?.name}
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleCancel}
                sx={{ position: 'absolute', top: 8, right: 8 }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent sx={sx.dialogContent}>
                <DialogContentText>
                    Choisissez la section sur laquelle vous devez faire une contre-pesée.
                </DialogContentText>
                <Box ref={descriptionElementRef} tabIndex={-1}>
                    <Formik
                        innerRef={formikRef}
                        initialValues={{ sections: [] }}
                        // initialValues={{ sections: recipe?.sections.map((section: Record<string, any>) => ({ ...section, reason: 'broken', weight: 10 })) }}
                        validationSchema={schema}
                        onSubmit={_handleSubmit}
                    >
                        {({ errors, setFieldValue, values }) => (
                            <Form>
                                <Stack spacing={1}>
                                    <SectionsField
                                        options={recipe?.sections}
                                        values={values.sections}
                                        setFieldValue={setFieldValue}
                                        errors={errors?.sections}
                                    />
                                    {errors?.sections && typeof errors.sections === 'string' && (
                                        <FormHelperText error>{errors.sections}</FormHelperText>
                                    )}
                                </Stack>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </DialogContent>
            <DialogActions  sx={sx.dialogActions}>
                <Button onClick={onClose} color="primary">
                    Retour
                </Button>
                <Button onClick={handleConfirm} color="primary" variant="contained">
                    Suivant
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default SectionsSelectionDialogForm
