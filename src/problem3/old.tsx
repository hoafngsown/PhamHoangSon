interface WalletBalance {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {}
const WalletPage: React.FC<Props> = (props: Props) => {
  // 0. That 'children' variables are declared but not used.
  const { children, ...rest } = props;

  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: any): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  // 1. useMemo right there => Anti pattern (Premature Optimization )
  const sortedBalances = useMemo(() => {
    return (
      balances
        .filter((balance: WalletBalance) => {
          // Is there something wrong with balancePriority and lhsPriority ?
          // Because i found that balancePriority has been declared but not used, instead we used lhsPriority (not declared)
          const balancePriority = getPriority(balance.blockchain);

          // 2. We can streamline this code
          if (lhsPriority > -99) {
            if (balance.amount <= 0) {
              return true;
            }
          }
          return false;
        })

        // 3. Reduce code sort function.
        .sort((lhs: WalletBalance, rhs: WalletBalance) => {
          const leftPriority = getPriority(lhs.blockchain);
          const rightPriority = getPriority(rhs.blockchain);
          if (leftPriority > rightPriority) {
            return -1;
          } else if (rightPriority > leftPriority) {
            return 1;
          }
        })
    );
    // 4. The variable 'prices' used in this useMemo dependencies is unnecessary
  }, [balances, prices]);

  // 5. This code seems redundant as it is not being utilized
  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
    };
  });

  // 6. For me, there's nothing wrong with this code snippet, but we could move it into the return UI statement
  // to avoid confusion with other logic-handling sections.

  const rows = sortedBalances.map(
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
  );

  return <div {...rest}>{rows}</div>;
};
