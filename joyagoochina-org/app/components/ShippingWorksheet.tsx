"use client";

import { useState } from "react";
import type english from "../seoRefresh.en.json";

type Copy = typeof english.calculator;
const initial = { weight: "4", length: "40", width: "30", height: "25", divisor: "5000", rounding: "0.5", freight: "", extras: "" };

export default function ShippingWorksheet({ copy, locale }: { copy: Copy; locale: string }) {
  const [values, setValues] = useState(initial);
  const [rule, setRule] = useState("greater");
  const numbers = Object.fromEntries(Object.entries(values).map(([key, value]) => [key, Number(value)]));
  const positive = ["weight", "length", "width", "height", "divisor", "rounding"];
  const valid = positive.every((key) => Number.isFinite(numbers[key]) && numbers[key] > 0) &&
    ["freight", "extras"].every((key) => Number.isFinite(numbers[key]) && numbers[key] >= 0);
  const volume = numbers.length * numbers.width * numbers.height / numbers.divisor;
  const baseWeight = rule === "actual" ? numbers.weight : Math.max(numbers.weight, volume);
  const billable = Math.ceil(Number((baseWeight / numbers.rounding).toPrecision(12))) * numbers.rounding;
  const safe = valid && Number.isFinite(volume) && Number.isFinite(billable);
  const quotePresent = values.freight.trim() !== "";
  const format = (value: number) => value.toLocaleString(locale, { maximumFractionDigits: 3 });

  return (
    <section className="shipping-worksheet" aria-labelledby="worksheet-title">
      <h2 id="worksheet-title">{copy.title}</h2>
      <p>{copy.intro}</p>
      <div className="worksheet-fields">
        {(Object.keys(initial) as Array<keyof typeof initial>).map((key) => (
          <label key={key}>
            <span>{copy[key]}</span>
            <input type="number" inputMode="decimal" min={positive.includes(key) ? "0.001" : "0"} step="any"
              value={values[key]} onChange={(event) => setValues({ ...values, [key]: event.target.value })} />
          </label>
        ))}
        <label className="worksheet-rule"><span>{copy.rule}</span>
          <select value={rule} onChange={(event) => setRule(event.target.value)}>
            <option value="greater">{copy.greater}</option>
            <option value="actual">{copy.actual}</option>
          </select>
        </label>
      </div>
      <div className="worksheet-results" aria-live="polite" aria-atomic="true">
        {!safe ? <p role="status">{copy.invalid}</p> : <>
          <p><span>{copy.volumetric}</span><strong>{format(volume)} {copy.kg}</strong></p>
          <p><span>{copy.billable}</span><strong>{format(billable)} {copy.kg}</strong></p>
          <p><span>{copy.total}</span><strong>{quotePresent ? `$${(numbers.freight + numbers.extras).toFixed(2)}` : copy.pending}</strong></p>
        </>}
      </div>
      <p className="worksheet-note">{copy.note} {copy.recheck}</p>
    </section>
  );
}
