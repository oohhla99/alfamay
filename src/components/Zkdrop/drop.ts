import { ethers } from 'ethers';
import * as zksync from 'zksync-web3';
import { MUTE_ABI } from '../../abis/mute';
import { ERC20_ABI } from '../../abis/erc20';
import Web3 from 'web3';

const TOKENS_L2_LIST = {
  WETH: '0x5aea5775959fbc2557cc8789bc1bf90a239d9a91',
  USDC: '0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4',
};

const MUTE_ROUTER = '0x8B791913eB07C32779a16750e3868aA8495F5964';
const ZKERA_MAINNET = 'https://mainnet.era.zksync.io';

const N_MUTESWAPS = 5;

const BRIDGE_BUFFER = ethers.utils.parseEther('0.015');
// This is just consumed once (~.002) when setting the approval limit to 2^256
// After that, 25% of it is consumed every time we deposit stuff in the LP
const GAS_BUFFER = ethers.utils.parseEther('0.015');

const WITHDRAW_BUFFER = ethers.utils.parseEther('0.0020');

export function zkWallet(ethProvider: ethers.providers.Web3Provider) {
  const zkSyncProvider = new zksync.Provider(ZKERA_MAINNET);
  const l1signer = zksync.L1Signer.from(
    ethProvider.getSigner(),
    zkSyncProvider
  );
  const l2signer = new zksync.Web3Provider(window.ethereum).getSigner();

  return { l1signer, l2signer };
}

export async function depositZkSync(
  l1signer: zksync.L1Signer,
  l2signer: zksync.Signer,
  provider: ethers.providers.Web3Provider,
  amount: ethers.BigNumber
) {
  await switchNetwork('ethereum', provider);

  const deposit = await l1signer.deposit({
    token: zksync.utils.ETH_ADDRESS,
    amount: amount,
  });

  console.log('L1 deposit');
  const ethererumTxReceipt = await deposit.waitL1Commit();
  console.log(ethererumTxReceipt);

  console.log('L2 deposit');
  const depositReceipt = await deposit.wait();
  console.log(depositReceipt);

  await switchNetwork('zksync', provider);
  return await l2signer.getBalance();
}

export async function withdrawZkSync(
  l2signer: zksync.Signer,
  provider: ethers.providers.Web3Provider
) {
  await switchNetwork('zksync', provider);
  const ethBal = await l2signer.getBalance(zksync.utils.ETH_ADDRESS);
  const toWithdraw = ethBal.sub(WITHDRAW_BUFFER);

  console.log(`Withdrawing ${toWithdraw} from ${ethBal} ETH`);

  if (toWithdraw.lte(0)) {
    throw Error(
      `ETH balance ${ethBal} doesn't have enough buffer ${WITHDRAW_BUFFER}`
    );
  }

  const signer = new zksync.Web3Provider(window.ethereum).getSigner();

  const withdrawTxn = await signer.withdraw({
    token: zksync.utils.ETH_ADDRESS,
    amount: toWithdraw,
  });

  console.log('Awaiting txn receipt');

  const txnReceipt = await withdrawTxn.wait();

  console.log(txnReceipt);
}

export async function usdcToEth(
  l2signer: zksync.Signer,
  provider: ethers.providers.Web3Provider
) {
  await switchNetwork('zksync', provider);
  const amount = await l2signer.getBalance(TOKENS_L2_LIST.USDC.toLowerCase());

  // 1 USDC
  if (amount.lte(10 ** 6)) {
    console.log(`Amount ${amount} too low, not converting`);
    return;
  }

  console.log(`Converting ${amount} USDC to ETH`);

  const muteContract = new zksync.Contract(MUTE_ROUTER, MUTE_ABI, l2signer);

  const toTokenAddress = TOKENS_L2_LIST.WETH.toLowerCase();
  const fromTokenAddress = TOKENS_L2_LIST.USDC.toLowerCase();

  const amountOutMin = 0;
  const path = [fromTokenAddress, toTokenAddress];
  const address = l2signer.getAddress();

  // 20 minutes from the current Unix time
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20;

  // XXX wtf does this do?
  const stable = [true, true];

  const txn = await muteContract.swapExactTokensForETH(
    amount, // amountIn
    amountOutMin,
    path,
    address,
    deadline,
    stable
  );

  console.log(await txn.wait());
}

