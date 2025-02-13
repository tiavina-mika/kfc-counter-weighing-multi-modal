import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Stack } from '@mui/material';
import { useState } from 'react';

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
    color: '#262626',
    fontSize: '20px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '140%',
  },
};

type Props = {
  sections: Record<string, any>[]
}

const SectionsField = ({ sections = [] }: Props) => {
  const [selectedSection, setSelectedSection] = useState<Record<string, any> | null>(null)

  const handleSelectSection = (section: Record<string, any>) => {
    setSelectedSection(section)
  }

  return (
    <Box sx={sx.sections}>
      {sections.map((section: Record<string, any>, index: number) => (
        <Accordion
          key={section.objectId + index}
          expanded={selectedSection?.objectId === section.objectId}
          onChange={handleSelectSection}
          sx={sx.accordion}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span" sx={sx.sectionName}>
              {section.name}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack>
              <Typography>
                Pesez l'ensemble de la section restante puis saisissez son poids et le motif de cette contre-pesée.
              </Typography>
            </Stack>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  )
}

export default SectionsField; 