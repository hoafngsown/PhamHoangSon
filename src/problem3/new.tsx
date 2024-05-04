interface WalletBalance {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

const BLOCKCHAIN_PRIORITY = {
  OSMOSIS: "Osmosis",
  ETHEREUM: "Ethereum",
  ARBITRUM: "Arbitrum",
  ZILLIQA: "Zilliqa",
  NEO: "Neo",
};

interface Props extends BoxProps {}
const WalletPage: React.FC<Props> = (props: Props) => {
  const { ...rest } = props;

  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: string): number => {
    switch (blockchain) {
      case BLOCKCHAIN_PRIORITY.OSMOSIS:
        return 100;
      case BLOCKCHAIN_PRIORITY.ETHEREUM:
        return 50;
      case BLOCKCHAIN_PRIORITY.ARBITRUM:
        return 30;
      case BLOCKCHAIN_PRIORITY.ZILLIQA:
        return 20;
      case BLOCKCHAIN_PRIORITY.NEO:
        return 20;
      default:
        return -99;
    }
  };

  const getSortedBalances = (balancesData: WalletBalance[]) => {
    return balancesData
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        if (balancePriority > -99 && balance.amount <= 0) return true;
        return false;
      })
      .sort(
        (leftPriority: WalletBalance, rightPriority: WalletBalance) =>
          getPriority(leftPriority.blockchain) -
          getPriority(rightPriority.blockchain)
      );
  };

  return (
    <div {...rest}>
      {getSortedBalances(balances).map(
        (balance: FormattedWalletBalance, index: number) => {
          const usdValue = prices[balance.currency] * balance.amount;
          return (
            <WalletRow
              className={classes.row}
              key={index}
              amount={balance.amount}
              usdValue={usdValue}
              formattedAmount={balance.formatted}
            />
          );
        }
      )}
    </div>
  );
};
