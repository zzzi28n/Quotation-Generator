import React, { useState } from "react";
import { generateWordQuotation } from "./utils/wordExporter";

export default function App() {
  const [client, setClient] = useState("");
  const [date, setDate] = useState("");
  const [re, setRe] = useState("");
  const [remark, setRemark] = useState("");
  const [usage, setUsage] = useState("");
  const [items, setItems] = useState([{ item: "", material: "", weight: "", count: "", dimension: "", price: "", image: null }]);
  const [toolingOptions, setToolingOptions] = useState([]);
  const [customTooling, setCustomTooling] = useState({ name: "", price: "" });
  const [additionalRemark, setAdditionalRemark] = useState("");

  const toolingChoices = [
    "Prototype Cavity",
    "PFM Only",
    "PFM + MM",
    "PFM + PP + MM (Flat surface vent)",
    "PFM + PP + MM (Side vent)",
    "PFM + PP + PP + MM",
    "Changeable Insert"
  ];

  const updateItem = (index, key, value) => {
    const list = [...items];
    list[index][key] = value;
    setItems(list);
  };

  const handleImage = (index, file) => {
    const list = [...items];
    list[index].image = file;
    setItems(list);
  };

  const addItem = () => {
    setItems([...items, { item: "", material: "", weight: "", count: "", dimension: "", price: "", image: null }]);
  };

  return (
    <div className="p-4 max-w-6xl mx-auto text-sm font-sans">
      <h1 className="text-2xl font-bold mb-4">Quotation Generator</h1>
      <div className="grid grid-cols-2 gap-4">
        <input placeholder="Client" value={client} onChange={e => setClient(e.target.value)} />
        <input placeholder="Quotation Date" value={date} onChange={e => setDate(e.target.value)} />
        <input placeholder="RE:" value={re} onChange={e => setRe(e.target.value)} />
        <input placeholder="Remark" value={remark} onChange={e => setRemark(e.target.value)} />
      </div>

      <div className="mt-6">
        <h2 className="font-semibold">Items</h2>
        {items.map((item, i) => (
          <div key={i} className="border p-2 my-2 grid grid-cols-3 gap-2">
            <input placeholder="Item" value={item.item} onChange={e => updateItem(i, "item", e.target.value)} />
            <input placeholder="Material" value={item.material} onChange={e => updateItem(i, "material", e.target.value)} />
            <input placeholder="Avg. Weight (g)" value={item.weight} onChange={e => updateItem(i, "weight", e.target.value)} />
            <input placeholder="Case Count (pcs)" value={item.count} onChange={e => updateItem(i, "count", e.target.value)} />
            <input placeholder="Case Dimension (mm)" value={item.dimension} onChange={e => updateItem(i, "dimension", e.target.value)} />
            <input placeholder="FOB Box Price (USD)" value={item.price} onChange={e => updateItem(i, "price", e.target.value)} />
            <input type="file" onChange={e => handleImage(i, e.target.files[0])} />
          </div>
        ))}
        <button onClick={addItem} className="mt-2">Add Item</button>
      </div>

      <div className="mt-6">
        <h2 className="font-semibold">Tooling Fee (select if needed)</h2>
        {toolingChoices.map(opt => (
          <label key={opt} className="block">
            <input
              type="checkbox"
              value={opt}
              checked={toolingOptions.includes(opt)}
              onChange={e => {
                const checked = e.target.checked;
                setToolingOptions(prev => checked ? [...prev, opt] : prev.filter(o => o !== opt));
              }}
            />
            {opt}
          </label>
        ))}
        <div className="grid grid-cols-2 gap-2 mt-2">
          <input placeholder="Custom Tooling Name" value={customTooling.name} onChange={e => setCustomTooling({ ...customTooling, name: e.target.value })} />
          <input placeholder="Custom Tooling Price" value={customTooling.price} onChange={e => setCustomTooling({ ...customTooling, price: e.target.value })} />
        </div>
      </div>

      <div className="mt-6">
        <h2 className="font-semibold">Remarks</h2>
        <input placeholder="Annual usage (for remark)" value={usage} onChange={e => setUsage(e.target.value)} className="mb-2" />
        <textarea placeholder="Additional remark (will show at bottom)" value={additionalRemark} onChange={e => setAdditionalRemark(e.target.value)} className="w-full h-20" />
      </div>

      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white"
        onClick={() =>
          generateWordQuotation({
            client, date, re, remark, items,
            toolingOptions, customTooling, usage, additionalRemark
          })
        }
      >
        Generate Word Quotation
      </button>
    </div>
  );
}