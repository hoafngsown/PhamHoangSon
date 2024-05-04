import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Button } from "../form/button";
import Input from "../form/input";
import { Label } from "../form/label";
import Select, { Option } from "../form/select";

interface IFormCurrency {
  amount: string;
  fromCurrency: string;
  toCurrency: string;
}

interface IResult {
  amount: string;
  fromCurrency: {
    currency: string;
    icon: string;
  };
  toCurrency: {
    currency: string;
    icon: string;
  };
  result: string;
}

interface ICurrencyOption {
  currency: string;
  date: string;
  id: string;
  price: number;
}

const DEFAULT_VALUES: IFormCurrency = {
  amount: "",
  fromCurrency: "",
  toCurrency: "",
};

const BASE_URL = "http://localhost:3030";

const schema = yup.object().shape({
  amount: yup
    .string()
    .required("Please enter amount to convert!")
    .matches(/^[0-9]*$/, "Please enter valid amount!"),
  fromCurrency: yup.string().required("Please enter currency to convert!"),
  toCurrency: yup.string().required("Please enter currency to convert!"),
});

export default function FancyForm() {
  const [currencyOptions, setCurrencyOptions] = useState<Option[]>([]);

  const [convertedPrice, setConvertedPrice] = useState<IResult | null>(null);

  const form = useForm({
    defaultValues: DEFAULT_VALUES,
    resolver: yupResolver(schema),
  });

  const wAmount = form.watch("amount");
  const wFromCurrency = form.watch("fromCurrency");
  const wToCurrency = form.watch("toCurrency");

  const onSubmit = (data: IFormCurrency) => {
    const fromCurrency = JSON.parse(data.fromCurrency);
    const toCurrency = JSON.parse(data.toCurrency);

    const result = getConvertedPrice(
      data.amount,
      fromCurrency.price,
      toCurrency.price
    );

    setConvertedPrice({
      amount: data.amount,
      result: result.toString(),
      fromCurrency: {
        currency: fromCurrency.currency,
        icon: getCurrencyImage(data.fromCurrency),
      },
      toCurrency: {
        currency: toCurrency.currency,
        icon: getCurrencyImage(data.toCurrency),
      },
    });
  };

  const fetchCurrencyOptions = async () => {
    try {
      const response = await fetch(`${BASE_URL}/currency`, {
        method: "GET",
      }).then((res) => res.json());

      const formattedCurrencyOptions = response.map(
        (item: ICurrencyOption) => ({
          label: item.currency,
          value: JSON.stringify({
            price: item.price,
            currency: item.currency,
          }),
        })
      );

      setCurrencyOptions(formattedCurrencyOptions);

      form.setValue("fromCurrency", formattedCurrencyOptions[0].value);
      form.setValue("toCurrency", formattedCurrencyOptions[0].value);
    } catch (error) {
      console.log({ error });
    }
  };

  const getCurrencyImage = (currencyValue: string) => {
    try {
      const value = JSON.parse(currencyValue);
      return `/tokens/${value.currency}.svg`;
    } catch (error) {
      console.log(error);
      return "";
    }
  };

  const getConvertedPrice = (
    amount: string,
    fromPrice: string,
    toPrice: string
  ) => {
    const exchangeRate = Number(fromPrice) / Number(toPrice);
    return exchangeRate * Number(amount);
  };

  useEffect(() => {
    fetchCurrencyOptions();
  }, []);

  return (
    <div className="w-[800px] bg-white rounded-[10px] px-10 py-6 shadow">
      <h4 className="text-xl text-center font-bold bg-gradient-to-tl from-[#ffd342] to-[#ED2409] bg-clip-text text-transparent">
        Convert Currency
      </h4>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-y-6">
          <div className="gap-y-1">
            <Label title="Amount" />
            <Input
              register={form.register}
              name="amount"
              placeholder="Enter your amount to convert..."
              errorMessage={form.formState.errors.amount?.message}
              isError={!!form.formState.errors.amount?.message}
            />
          </div>

          <div className="flex items-stretch gap-x-6">
            <div className="gap-y-1 flex-1">
              <Label title="From Currency" />
              <div className="flex items-center gap-x-1">
                <Select
                  options={currencyOptions}
                  name="fromCurrency"
                  classNameWrapper="flex-1"
                  register={form.register}
                  errorMessage={form.formState.errors.fromCurrency?.message}
                  setValue={form.setValue}
                />
                <img
                  className="h-7 w-7"
                  src={getCurrencyImage(wFromCurrency)}
                  alt="currency-icon"
                />
              </div>
            </div>
            <div className="gap-y-1 flex-1">
              <Label title="To Currency" />
              <div className="flex items-center gap-x-1">
                <Select
                  options={currencyOptions}
                  name="toCurrency"
                  classNameWrapper="flex-1"
                  register={form.register}
                  errorMessage={form.formState.errors.toCurrency?.message}
                  setValue={form.setValue}
                />
                <img
                  className="h-7 w-7"
                  src={getCurrencyImage(wToCurrency)}
                  alt="currency-icon"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <Button className="w-[100px]">Convert</Button>
          </div>
        </div>

        {convertedPrice && (
          <div className="mt-10 flex items-center justify-center flex-col">
            <p>Converted Amount: </p>
            <div className="flex items-center gap-x-4">
              <span>
                {convertedPrice.amount} {convertedPrice.fromCurrency.currency}
              </span>
              <img
                className="h-7 w-7"
                src={convertedPrice.fromCurrency.icon}
                alt="currency-icon"
              />
              <span>=</span>
              <span>
                {convertedPrice.result} {convertedPrice.toCurrency.currency}
              </span>
              <img
                className="h-7 w-7"
                src={convertedPrice.toCurrency.icon}
                alt="currency-icon"
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
