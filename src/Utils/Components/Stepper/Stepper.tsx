import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import ColorSlider from '../Slider/Slider';
import { ArrowLeft, Check } from 'lucide-react';
import { useStepperContext } from '../../../Components/Pages/BookFlight';
import { useSearchParams } from 'react-router-dom';


export type step = {
  label: string,
  render: ()=> React.ReactNode,
}


export type stepperProps = {
  steps : step[],
}

const MobileStepper: React.FC<stepperProps & { activeStep: number, onStepChange: (step: number) => void }> = ({ steps, activeStep, onStepChange }) => (
  <div className='md:hidden rounded-xl border border-gray-200 bg-white p-4 shadow-sm'>
    <div className='mb-3 flex items-center justify-between'>
      <span className='text-sm font-medium text-gray-500'>Booking progress</span>
      <span className='text-sm text-gray-400'>{activeStep + 1} / {steps.length}</span>
    </div>
    <div className='flex flex-col'>
      {steps.map(({ label }, index) => {
        const isCompleted = activeStep > index;
        const isActive = activeStep === index;

        return (
          <button
            type='button'
            key={label}
            onClick={() => onStepChange(index)}
            className='flex min-h-12 items-center gap-3 text-left'
          >
            <span className='flex flex-col items-center self-stretch'>
              <span className={`flex size-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-medium ${isCompleted ? 'border-(--sb-blue-250) bg-(--sb-blue-250) text-white' : isActive ? 'border-(--sb-blue-250) text-(--sb-blue-250)' : 'border-gray-300 text-gray-400'}`}>
                {isCompleted ? <Check size={16} /> : index + 1}
              </span>
              {index < steps.length - 1 && <span className={`mt-1 w-px flex-1 ${isCompleted ? 'bg-(--sb-blue-250)' : 'bg-gray-200'}`} />}
            </span>
            <span className={`pb-3 text-sm ${isActive ? 'font-semibold text-gray-900' : isCompleted ? 'text-(--sb-blue-250)' : 'text-gray-500'}`}>
              {label}
            </span>
          </button>
        );
      })}
    </div>
  </div>
);

const LinearStepper: React.FC<stepperProps> = ( {steps} ) => {
  const {activeStep, setActiveStep, levelSlider, setLevelSlider} = useStepperContext();
  const [, setSearchParams] = useSearchParams();
  const sliderIncrease = 100 / steps.length;

  React.useEffect(()=> {
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);
      nextParams.set('step', activeStep.toString());
      return nextParams;
    }, { replace: true });

    setLevelSlider(activeStep * sliderIncrease);
  }, [activeStep, setLevelSlider, setSearchParams, sliderIncrease])
  
  const isStepOptional = (step: number) => {
    return step === -1;
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
 
  return (
    <Box>
      <div >
        <div className='hidden items-center gap-5 md:flex'>
          <div onClick={()=> {
            if(activeStep > 0)
              handleBack();
          }} className='rounded-full p-2.5 border-[0.5px] border-gray-300 text-gray-400 cursor-pointer hover:bg-gray-100 hover:scale-95 duration-300'><ArrowLeft/></div>
          <div className='min-w-0 flex-1 overflow-x-auto pb-1'>
          <Stepper activeStep={activeStep} connector={<hr className='border-gray-300 border-[0.5px] w-full ml-4 mr-5'/>} style={{margin:'auto', minWidth: 0, width: '100%'}} sx={{ '& .MuiStepLabel-label': { whiteSpace: 'nowrap' }, '@media (max-width: 639px)': { minWidth: 'max-content', '& .MuiStepLabel-label': { fontSize: '0.7rem' }, '& .MuiStepConnector-root': { display: 'none' }, '& .MuiStep-root': { paddingLeft: '8px', paddingRight: '8px' }, '& .MuiStepLabel-iconContainer': { paddingRight: '4px' } } }}>
            {[...steps].map(( {label} , index) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: {
                optional?: React.ReactNode;
              } = {};
              if (isStepOptional(index)) {
                labelProps.optional = (
                  <Typography variant="caption">Optional</Typography>
                );
              }
              return (
                <Step key={label} {...stepProps} >
                  <StepLabel {...labelProps}  icon={ activeStep > index ? <div className='rounded-full p-2 bg-(--sb-blue-250)'><Check stroke='white'/></div>  : <div className={ 'border-2 border-(--sb-blue-250) text-(--sb-blue-250) rounded-full w-full px-3.5 py-1.5'}>{index + 1}</div> } ><span style={{color: activeStep > index ? 'var(--sb-blue-250)' : 'black'}} className='text-[15px] min-w-max block'>{label}</span></StepLabel>
                </Step>
              );
            })}
          </Stepper>
          </div>
        </div>
        <MobileStepper steps={steps} activeStep={activeStep} onStepChange={setActiveStep} />
          <ColorSlider from={levelSlider} to={activeStep * sliderIncrease} />
      </div>
      
        {steps[activeStep].render()}
        
    </Box>
  );
}

export default LinearStepper;