export async function muteSwap(
  l2signer: zksync.Signer,
  provider: ethers.providers.Web3Provider,
  amount: ethers.BigNumber
) {
  await switchNetwork('zksync', provider);
  const muteContract = new zksync.Contract(MUTE_ROUTER, MUTE_ABI, l2signer);

  const fromTokenAddress = TOKENS_L2_LIST.WETH.toLowerCase();
  const toTokenAddress = TOKENS_L2_LIST.USDC.toLowerCase();

  const amountOutMin = 0;
  const path = [fromTokenAddress, toTokenAddress];
  const address = l2signer.getAddress();

  // 20 minutes from the current Unix time
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20;

  // XXX wtf does this do?
  const stable = [true, true];

  const amountPerSwap = amount.sub(GAS_BUFFER).div(N_MUTESWAPS);

  if (amountPerSwap.lte(0)) {
    throw Error(`Balance ${amount} not enough to cover ${GAS_BUFFER}!`);
  }

  for (let i = 0; i < N_MUTESWAPS; i++) {
    console.log(`Swap ${i}, Amount ${amountPerSwap}`);

    const txn =
      await muteContract.swapExactETHForTokensSupportingFeeOnTransferTokens(
        amountOutMin,
        path,
        address,
        deadline,
        stable,
        { value: amountPerSwap.toString() }
      );

    console.log(await txn.wait());
  }
}

export async function approveERC20(
  tokenAddress: string,
  operator: string,
  wallet: zksync.Signer
) {
  const value = ethers.BigNumber.from(2).pow(256).sub(1);

  const contract = new zksync.Contract(tokenAddress, ERC20_ABI, wallet);

  const allowance = await contract.allowance(wallet.getAddress(), operator);

  // Just divide 2^256 by 2 to check whether allowance is enough
  // since allowance would drop by a small amount on every transaction
  // This obviously breaks if we transfer more than ((2 ^ 256) / 2) tokens
  // but that's impossible
  if (value.div(2).lte(allowance)) {
    console.log(`Allowance ${allowance} enough, not setting approval`);
    return;
  }

  console.log(
    `Setting approval for ${operator} to ${value} (existing ${allowance})`
  );

  const approveTx = await contract.approve(operator, value);
  const receipt = await approveTx.wait();

  return receipt;
}

export async function depositMuteLP(
  l2signer: zksync.Signer,
  provider: ethers.providers.Web3Provider
) {
  await switchNetwork('zksync', provider);
  const muteContract = new zksync.Contract(MUTE_ROUTER, MUTE_ABI, l2signer);

  const ethBal = await l2signer.getBalance();
  const usdcBal = await l2signer.getBalance(TOKENS_L2_LIST.USDC.toLowerCase());

  // 5%
  const toDepositInLP = usdcBal.mul(5).div(100);
  // 25% of the leftover fees
  const amountETHDesired = ethBal.mul(25).div(100);

  console.log(
    `Depositing ${toDepositInLP} from ${usdcBal} USDC & ${amountETHDesired} ETH from ${ethBal} in LP`
  );

  const token = TOKENS_L2_LIST.USDC.toLowerCase();

  // TODO should we set this?
  const amountTokenMin = 0;
  const amountETHMin = 0;

  const amountTokenDesired = toDepositInLP;

  const to = l2signer.getAddress();

  // 20 minutes from the current Unix time
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20;

  const feeType = 0;
  const stable = true;

  const pairAddr = await muteContract.pairFor(
    TOKENS_L2_LIST.WETH.toLowerCase(),
    TOKENS_L2_LIST.USDC.toLowerCase(),
    stable
  );

  console.log(pairAddr);

  console.log('Approval');

  const routerApprovalReceipt = await approveERC20(
    token,
    MUTE_ROUTER.toLowerCase(),
    l2signer
  );

  console.log(routerApprovalReceipt);

  const approvalReceipt = await approveERC20(token, pairAddr, l2signer);

  console.log(approvalReceipt);

  console.log('Adding liquidity');

  const txn = await muteContract.addLiquidityETH(
    token,
    amountTokenDesired,
    amountTokenMin,
    amountETHMin,
    to,
    deadline,
    feeType,
    stable,
    { value: amountETHDesired }
  );

  console.log(txn);

  const receipt = await txn.wait();

  console.log(receipt);
}

