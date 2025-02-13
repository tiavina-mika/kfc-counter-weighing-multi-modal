import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Card, Stack } from '@mui/material';
import { useState } from 'react';

const primaryColor = '#262626'

const sx = {
  sections: {
    gap: '16px',
    display: 'flex',
    flexDirection: 'column',
  },
  accordion: {
    padding: '4px',
    borderRadius: '8px',
    border: '1px solid #E6E6E6',
    background: '#FFF',
    boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.15)',
    '&.MuiPaper-root::before': {
      display: 'none',
    },
  },
  sectionName: {
    color: primaryColor,
    fontSize: '20px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '140%',
  },
  weightColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  weightLabel: {
    color: primaryColor,
    fontSize: '20px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '140%',
  },
  weightValue: {
    color: primaryColor,
    fontSize: '40px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '120%',
  },
  weightUnit: {
    color: '#7C7C7C',
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
  reasonCard: {
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
    // width: '196px',
    flex: 1,
    height: '140px',
    '& img': {
      width: '32px',
      height: '32px',
    },
  },
  selectedReasonCard: {
    border: '2px solid #2196F3',
  }
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
}

const SectionsField = ({ options = [], values = [], setFieldValue }: Props) => {
  const [selectedSection, setSelectedSection] = useState<Record<string, any> | null>(null)

  const handleSelectSection = (section: Record<string, any>) => {
    setSelectedSection(section)
  }

  const handleSelectReason = (reason: Record<string, any>, sectionIndex: number) => {
    setFieldValue(`sections[${sectionIndex}].reason`, reason.value)
  }

  return (
    <Box sx={sx.sections}>
      {options.map((section: Record<string, any>, sectionIndex: number) => (
        <Accordion
          key={section.objectId + sectionIndex}
          expanded={selectedSection?.objectId === section.objectId}
          onChange={() => handleSelectSection(section)}
          sx={sx.accordion}
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
              <Typography>
                Pesez l'ensemble de la section restante puis saisissez son poids et le motif de cette contre-pesée.
              </Typography>

              {/* fields */}
              <Stack alignItems="center">
                {/* ------- top: weight ------- */}
                <Stack direction="row" sx={{ gap: "96px" }}>
                  {/* label */}
                  <Box sx={sx.weightColumn}>
                    <Typography sx={sx.weightLabel}>
                      Poids initiale
                    </Typography>
                    <Typography sx={sx.weightValue}>
                      125
                    </Typography>
                    <Typography sx={sx.weightUnit}>
                      kg
                    </Typography>
                  </Box>
                  {/* value */}
                  <Box sx={sx.weightColumn}>
                    <Typography sx={sx.weightLabel}>
                      Poids de la <br />
                      contre-pesée
                    </Typography>
                    <Typography sx={sx.weightValue}>
                      0
                    </Typography>
                    <Typography sx={sx.weightUnit}>
                      kg
                    </Typography>
                  </Box>
                </Stack>
                {/* -------- bottom: reason -------- */}
                <Stack direction="row" sx={{ gap: "16px", alignSelf: "stretch" }}>
                  {reasons.map((reason: Record<string, any>, reasonIndex: number) => {
                    const isSelectedReason = values[sectionIndex]?.reason === reason.value
                    return (
                      <Card
                        key={reason.value + reasonIndex}
                        sx={{
                          ...sx.reasonCard,
                          ...(isSelectedReason ? sx.selectedReasonCard : {}),
                        }}
                        onClick={() => handleSelectReason(reason, sectionIndex)}
                      >
                        <img alt={reason.label} src={`/icons/${reason.icon}.svg`} />
                        <Typography sx={sx.reasonLabel}>
                          {reason.label}
                        </Typography>
                      </Card>
                    )
                  })}
                </Stack>
              </Stack>
            </Stack>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  )
}

export default SectionsField; 