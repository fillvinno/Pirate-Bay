import {Squid} from "@0xsquid/sdk";
import {TGetSwapQuote} from "../models/GetSwapQuote.ts";
import {Address, erc20Abi} from "viem";
import {readContract, writeContract} from "@wagmi/core";
import {config} from "./wagmiConfig.ts";


let squidInstance: Squid | null = null;

export const getSDK = async () => {
  if (!squidInstance) {
    squidInstance = new Squid({
      baseUrl: "https://v2.api.squidrouter.com",
      integratorId: 'pirata-bay-4e58a721-fa5a-4b17-8c6b-01cfd7edaacc',
    });
    await squidInstance.init();
  }
  return squidInstance;
}

export const getSwapQuote = async (params: TGetSwapQuote) => {
  try {
    const squidInstance = await getSDK()

    const result = await squidInstance.getRoute(params)

    console.log('Squid quote response:', result);

    return result;
  } catch (error) {
    console.error('Squid getRoute error:', error)

    throw error
  }
}

// Проверка текущего allowance
export const checkAllowance = async (
  tokenAddress: string,
  ownerAddress: string,
  spenderAddress: string
): Promise<bigint> => {
  return readContract(config, {
    address: tokenAddress as Address,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [
      ownerAddress as Address,
      spenderAddress as Address
    ],
  });
};

// Отправка approve
export const approveToken = async (
  tokenAddress: string,
  spenderAddress: string,
  amount: bigint
) => {
  return writeContract(config, {
    address: tokenAddress as Address,
    abi: erc20Abi,
    functionName: 'approve',
    args: [
      spenderAddress as Address,
      amount
    ],
  });
};

export const executeSwap = async (transactionRequest: any) => {
  const squidInstance = await getSDK()
  return squidInstance.executeRoute(transactionRequest)
}