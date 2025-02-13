import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Stack } from '@mui/material';
import { useState } from 'react';

type Props = {
  sections: Record<string, any>[]
}
const SectionsField = ({ sections = [] }: Props) => {
  const [selectedSection, setSelectedSection] = useState<Record<string, any> | null>(null)

  const handleSelectSection = (section: Record<string, any>) => {
    setSelectedSection(section)
  }

  return (
    <>
      {sections.map((section: Record<string, any>, index: number) => (
        <Accordion
          key={section.objectId + index}
          expanded={selectedSection?.objectId === section.objectId}
          onChange={handleSelectSection}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span">
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
    </>
  )
}

export default SectionsField; 