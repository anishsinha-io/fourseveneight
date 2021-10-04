import React, { Fragment } from "react";

import PreferenceCard from "./PreferenceCard";

const Preferences: React.FC = () => {
  const possiblePreferences: string[] = [
    "computer science",
    "history",
    "entertainment",
    "mathematics",
    "politics",
    "public health",
    "economics",
    "linguistics",
    "law",
    "music",
    "sports",
    "philosophy",
    "environment",
    "food and drink",
    "education",
    "universe",
    "art",
    "finance",
    "engineering",
  ];
  const preferencesCards = possiblePreferences.map((category: string) => {
    return <PreferenceCard key={category} category={category} />;
  });
  return (
    <Fragment>
      <div className="categories-main">
        <div className="categories-main__title">
          <h3>Select categories you're interested in</h3>
        </div>
        <div className="categories-main__options">{preferencesCards}</div>
      </div>
    </Fragment>
  );
};

export default Preferences;
