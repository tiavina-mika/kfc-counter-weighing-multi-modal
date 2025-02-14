import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Card, Stack, styled, TextField } from '@mui/material';
import { ChangeEvent, useState } from 'react';

const primaryColor = '#262626'
const errorColor = '#F44259'
const activeColor = '#2196F3'
const grayColor = '#7C7C7C'

const StyleAccordion = styled(Accordion, {
  shouldForwardProp: (prop) => prop !== "hasError"
})(({ hasError = false }: { hasError: boolean }) => ({
  padding: '4px',
  borderRadius: '8px',
  border: hasError ? '1px solid ' + errorColor : '1px solid #E6E6E6',
  background: '#FFF',
  boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.15)',
  '&.MuiPaper-root::before': {
    display: 'none',
  },
}))

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
  sections: {
    gap: '16px',
    display: 'flex',
    flexDirection: 'column',
  },
  sectionName: {
    color: primaryColor,
    fontSize: '20px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '140%',
  },
  sectionDescription: {
    color: grayColor,
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '150%',
  },
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
  options: Record<string, any>[]
  values: Record<string, any>[]
  setFieldValue: (field: string, value: any) => void
  errors?: Record<string, any>[] | string | undefined | string[]
}

const SectionsField = ({
  options = [],
  values = [],
  errors,
  setFieldValue
}: Props) => {
  const [selectedSection, setSelectedSection] = useState<Record<string, any> | null>(null)
  const [selectedSections, setSelectedSections] = useState<Record<string, any>[]>([])

  const handleSelectSection = (section: Record<string, any>) => {
    setSelectedSection(prev => prev?.objectId === section.objectId ? null : section)
    setSelectedSections(prev => prev.includes(section) ? prev.filter((s: Record<string, any>) => s.objectId !== section.objectId) : [...prev, section])
  }

  const handleSelectReason = (reason: Record<string, any>, sectionIndex: number) => {
    setFieldValue(`sections[${sectionIndex}].reason`, reason.value)
  }

  const handleChangeWeight = (sectionIndex: number) => (event: ChangeEvent<HTMLInputElement>) => {
    setFieldValue(`sections[${sectionIndex}].weight`, +event.target.value)
  }

  const hasGlobalError = errors && typeof errors === 'string'

  return (
    <Box sx={sx.sections}>
      {options.map((section: Record<string, any>, sectionIndex: number) => {
        return (
          <StyleAccordion
            key={section.objectId + sectionIndex}
            // expanded={selectedSection?.objectId === section.objectId}
            expanded={selectedSections.some(s => s.objectId === section.objectId)}
            onChange={() => handleSelectSection(section)}
            // if error is the global error message or any individual error
            hasError={
              // global error: for all sections
              !!hasGlobalError
              // individual section error: when weight is defined but reason is not
              || !!(errors && Array.isArray(errors) && errors[sectionIndex]
              && section.objectId === selectedSection?.objectId
              && (errors[sectionIndex] as any).weight && !(errors[sectionIndex] as any).reason
            )}
          >
            {/* section details */}
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span" sx={sx.sectionName}>
                {section.name}
              </Typography>
            </AccordionSummary>
            {/* section form */}
            <AccordionDetails>
              <Stack>
                {/* main label */}
                <Typography sx={sx.sectionDescription}>
                  Pesez l'ensemble de la section restante puis saisissez son poids et le motif de cette contre-pesée.
                </Typography>
  
                {/* fields */}
                <Stack alignItems="center">
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
                            value={values[sectionIndex]?.weight || 0}
                            onChange={handleChangeWeight(sectionIndex)}
                            isPositiveNumber={values[sectionIndex]?.weight > 0}
                          />
                          <StyledWeightInputBorderBottom
                            hasError={
                              // individual section error: when weight is not defined
                              !!(errors && (errors[sectionIndex] as any)?.weight)
                              // global error: for all sections
                              || !!hasGlobalError
                            }
                            isPositiveNumber={values[sectionIndex]?.weight > 0}
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
                        const isSelectedReason = values[sectionIndex]?.reason === reason.value
                        return (
                          <StyleCard
                            key={reason.value + reasonIndex}
                            onClick={() => handleSelectReason(reason, sectionIndex)}
                            isSelected={isSelectedReason}
                            hasError={
                              // individual section error: when weight is defined but reason is not
                              (!!(errors && (errors[sectionIndex] as any)?.reason)
                              && (errors[sectionIndex] as any).weight && !(errors[sectionIndex] as any).reason)
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
                    {/* reason error message */}
                    {errors && (errors[sectionIndex] as any)?.reason && (
                      <Typography color="error" variant="caption">
                        {(errors[sectionIndex] as any)?.reason}
                      </Typography>
                    )}
                  </Stack>
                </Stack>
              </Stack>
            </AccordionDetails>
          </StyleAccordion>
        )
      })}
    </Box>
  )
}

export default SectionsField; 