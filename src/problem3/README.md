Hi ~~

There are two file

- (old.tsx => the old version and list all of anti-patterns and computational inefficiencies)
- (new.tsx => my approach - improve the quality of code , refactor code.)

<!-- ==================================================================================-->

- All of problems and anti-patterns that i found in problem:

1. Unnecessary variables have been declared but not being utilized

2. Inconsistent variable naming: found that in sort function -> (lhs and rhs) with (leftPriority and rightPriority)

3. useMemo => Anti pattern (Premature Optimization)

- the prices in useMemo dependencies is redundant.

4. Using any type => i think it should be string

5. The function filter and sort (should improve)

=> After look carefully , i found that some code line is redundant because it not being utilized
In the filter function => you get balancePriority = getPriority(balance.blockchain) but used
lhsPriority to check condition , it made me confused a lot.

I've commented in the old file -> please check it and give me feedback if you have.

Your feedback will help me a lot because there also the way to improve myself!

Thank you so muchhh!
