import Typography from '@mui/material/Typography';
import { Box, Button, Card, Stack, styled, TextField } from '@mui/material';
import { ChangeEvent } from 'react';
import { FormikErrors } from 'formik';
import { COLORS } from '../utils/constants';

const primaryColor = COLORS.primary
const errorColor = COLORS.error
const activeColor = COLORS.active
const grayColor = COLORS.gray

const StyleCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== "isSelected" && prop !== "hasError"
})(({ isSelected = false, hasError = false }: { isSelected: boolean; hasError: boolean }) => {
  const styles: Record<string, any> = {
    padding: '0px 16px',
    borderRadius: '6px',
    border: '1px solid #E6E6E6',
    background: '#FFF',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    cursor: 'pointer',
    boxShadow: 'none',
    flex: 1,
    height: '140px',
    '& img': {
      width: '32px',
      height: '32px',
    },
  }

  if (isSelected && !hasError) {
    styles.border = '2px solid ' + activeColor
  } else if (hasError) {
    styles.border = '1px solid ' + errorColor
  }

  return styles
})

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

const StyledWeightInputBorderBottom = styled("div", {
  shouldForwardProp: (prop) => prop !== "isPositiveNumber" && prop !== "hasError"
})(({ isPositiveNumber = false, hasError = false }: { isPositiveNumber: boolean; hasError: boolean }) => {
  const styles: Record<string, any> = {
    height: 2,
    width: 68,
    backgroundColor: grayColor
  }

  if (isPositiveNumber) {
    styles.backgroundColor = activeColor
  }

  if (hasError) {
    styles.backgroundColor = errorColor
  }

  return styles
})

const sx = {
  weightContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '32px 0px',
    gap: '16px'
  },
  weightColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
    width: 120
  },
  weightLabel: {
    color: primaryColor,
    fontSize: '20px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '140%',
    textAlign: 'center',
    flex: 1
  },
  weightValueContainer: {
    height: 46, // important to keep the height of the card
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: 0
  },
  weightValue: {
    color: primaryColor,
    fontSize: '40px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '120%',
  },
  weightUnit: {
    color: grayColor,
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '100%',
  },
  reasonLabel: {
    color: primaryColor,
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '157.1%',
  },
  weightInput: {
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
    }
  },
};

const reasons = [
  { value: 'broken', label: 'Casse', icon: 'packaging-broken' },
  { value: 'weighing-regularization', label: 'Manquant', icon: 'packaging-weighing-regularization' },
  { value: 'other', label: 'Autre', icon: 'packaging-help' },
]

type Props = {
  values: Record<string, any>[]
  setFieldValue: (field: string, value: any) => void
  errors?: Record<string, any>[] | string | undefined | string[] | FormikErrors<any> | FormikErrors<any>[],
  sectionIndex: number
  section: Record<string, any>
}

const SectionField = ({
  values = [],
  errors,
  setFieldValue,
  sectionIndex,
  section
}: Props) => {
  const handleSelectReason = (reason: Record<string, any>, sectionIndex: number) => {
    setFieldValue(`sections[${sectionIndex}].counterWeighing.reason`, reason.value)
  }

  const handleChangeWeight = (sectionIndex: number) => (event: ChangeEvent<HTMLInputElement>) => {
    setFieldValue(`sections[${sectionIndex}].counterWeighing.weight`, +event.target.value)
  }

  const handleResetSection = (section: Record<string, any>, sectionIndex: number) => {
    const prevSection = { ...section }
    delete prevSection.counterWeighing
    setFieldValue(`sections[${sectionIndex}]`, prevSection)
  }

  const hasGlobalError = errors && typeof errors === 'string'

  return (
    <Stack alignItems="center" spacing={16 / 6}>
      {/* ------- top: weight ------- */}
      <Box sx={sx.weightContainer}>
        <Stack direction="row" sx={{ gap: "96px" }}>
          {/* label */}
          <Box sx={sx.weightColumn}>
            <Typography sx={sx.weightLabel}>
              Poids initiale
            </Typography>
            <Box sx={sx.weightValueContainer}>
              <Typography sx={sx.weightValue}>
                125
              </Typography>
            </Box>
            <Typography sx={sx.weightUnit}>
              kg
            </Typography>
          </Box>
          {/* value */}
          <Box sx={sx.weightColumn}>
            <Typography sx={sx.weightLabel}>
              Poids de la contre-pesée
            </Typography>
            <Box sx={sx.weightValueContainer}>
              <StyledWeightInput
                type="number"
                value={values[sectionIndex]?.counterWeighing?.weight || 0}
                onChange={handleChangeWeight(sectionIndex)}
                isPositiveNumber={values[sectionIndex]?.counterWeighing?.weight > 0}
              />
              <StyledWeightInputBorderBottom
                hasError={
                  // individual section error: when weight is not defined
                  !!(errors && (errors as any)[sectionIndex]?.counterWeighing?.weight)
                  // global error: for all sections
                  || !!hasGlobalError
                }
                isPositiveNumber={values[sectionIndex]?.counterWeighing?.weight > 0}
              />
            </Box>
            <Typography sx={sx.weightUnit}>
              kg
            </Typography>
          </Box>
        </Stack>
      </Box>
      {/* -------- bottom: reason -------- */}
      <Stack spacing={16 / 6} sx={{ alignSelf: "stretch" }}>
        {/* list of reasons */}
        <Stack direction="row" sx={{ gap: "16px", alignSelf: "stretch" }}>
          {reasons.map((reason: Record<string, any>, reasonIndex: number) => {
            const isSelectedReason = values[sectionIndex]?.counterWeighing?.reason === reason.value
            return (
              <StyleCard
                key={reason.value + reasonIndex}
                onClick={() => handleSelectReason(reason, sectionIndex)}
                isSelected={isSelectedReason}
                hasError={
                  // individual section error: when weight is defined but reason is not
                  !!errors && (errors as any)[sectionIndex]?.counterWeighing?.reason
                  // global error: for all sections
                  || !!hasGlobalError
                }
              >
                <img alt={reason.label} src={`/icons/${reason.icon}${isSelectedReason ? '-active' : ''}.svg`} />
                <Typography sx={sx.reasonLabel}>
                  {reason.label}
                </Typography>
              </StyleCard>
            )
          })}
        </Stack>
        {/* reset button */}
        {section.counterWeighing && (
          <div>
            <Button variant="outlined" color="primary" onClick={() => handleResetSection(section, sectionIndex)}>
              Faire une nouvelle contre-pesée
            </Button>
          </div>
        )}
        {/* reason error message */}
        {errors && (errors as any)[sectionIndex]?.counterWeighing.reason && (
          <Typography color="error" variant="caption">
            {(errors as any)[sectionIndex]?.counterWeighing.reason}
          </Typography>
        )}
      </Stack>
    </Stack>
  )
}

export default SectionField; 