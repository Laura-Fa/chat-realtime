"use client";
import { useEffect, useState } from "react";
import Child from "./child";

const Parent = () => {
  const [time, setTime] = useState<Date | null>(null);
  const [relativeTime, setRelativeTime] = useState<number | null>(null);
  const [nbrOfChild, setNbrOfChild] = useState<number>(1);

  useEffect(() => {
    if (!time) {
      return;
    }
    setRelativeTime(0);
    const interval = setInterval(() => {
      setRelativeTime(relativeTime + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [time]);

  return (
    <div className="shadow-xl card w-96 bg-base-100">
      <div className="card-body">
        <h2 className="card-title">Parent!</h2>
        <div className="justify-end card-actions">
          {relativeTime !== null && (
            <p>
              There has been {relativeTime} seconds since the last button click
            </p>
          )}
          <Child setTime={setTime} name="Parent's children">
            {...Array(nbrOfChild)
              .fill(0)
              .map((_, i) => <p key={i}>Children {i}</p>)}
          </Child>
          <button
            className="btn btn-primary"
            onClick={() => setNbrOfChild((n) => --n)}
          >
            Remove Child
          </button>
          <button
            className="btn btn-primary"
            onClick={() => setNbrOfChild((n) => ++n)}
          >
            Add Child
          </button>
        </div>
      </div>
    </div>
  );
};

export default Parent;
