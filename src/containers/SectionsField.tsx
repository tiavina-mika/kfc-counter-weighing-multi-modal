import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Stack, styled } from '@mui/material';
import { useState } from 'react';
import { FormikErrors } from 'formik';
import { COLORS } from '../utils/constants';
import SectionField from './SectionField';

const primaryColor = COLORS.primary
const errorColor = COLORS.error
const grayColor = COLORS.gray

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
};

type Props = {
  options: Record<string, any>[]
  values: Record<string, any>[]
  setFieldValue: (field: string, value: any) => void
  errors?: Record<string, any>[] | string | undefined | string[] | FormikErrors<any> | FormikErrors<any>[]
}

const SectionsField = ({
  options = [],
  values = [],
  errors,
  setFieldValue
}: Props) => {
  const [selectedSections, setSelectedSections] = useState<Record<string, any>[]>([])

  const handleSelectSection = (section: Record<string, any>) => {
    setSelectedSections(prev => prev.includes(section) ? prev.filter((s: Record<string, any>) => s.objectId !== section.objectId) : [...prev, section])
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
              && selectedSections.some(s => s.objectId === section.objectId)
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
                <SectionField
                  values={values}
                  errors={errors}
                  setFieldValue={setFieldValue}
                  sectionIndex={sectionIndex}
                  section={section}
                />
              </Stack>
            </AccordionDetails>
          </StyleAccordion>
        )
      })}
    </Box>
  )
}

export default SectionsField; 