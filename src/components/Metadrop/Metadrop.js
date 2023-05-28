import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BigNumber, ethers, utils } from 'ethers';
import { Chain, Hop } from '@hop-protocol/sdk';

import erc20_abi from '../../abis/erc20.json';
import swap0x_abi from '../../abis/swap0x.json';

import './Metadrop.css';

const Metadrop = (props) => {
  const initialSwapAmount = utils.parseEther('0.005');

  const eth0xApi = 'https://api.0x.org/swap/v1/quote?';
  const arb0xApi = 'https://arbitrum.api.0x.org/swap/v1/quote?';
  const opt0xApi = 'https://optimism.api.0x.org/swap/v1/quote?';

  const ethSwap0xAddress = '0x5724b5bc7f54a52f4014e5f496ae380f89c881a1';
  const arbSwap0xAddress = '0x2fe6592b2efca795281129144152925284d6d914';
  const optSwap0xAddress = '0x2fe6592b2efca795281129144152925284d6d914';

  const zeroXNativeToken = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';

  const [running, setRunning] = useState(false);
  const [status, setStatus] = useState('Collect');

  const swapQuote = async (baseApi, sellAmount, token1, token2) => {
    return await (
      await fetch(
        baseApi +
          `buyToken=${token2}&sellToken=${token1}&sellAmount=${sellAmount}&slippagePercentage=0.05`
      )
    ).json();
  };

  const performSwaps = async (
    baseApi,
    swap0xAddress,
    tokens,
    chainIdentifier
  ) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
    const { chainId } = await provider.getNetwork();
    if (chainId !== chainIdentifier) {
      await provider.send('wallet_switchEthereumChain', [
        {
          chainId: chainIdentifier.toString(16),
        },
      ]);
    }
    const signer = provider.getSigner();

    const Swap0xContract = new ethers.Contract(
      swap0xAddress,
      swap0x_abi.abi,
      signer
    );

    const multicallData = [];
    const sellTokenApprovalDone = {};

    let messageValue = BigNumber.from(0);
    let sellAmount = initialSwapAmount;
    for (let i = 0; i < tokens.length - 1; i++) {
      const token1 = tokens[i];
      const token2 = tokens[i + 1];

      if (token1 !== 'ETH' && !sellTokenApprovalDone[token1]) {
        const erc20Contract = new ethers.Contract(
          token1,
          erc20_abi.abi,
          signer
        );

        const allowance = await erc20Contract.allowance(
          await signer.getAddress(),
          Swap0xContract.address
        );

        if (allowance.lt(sellAmount.mul(5))) {
          const approvalTx = await erc20Contract
            .connect(signer)
            .approve(Swap0xContract.address, ethers.constants.MaxUint256);
          await approvalTx.wait();
          sellTokenApprovalDone[token1] = true;
        }
      }

      if (token1 === 'ETH') {
        messageValue = messageValue.add(sellAmount);
      }

      const quote = await swapQuote(
        baseApi,
        sellAmount.toString(),
        token1,
        token2
      );
      sellAmount = BigNumber.from(quote.buyAmount).mul(95).div(100);

      multicallData.push(
        await Swap0xContract.populateTransaction.swap(
          quote.sellTokenAddress === zeroXNativeToken
            ? ethers.constants.AddressZero
            : quote.sellTokenAddress,
          quote.buyTokenAddress === zeroXNativeToken
            ? ethers.constants.AddressZero
            : quote.buyTokenAddress,
          quote.sellAmount,
          quote.allowanceTarget,
          quote.to,
          quote.data,
          {
            value: quote.value,
          }
        )
      );
    }

    const multicallParams = {
      value: messageValue,
    };

    if (chainId == '0xa') {
      multicallParams['gasLimit'] = 3500000;
    } else {
      const estimatedGas = await Swap0xContract.estimateGas.multicall(
        multicallData.map((x) => x.data),
        multicallParams
      );
      multicallParams['gasLimit'] = estimatedGas.mul(150).div(100);
    }

    const swapTx = await Swap0xContract.multicall(
      multicallData.map((x) => x.data),
      multicallParams
    );
    await swapTx.wait();
  };

  const moveEthToArbitrum = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
    const { chainId } = await provider.getNetwork();
    if (chainId !== 1) {
      await provider.send('wallet_switchEthereumChain', [
        {
          chainId: '0x1',
        },
      ]);
    }
    const signer = provider.getSigner();
    const hop = new Hop('mainnet', signer);
    const bridge = hop.bridge('ETH');

    const bridgeTx = await bridge.send(
      utils.parseEther('0.045'),
      Chain.Ethereum,
      Chain.Arbitrum
    );
    await bridgeTx.wait();

    let bridgeStatus = await bridge.getTransferStatus(bridgeTx.hash);
    while (bridgeStatus === null || !bridgeStatus.bonded) {
      await new Promise((resolve) => setTimeout(resolve, 60000));
      bridgeStatus = await bridge.getTransferStatus(bridgeTx.hash);
    }

    setStatus('Sleeping for 2.5 minutes');
    await new Promise((resolve) => setTimeout(resolve, 150000));
  };

  const moveArbEthToOptimism = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
    const { chainId } = await provider.getNetwork();
    if (chainId !== 42161) {
      await provider.send('wallet_switchEthereumChain', [
        {
          chainId: '0xa4b1',
        },
      ]);
    }
    const signer = provider.getSigner();
    const hop = new Hop('mainnet', signer);
    const bridge = hop.bridge('ETH');

    const bridgeTx = await bridge.send(
      utils.parseEther('0.025'),
      Chain.Arbitrum,
      Chain.Optimism
    );
    await bridgeTx.wait();

    let bridgeStatus = await bridge.getTransferStatus(bridgeTx.hash);
    while (bridgeStatus === null || !bridgeStatus.bonded) {
      await new Promise((resolve) => setTimeout(resolve, 30000));
      bridgeStatus = await bridge.getTransferStatus(bridgeTx.hash);
    }

    setStatus('Sleeping for 2.5 minutes');
    await new Promise((resolve) => setTimeout(resolve, 150000));
  };

  const metadrop = async () => {
    try {
      setStatus('Performing swaps on Ethereum...');
      await performSwaps(
        eth0xApi,
        ethSwap0xAddress,
        [
          'ETH',
          '0x6B175474E89094C44Da98b954EedeAC495271d0F',
          '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          'ETH',
        ],
        '0x1'
      );

      setStatus('Bridge ETH to Arbitrum...');
      await moveEthToArbitrum();

      setStatus('Performing swaps on Arbitrum...');
      await performSwaps(
        arb0xApi,
        arbSwap0xAddress,
        [
          'ETH',
          '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
          '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
          'ETH',
        ],
        '0xa4b1'
      );

      setStatus('Bridge ETH to Optimism...');
      await moveArbEthToOptimism();

      setStatus('Performing swaps on Optimism...');
      await performSwaps(
        opt0xApi,
        optSwap0xAddress,
        [
          'ETH',
          '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
          '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',
          'ETH',
        ],
        '0xa'
      );

      setStatus('Finished');
    } catch (error) {
      setStatus('Error encountered');
      console.log(error);
    }
    setRunning(false);
  };

  return (
    <div className={`component1-container ${props.rootClassName} `}>
      <button
        onClick={() => {
          if (running === false) {
            setRunning(true);
            metadrop();
          } else {
            alert('Cannot run multiple times');
          }
        }}
        className="component1-button themebutton button"
      >
        <div className="component1-button-wrapper">
          {running && <div className="component1-button-loader"></div>}
          <div>{status}</div>
        </div>
      </button>
    </div>
  );
};

Metadrop.defaultProps = {
  rootClassName: '',
};

Metadrop.propTypes = {
  rootClassName: PropTypes.string,
};

export default Metadrop;
