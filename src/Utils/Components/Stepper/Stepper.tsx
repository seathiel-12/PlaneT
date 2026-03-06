import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import ColorSlider from '../Slider/Slider';
import { Check } from 'lucide-react';


export type step = {
  label: string,
  render: ()=> React.ReactNode,
  onNext: ()=> void,
  onBack: ()=> void,
}


type stepperProps = {
  steps : step[] 
}
const LinearStepper: React.FC<stepperProps> = ( {steps} ) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const [level, setlevel] = React.useState(0);  
  const sliderIncrease = 100 / steps.length;

  const isStepOptional = (step: number) => {
    return step === -1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setlevel((level) => level + (100 / steps.length));

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setlevel((level) => level - (100 / steps.length));

  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }


    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
    setlevel(0);
  };

  return (
    <Box>
      <Stepper activeStep={activeStep}  connector={<hr className='border-gray-300 border-[0.5px] w-17 ml-4 mr-12'/>} style={{margin:'auto', minWidth: 'max-content', width: '100%'}}>
        {steps.map(( {label} , index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps} >
              <StepLabel {...labelProps}  icon={ activeStep > index ? <div className='rounded-full p-2 bg-(--sb-blue-250)'><Check stroke='white'/></div>  : <div className={ 'border-2 border-(--sb-blue-250) text-(--sb-blue-250) rounded-full w-full px-3.5 py-1.5'}>{index + 1}</div> } ><span style={{color: activeStep > index ? 'var(--sb-blue-250)' : 'black'}} className='text-[15px] min-w-max'>{label}</span></StepLabel>
            </Step>
          );
        })}
      </Stepper>
      
      <ColorSlider from={sliderIncrease * (activeStep - 1)} to={level}  />

      {/* {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )} */}
    </Box>
  );
}

export default LinearStepper;