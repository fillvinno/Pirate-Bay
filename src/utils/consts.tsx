import {Asset} from "../models/Asset.ts";
import Eth from '../assets/ETH.svg?react';
import Usdt from '../assets/USDT.svg?react';
import Usdс from '../assets/USDC.svg?react';

export const DEFAULT_ASSETS: Asset[] = [
  {
    symbol: 'USDT',
    address: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
    decimals: 6,
    icon: <Usdt/>
  },
  {
    symbol: 'USDC',
    address: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
    decimals: 6,
    icon: <Usdс/>
  },
  {
    symbol: 'ETH',
    address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    decimals: 18,
    icon: <Eth/>
  },
];