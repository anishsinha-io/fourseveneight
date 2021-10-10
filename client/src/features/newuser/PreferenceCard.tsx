import React, { Fragment, useState, useContext } from "react";

import { NewUserContext } from "./InitialPreferences";

const CategoryCard: React.FC<{ category: string }> = (props) => {
  const { category } = props;

  const newUserContext = useContext(NewUserContext);

  const [hasOverlay, setHasOverlay] = useState<boolean>(false);

  const handleCardClick = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();

    if (!hasOverlay)
      newUserContext.categoryPreferences.push(`${e.target.innerText}`);
    else {
      newUserContext.categoryPreferences =
        newUserContext.categoryPreferences.filter(
          (category: string) => category !== `${e.target.innerText}`
        );
    }
    setHasOverlay(!hasOverlay);
  };

  return (
    <Fragment>
      <div className="card" onClick={handleCardClick}>
        <div
          className={`card__description  ${hasOverlay ? "card-overlay" : ""}`}
        >
          <h5 className="description__title">{category}</h5>
        </div>
      </div>
    </Fragment>
  );
};

export default CategoryCard;
