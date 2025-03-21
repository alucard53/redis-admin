"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Editor } from "@monaco-editor/react";

export default function EditorWrapper({ 
  rKey,
  value: defaultValue, 
  isJSON
} : {
  rKey: string,
  value: string | undefined,
  isJSON: boolean
}) {
  const savedValueRef = useRef(defaultValue);
  const [value, setValue] = useState(defaultValue);

  const saveKey = useCallback(async function (e: KeyboardEvent) {
    if (!(e.ctrlKey && e.key === "s")) {
      return;
    }
    e.preventDefault();

    if (savedValueRef.current === value) {
      return alert("up to date");
    }

    const body = isJSON
      ? JSON.stringify(JSON.parse(value ?? ""))
      : value;

    const res = await fetch(`/api/${rKey}`, {
      method: "POST",
      body
    });

    if (res.status !== 200) {
      return alert("Failed to save changes due to error");
    }

    savedValueRef.current = value;

    alert("saved successfully");
  }, [value]);

  useEffect(() => {
    document.addEventListener("keydown", saveKey);

    return () => document.removeEventListener("keydown", saveKey);
  }, [saveKey]);

  return (
    <Editor
      loading={"loading..."}
      value={value}
      onChange={(e) => {
        setValue(e)
      }}
      theme="vs-dark"
      height="95vh"
      language={isJSON ? "json" : undefined}
    />
  )
}
