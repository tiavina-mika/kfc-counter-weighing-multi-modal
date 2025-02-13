import { useRef, useState } from "react"
import { Form, Formik } from "formik"
import {
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    FormHelperText,
    Stack,
    Box,
    IconButton,
} from "@mui/material"
import CloseIcon from '@mui/icons-material/Close'
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
}
const RecipeDialogForm = ({
    onClose,
    open,
    onSubmit,
}: Props) => {
    const formikRef = useRef(null)
    const [searchedRecipes, setSearchedRecipes] = useState<Record<string, any>[]>([])

    const handleConfirm = () => {
        (formikRef.current as any)?.submitForm()
    }

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

    const handleCancel = () => {
        onClose()
    }

    return (
        <Dialog open={true} onClose={onClose} sx={sx.dialog}>
            <DialogContent sx={{ p: 0, overflow: 'hidden' }}>
                <DialogContentText>
                    Choisissez la recette pour laquelle vous souhaitez faire une <br /> contre-pesée.
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
                                <Stack direction="row" spacing={2}>
                                    <Stack spacing={1} sx={{ flex: 1 }}>
                                        <FormikAutocompleteField
                                            name="recipe"
                                            label="Nom de la recette"
                                            setFieldValue={setFieldValue}
                                            options={formatOptions(searchedRecipes)}
                                            getOptionLabel={getOptionLabel}
                                            onSearch={handleSearchRecipes}
                                            onBlur={handleClearSearch}
                                        />
                                        {errors.recipe && <FormHelperText error>{errors.recipe}</FormHelperText>}
                                    </Stack>
                                </Stack>
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

export default RecipeDialogForm
