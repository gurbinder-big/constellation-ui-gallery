import { Grid, Flex, FieldGroup, withConfiguration } from '@pega/cosmos-react-core';
import { Children, isValidElement } from 'react';

import type { PConnFieldProps } from './PConnProps';
import DetailsRender from './DetailsRender';

import StyledPegaExtensionsMyFormWrapper from './styles';

interface PegaExtensionsMyFormProps extends PConnFieldProps {
  showLabel: boolean;
  NumCols: string;
  children: any;
}

function PegaExtensionsMyForm(props: PegaExtensionsMyFormProps) {
  const { children = [], NumCols = '1', label, showLabel, getPConnect, readOnly, displayMode } = props;
  const propsToUse = { label, showLabel, ...getPConnect().getInheritedProps() };
  const nCols = parseInt(NumCols, 10);

  // Normalize children to an array
  const fields = Children.toArray(children);

  // Insert the button after the 2nd field (index 2). Change the index if you want a different location.
  const enhancedFields = [
    ...fields.slice(0, 2),
    <button key="extraBtn" type="button">My Custom Button</button>,
    ...fields.slice(2),
  ];

  // Helper renderer: if it's a plain DOM element (e.g. 'button', 'div'), render it directly.
  // Otherwise pass to DetailsRender for proper Pega rendering.
  const renderField = (child: any, idx: number) => {

    // eslint-disable-next-line no-console
    console.log(idx);
    // If it's a valid React element and its .type is a string, it's a DOM element (e.g. 'button')
    if (isValidElement(child) && typeof (child as any).type === 'string') {
      return child;
    }
    // else assume it's a Pega field descriptor that DetailsRender can handle
    return <DetailsRender child={child} />;
  };

  if (readOnly && displayMode === 'DISPLAY_ONLY') {
    const numRegions = '1';
    const gridContainer: any = { colGap: 0, 'margin-line-start': 0, cols: `repeat(${numRegions}, 1fr)` };

    return (
      <StyledPegaExtensionsMyFormWrapper>
        <FieldGroup name={propsToUse.showLabel ? propsToUse.label : ''}>
          <Grid container={gridContainer} data-testid={`column-count-${numRegions}`}>
            {enhancedFields.map((child: any, i: number) => (
              <Flex
                key={child?.key ?? `r-${i + 1}`}
                container={{ direction: 'column', alignItems: 'start', colGap: 1, rowGap: 1.5 }}
              >
                {renderField(child, i)}
              </Flex>
            ))}
          </Grid>
        </FieldGroup>
      </StyledPegaExtensionsMyFormWrapper>
    );
  }

  // Non-readOnly: ensure consistent rendering structure (wrap each in Flex for predictable layout)
  return (
    <StyledPegaExtensionsMyFormWrapper>
      <FieldGroup name={propsToUse.showLabel ? propsToUse.label : ''}>
        <Grid container={{ cols: `repeat(${nCols}, minmax(0, 1fr))`, gap: 2 }}>
          {enhancedFields.map((child: any, i: number) => (
            <Flex
              key={child?.key ?? `r-${i + 1}`}
              container={{ direction: 'column', alignItems: 'start', colGap: 1, rowGap: 1.5 }}
            >
              {renderField(child, i)}
            </Flex>
          ))}
        </Grid>
      </FieldGroup>
    </StyledPegaExtensionsMyFormWrapper>
  );
}

export default withConfiguration(PegaExtensionsMyForm);
