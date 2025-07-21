import { ethers } from "ethers";
import {
  CurrencyAmount,
  TradeType,
  Percent,
  Ether,
  Token,
} from "@uniswap/sdk-core";
import {
  Route,
  Trade,
  SwapRouter,
  Pool,
} from "@uniswap/v3-sdk";
import ERC20ABI from "../abis/ERC20.json";
import IUniswapV3PoolABI from "../abis/files/IUniswapV3PoolABI.json";
import UniswapV3FactoryABI from "../abis/files/UniswapV3FactoryABI.json";

const USDC_ADDRESS = "0x51fCe89b9f6D4c530698f181167043e1bB4abf89";
const WETH_ADDRESS = "0xfff9976782d46cc05630d1f6ebab18b2324d6b14";
const FACTORY_ADDRESS = "0x1F98431c8aD98523631AE4a59f267346ea31F984";
const FEE = 3000; // 0.3%

const USDC_DECIMALS = 6;
const WETH_DECIMALS = 18;

export async function executeSwapETHToUSDC(amountInEth, wallet, provider) {
  const signer = wallet.connect(provider);

  const factory = new ethers.Contract(FACTORY_ADDRESS, UniswapV3FactoryABI, provider);
  const poolAddress = await factory.getPool(WETH_ADDRESS, USDC_ADDRESS, FEE);

  if (poolAddress === ethers.constants.AddressZero) {
    throw new Error("No pool found for ETH/USDC");
  }

  const poolContract = new ethers.Contract(poolAddress, IUniswapV3PoolABI, provider);
  const slot0 = await poolContract.slot0();
  const { liquidity } = await poolContract;

  const tokenA = new Token(11155111, WETH_ADDRESS, WETH_DECIMALS, "WETH", "Wrapped Ether");
  const tokenB = new Token(11155111, USDC_ADDRESS, USDC_DECIMALS, "USDC", "USD Coin");

  const pool = new Pool(
    tokenA,
    tokenB,
    FEE,
    slot0.sqrtPriceX96.toString(),
    liquidity.toString(),
    slot0.tick
  );

  const route = new Route([pool], Ether.onChain(11155111), tokenB);

  const amountIn = ethers.utils.parseEther(amountInEth);
  const trade = Trade.exactIn(
    route,
    CurrencyAmount.fromRawAmount(Ether.onChain(11155111), amountIn.toString())
  );

  const options = {
    slippageTolerance: new Percent(50, 10_000), // 0.50%
    deadline: Math.floor(Date.now() / 1000) + 60 * 10,
    recipient: await wallet.getAddress(),
  };

  const methodParameters = SwapRouter.swapCallParameters([trade], options);

  const tx = {
    to: SwapRouter.ADDRESS,
    data: methodParameters.calldata,
    value: methodParameters.value,
    from: await wallet.getAddress(),
    gasLimit: ethers.utils.hexlify(300000),
  };

  const txResponse = await signer.sendTransaction(tx);
  return txResponse;
}
