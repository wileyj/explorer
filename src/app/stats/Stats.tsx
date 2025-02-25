'use client';

import { Card } from '@/components/card';
import * as React from 'react';
import { FC } from 'react';

import { CurrentStackingCycle } from './CurrentStackingCycle';
import { LastBlock } from './LastBlock';
import { NextStackingCycle } from './NextStackingCycle';
import { StxSupply } from './StxSupply';

export const Stats: FC = () => {
  return (
    <Card
      display={'grid'}
      gridColumnStart={'1'}
      gridColumnEnd={['2', '2', '3']}
      gridTemplateColumns={['100%', '100%', '1fr 1fr', '1fr 1fr 1fr 1fr']}
    >
      <StxSupply borderRightWidth={['0px', '0px', '1px', '1px']} />
      <LastBlock borderRightWidth={['0px', '0px', '0px', '1px']} />
      <CurrentStackingCycle borderRightWidth={['0px', '0px', '1px', '1px']} />
      <NextStackingCycle />
    </Card>
  );
};
