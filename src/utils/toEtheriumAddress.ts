import {isAddress} from "viem";

export const toEthereumAddress = (address: string): `0x${string}` => {
  if (!isAddress(address)) throw new Error(`Invalid Ethereum address: ${address}`);
  return address as `0x${string}`;
};