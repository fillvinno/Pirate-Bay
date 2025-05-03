import { useQuery } from '@tanstack/react-query';
import { checkAllowance } from '../services/squid';
import { Address } from 'viem';

export const useAllowance = (
  tokenAddress: Address | undefined,
  ownerAddress: Address | undefined,
  spenderAddress: Address | undefined,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: ['allowance', tokenAddress, ownerAddress, spenderAddress],
    queryFn: () => {
      if (!tokenAddress || !ownerAddress || !spenderAddress) {
        throw new Error('Missing required parameters for allowance check')
      }
      return checkAllowance(tokenAddress, ownerAddress, spenderAddress)
    },
    enabled: !!tokenAddress && !!ownerAddress && !!spenderAddress && enabled,
    staleTime: 30000,
  });
};