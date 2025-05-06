import { useMutation } from '@tanstack/react-query';
import { approveToken } from '../services/squid';
import { Address } from 'viem';

type ApproveParams = {
  tokenAddress: Address
  spenderAddress: Address
  amount: bigint
}

export const useApprove = () => {
  return useMutation({
    mutationFn: ({ tokenAddress, spenderAddress, amount }: ApproveParams) => {
      return approveToken(tokenAddress, spenderAddress, amount)
    },
  })
}