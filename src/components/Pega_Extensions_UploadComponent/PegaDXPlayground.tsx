import React, { useState } from "react";
import ReactJson from "react-json-view";

const PegaDXPlayground = () => {
  const [funcPath, setFuncPath] = useState("getDataApiUtils().getData");
  const [args, setArgs] = useState("[]"); // JSON array of arguments
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  // Helper: dynamically resolve "PCore.getDataApiUtils().getData"
  const resolveFunction = (path) => {
    // Split by dot while keeping () calls
    const parts = path.split(".");
    let obj = PCore;

    for (let part of parts) {
      if (part.endsWith("()")) {
        const fn = part.replace("()", "");
        obj = obj[fn]();
      } else {
        obj = obj[part];
      }
    }

    if (typeof obj !== "function") {
      throw new Error("Path does not resolve to a function");
    }
    return obj;
  };

  const handleRun = async () => {
    setError(null);
    setResponse(null);

    try {
      const fn = resolveFunction(funcPath);
      const parsedArgs = args.trim() ? JSON.parse(args) : [];
      const result = await fn(...parsedArgs);

      setResponse(result);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-lg font-bold mb-2">Pega DX Playground</h2>

      {/* Function path input */}
      <label className="block mb-1">Function Path (relative to PCore):</label>
      <input
        type="text"
        value={funcPath}
        onChange={(e) => setFuncPath(e.target.value)}
        className="border p-2 rounded mb-3 w-full font-mono"
        placeholder="e.g. getDataApiUtils().getData"
      />

      {/* Args JSON */}
      <label className="block mb-1">Arguments (JSON array):</label>
      <textarea
        rows={4}
        value={args}
        onChange={(e) => setArgs(e.target.value)}
        className="border p-2 rounded w-full mb-3 font-mono"
        placeholder='["D_EmployeeList", {"payload": {...}}, "app/primary_1"]'
      />

      <button
        onClick={handleRun}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Run
      </button>

      {/* Response */}
      {response && (
        <div className="mt-4">
          <h3 className="font-semibold">Response:</h3>
          <ReactJson src={response} collapsed={false} name={false} />
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mt-4 text-red-600">
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
};

export default PegaDXPlayground;
