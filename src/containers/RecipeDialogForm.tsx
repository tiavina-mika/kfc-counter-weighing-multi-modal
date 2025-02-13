import React, { useState } from "react"
import { ErrorMessage, useFormik } from "formik"
import {
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    InputLabel,
    FormHelperText,
    Stack,
} from "@mui/material"
import * as Yup from "yup"
import FormikAutocompleteField from "../components/FormikAutocompleteField"
import { searchRecipesByUniqueCodeOrName } from "../utils/utils"

const schema = Yup.object().shape({
    startDate: Yup.date().required("Veuillez sélectionner une date de début"),
    endDate: Yup
        .date()
        .required("Veuillez sélectionner une date de fin")
        .min(Yup.ref('startDate'), 'La date de fin doit être supérieure à la date de début')
});

const formatOptions = (recipes: Record<string, any>[] = []) => {
    return recipes.map((recipe: Record<string, any>) => ({
      value: recipe.objectId,
      data: recipe
    }))
}

const getOptionLabel = (recipe: Record<string, any>) => {
    const name = recipe.name.toLowerCase()
    const label = recipe.uniqueCode ? recipe.uniqueCode + " - " + name : name
    return label
}  

const sx = {
    dialog: {
        width: 600,
        padding: 12
    },
    dialogTitle: {
        paddingBottom: 0,
    },
}

type Props = {
    onClose: () => void
    open: boolean
    onSubmit: (values: Record<string, any>) => void
}
const RecipeDialogForm = ({
    onClose,
    open,
    onSubmit,
}: Props) => {
    const [searchedRecipes, setSearchedRecipes] = useState<Record<string, any>[]>([])

    const handleSearchRecipes = (search: string) => {
        const recipes = searchRecipesByUniqueCodeOrName(search)
        setSearchedRecipes(recipes)
    }
  
    const handleClearSearch = () => {
        setSearchedRecipes([])
    }

    const _handleSubmit = (values: Record<string, any>) => {
        onSubmit(values)
        onClose()
    }

    const formik = useFormik({
        onSubmit: _handleSubmit,
        // validationSchema: schema,
        initialValues: {
            recipe: null
        }
    });

    const { handleSubmit, errors, values, setFieldValue, submitForm } = formik;

    const handleCancel = () => {
        onClose()
    }

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title" sx={sx.dialog}>
            <DialogContent>
                <DialogContentText sx={{ pt: 1, pb: 2 }}>
                    Choisissez la recette pour laquelle vous souhaitez faire une contre-pesée.
                </DialogContentText>
                <form onSubmit={handleSubmit}>
                    <Stack direction="row" spacing={2}>
                        <Stack spacing={1} sx={{ flex: 1 }}>
                            <InputLabel>
                                Nom de la recette
                            </InputLabel>
                            <FormikAutocompleteField
                                name="recipe"
                                setFieldValue={setFieldValue}
                                options={formatOptions(searchedRecipes)}
                                getOptionLabel={getOptionLabel}
                                onSearch={handleSearchRecipes}
                                onBlur={handleClearSearch}
                              />
                              <ErrorMessage
                                name="recipe"
                                render={(message) => (
                                  <FormHelperText error>
                                    {message}
                                  </FormHelperText>
                                )}
                              />
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
