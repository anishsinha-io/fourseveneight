import { RequestHandler } from "express";

import computerScienceTags from "../../tags/computerScienceTags";
import engineeringTags from "../../tags/engineeringTags";
import artTags from "../../tags/artTags";
import mathematicsTags from "../../tags/mathematicsTags";
import businessTags from "../../tags/businessTags";
import economicsTags from "../../tags/economicsTags";
import linguisticsTags from "../../tags/linguisticsTags";
import universeTags from "../../tags/universeTags";
import sportsTags from "../../tags/sportsTags";
import publicHealthTags from "../../tags/publicHealthTags";
import philosophyTags from "../../tags/philosophyTags";
import musicTags from "../../tags/musicTags";
import lawTags from "../../tags/lawTags";
import historyTags from "../../tags/historyTags";
import foodAndDrinkTags from "../../tags/foodAndDrinkTags";
import financeTags from "../../tags/financeTags";
import environmentTags from "../../tags/environmentTags";
import entertainmentTags from "../../tags/entertainmentTags";
import educationTags from "../../tags/educationTags";

import camelize from "../../util/camelize";

export const getTags: RequestHandler = (req, res) => {
  try {
    const { categories } = req.body;

    const tagsToReturn: any = [];

    Object.keys(categories).forEach((category: string) =>
      tagsToReturn.push(`${camelize(category)}Tags`)
    );
    console.log(tagsToReturn);
    return res.status(200).json({ ...tagsToReturn });
  } catch (err) {}
};
