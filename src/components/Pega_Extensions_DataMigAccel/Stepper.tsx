import type { StepperProps } from './types';

const Stepper = (props: StepperProps) => {
  const { steps, activeStep, setActiveStep  } = props;

  return (
  <div className="dx-stepper">
    { steps.map((label, index) => {
      const isActive = index === activeStep;
      const isCompleted = index < activeStep;

      return (
        <div
          key={label}
          className={`dx-step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
          onClick={() => setActiveStep(index)}
        >
          <div className="dx-step-circle">
            {isCompleted ? '✓' : index + 1}
          </div>

          <span className="dx-step-label">{label}</span>

          {index !== steps.length - 1 && (
            <div className="dx-step-line" />
          )}
        </div>
      );
    })}
  </div>
  )
}
export default Stepper;
