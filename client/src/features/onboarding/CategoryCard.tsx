import React, { Fragment, useState, useContext } from "react";

import { onboardContext } from "./Onboarding";

const CategoryCard: React.FC<{ category: string }> = (props) => {
  const { category } = props;

  const preferencesContext = useContext(onboardContext);

  const [hasOverlay, setHasOverlay] = useState<boolean>(false);

  const handleCardClick = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();

    if (!hasOverlay) preferencesContext.categories.push(e.target.innerText);
    else
      preferencesContext.categories = preferencesContext.categories.filter(
        (category: string) => category !== e.target.innerText
      );
    setHasOverlay(!hasOverlay);
    console.log(preferencesContext.categories);
  };

  return (
    <Fragment>
      <div className="card" onClick={handleCardClick}>
        <img
          className="card__img"
          src={`http://localhost:8000/api/posts/downloads/image/fse-category-${category.replaceAll(
            " ",
            ""
          )}`}
          alt={category}
        />
        <div
          className={`card__description ${hasOverlay ? "card-overlay" : ""}`}
        >
          <h5 className="description__title">{category}</h5>
        </div>
      </div>
    </Fragment>
  );
};

export default CategoryCard;
