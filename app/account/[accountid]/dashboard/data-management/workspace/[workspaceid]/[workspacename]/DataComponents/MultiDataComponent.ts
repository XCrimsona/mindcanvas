"use client";
import React, { useState } from "react";

export const useMultiDataComponent = () => {
  const [multiDataComponent, setMultiDataComponent] = useState<any>(null);
  // const MultiDataComponent = useState<any[]>([]);
  return { multiDataComponent, setMultiDataComponent };
};
