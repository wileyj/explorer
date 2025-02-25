import { TwoColsListItem } from '@/common/components/TwoColumnsListItem';
import { useGlobalContext } from '@/common/context/useAppContext';
import { buildUrl } from '@/components/links';
import { PrincipalLink } from '@/components/transaction-item';
import { Circle } from '@/ui/Circle';
import { Stack } from '@/ui/Stack';
import { Caption, Text, Title } from '@/ui/typography';
import * as React from 'react';
import { FC, memo, useMemo } from 'react';
import { TbArrowDown, TbArrowUp } from 'react-icons/tb';

import { Transaction } from '@stacks/stacks-blockchain-api-types';

interface TransferListItemProps {
  tx: Transaction;
  title: string;
  sender?: string;
  recipient?: string;
  amount: string;
  isOriginator: boolean;
}

export const TransferListItem: FC<TransferListItemProps> = memo(
  ({ tx, title, sender, recipient, amount, isOriginator }) => {
    const network = useGlobalContext().activeNetwork;
    const href = buildUrl(`/txid/${encodeURIComponent(tx.tx_id)}`, network);

    const icon = useMemo(
      () =>
        isOriginator ? (
          <Circle bg={'bg'} size={'40px'} marginLeft={'56px'}>
            <TbArrowUp color={'invert'} fill={'bg'} size={'16px'} />
          </Circle>
        ) : (
          <Circle bg={'bg'} size={'40px'} marginLeft={'56px'}>
            <TbArrowDown color={'invert'} fill={'bg'} size={'16px'} />
          </Circle>
        ),
      [isOriginator]
    );

    const leftTitle = useMemo(
      () => (
        <Title fontWeight="500" display="block" fontSize="16px" marginLeft={'56px'}>
          {title}
        </Title>
      ),
      [title]
    );

    const leftSubtitle = useMemo(
      () => (
        <Stack
          as="span"
          isInline
          spacing="4px"
          alignItems="center"
          flexWrap="wrap"
          divider={<Caption>∙</Caption>}
          marginLeft={'56px'}
        >
          <Caption fontWeight="bold">Transfer</Caption>
          {isOriginator && recipient && (
            <Caption>
              To <PrincipalLink principal={recipient} />
            </Caption>
          )}
          {!isOriginator && sender && (
            <Caption>
              From <PrincipalLink principal={sender} />
            </Caption>
          )}
        </Stack>
      ),
      [isOriginator, sender, recipient]
    );

    const rightTitle = useMemo(
      () => (
        <Text ml="8px" fontSize="14px" textAlign="right" color={'textBody'}>
          {amount}
        </Text>
      ),
      [amount]
    );

    return (
      <TwoColsListItem
        icon={icon}
        leftContent={{ title: leftTitle, subtitle: leftSubtitle }}
        rightContent={{ title: rightTitle, subtitle: null }}
      />
    );
  }
);