export function hasBalanceToBridge(
  balance: ethers.BigNumber,
  amount: ethers.BigNumber
) {
  const afterBridgeBuffer = balance.sub(BRIDGE_BUFFER);
  const afterAmount = afterBridgeBuffer.sub(amount);
  const amountCanCoverBuffer = amount.sub(GAS_BUFFER).gt(0);

  return afterAmount.gt(0) && amountCanCoverBuffer;
}

export async function bridgeSwap(
  notifyOuter: (s: string) => void,
  skipBridge: boolean = false
) {
  const notify = (s: string) => {
    console.log(s);
    notifyOuter(s);
  };

  const web3 = new Web3();
  const parse = (val: ethers.BigNumber) =>
    parseFloat(web3.utils.fromWei(val.toString())).toFixed(5);

  const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
  await provider.send('eth_requestAccounts', []);
  await switchNetwork('ethereum', provider);

  const balance = await provider.getBalance(
    await provider.getSigner().getAddress()
  );
  const amount = balance.sub(
    BRIDGE_BUFFER.add(ethers.utils.parseEther('0.001'))
  );

  await switchNetwork('zksync', provider);
  const zkBal = await provider.getBalance(
    await provider.getSigner().getAddress()
  );

  const USDCContractZk = new ethers.Contract(
    TOKENS_L2_LIST.USDC.toLowerCase(),
    ERC20_ABI
  );
  const zkUsdc = await USDCContractZk.connect(provider).balanceOf(
    await provider.getSigner().getAddress()
  );
  console.log(`Balance ${balance}, Amount ${amount}`);

  const buffer = BRIDGE_BUFFER.add(GAS_BUFFER);

  if (!skipBridge && !hasBalanceToBridge(balance, amount)) {
    const e = `Balance ${parse(balance)} doesn't have enough buffer ${parse(
      buffer
    )} to transfer ${parse(amount)}`;
    notify(e);

    return;
  }

  notify(
    `L1 ETH: ${parse(balance)}, L2 ETH: ${parse(zkBal)}, L2 USDC: ${
      parseFloat(zkUsdc.toString()) / 10 ** 6
    }`
  );

  if (!skipBridge) {
    if (amount.lte(buffer)) {
      const e = `Amount ${parse(amount)} is less than buffer ${parse(buffer)}`;
      notify(e);

      return;
    }

    console.log(`Depositing ${amount} to zkSync`);
  }

  const { l1signer, l2signer } = zkWallet(provider);

  const remainingAmount = skipBridge
    ? zkBal
    : await depositZkSync(l1signer, l2signer, provider, amount);

  notify(
    `zkSync balance ${parse(
      remainingAmount
    )}; performing ${N_MUTESWAPS} swaps on mute...`
  );

  console.log(`Amount in zkSync after gas ${remainingAmount}`);

  notify('Sleeping for 2 minutes to wait for zkSync to process the tx...');
  await new Promise((resolve) => setTimeout(resolve, 120000));

  await muteSwap(l2signer, provider, remainingAmount);

  notify('Depositing amount into USDC-ETH LP');

  await depositMuteLP(l2signer, provider);

  notify('Converting swapped USDC back to ETH');

  await usdcToEth(l2signer, provider);

  notify('Withdrawing from zkSync to L1');

  await withdrawZkSync(l2signer, provider);
}

const switchNetwork = async (
  chain: string,
  provider: ethers.providers.Web3Provider
) => {
  if (chain === 'zksync') {
    await provider.send('wallet_switchEthereumChain', [
      {
        chainId: '0x144',
      },
    ]);
  } else {
    await provider.send('wallet_switchEthereumChain', [
      {
        chainId: '0x1',
      },
    ]);
  }
};
