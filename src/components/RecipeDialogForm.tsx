import React from "react"
import { useFormik } from "formik"
import {
    Button,
    DialogTitle,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    InputLabel,
    FormHelperText,
    Stack,
} from "@mui/material"
import makeStyles from "@mui/styles/makeStyles"
import { DatePicker } from "@mui/x-date-pickers"
import * as Yup from "yup"

const schema = Yup.object().shape({
    startDate: Yup.date().required("Veuillez sélectionner une date de début"),
    endDate: Yup
        .date()
        .required("Veuillez sélectionner une date de fin")
        .min(Yup.ref('startDate'), 'La date de fin doit être supérieure à la date de début')
});

const useStyles = makeStyles({
    dialog: {
        width: 600,
        padding: 12
    },
    dialogTitle: {
        paddingBottom: 0,
    },
})

const RecipeDialogForm = ({
    onClose,
    open,
    onSubmit,
}) => {
    const classes = useStyles()

    const _handleSubmit = (values) => {
        onSubmit(values)
        onClose()
    }

    const formik = useFormik({
        onSubmit,
        validationSchema: schema,
        initialValues: {
            startDate: null,
            endDate: null
        }
    });

    const { handleSubmit, errors, values, setFieldValue, submitForm } = formik;

    const handleCancel = () => {
        onClose()
    }

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title" classes={{ paper: classes.dialog }}>
            <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
                TVA global et montant HT total dans les commandes FoodChéri
            </DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ pt: 1, pb: 2 }}>
                    Séléctionner la date de début et de fin pour laquelle vous souhaitez enregistrer la TVA global et le montant HT total dans les commandes FoodChéri.
                </DialogContentText>
                <form onSubmit={handleSubmit}>
                    <Stack direction="row" spacing={2}>
                        <Stack spacing={1} sx={{ flex: 1 }}>
                            <InputLabel>
                                Date de début
                            </InputLabel>
                            <DatePicker
                                showToolbar={false}
                                value={values.startDate}
                                name="startDate"
                                inputFormat="DD/MM/YY"
                                renderInput={(params) => <TextField {...params} variant="standard" error={!!errors.startDate} InputLabelProps={{ shrink: true }} />}
                                onChange={date => setFieldValue('startDate', date)}
                            />
                            {errors.startDate 
                                ? <FormHelperText error={!!errors.startDate}>{errors.startDate}</FormHelperText>
                                : null
                            }
                        </Stack>
                    </Stack>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel} color="primary">
                    Annuler
                </Button>
                <Button onClick={submitForm} color="primary" variant="contained">
                    Confirmer
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default RecipeDialogForm
