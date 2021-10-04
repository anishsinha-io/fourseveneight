import React, { Fragment, useState, useContext } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import TextField from "@mui/material/TextField";
import ChipInput from "material-ui-chip-input";
import countries from "i18n-iso-countries";

import { NewUserContext, INewUserContext } from "./InitialPreferences";

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

const SetupProfile: React.FC = () => {
  const newUserContext = useContext(NewUserContext);
  const [skills, setSkills] = useState<string[]>(newUserContext.skills);

  const countryList = Object.values(
    countries.getNames("en", { select: "official" })
  ).map((country: string) => <option key={country}>{country}</option>);

  const handleAddSkill = (skill: string) => {
    if (newUserContext.skills.length < 5) {
      setSkills([...skills, skill]);
      newUserContext.skills = [...skills, skill];
    } else return;
  };

  const handleRemoveSkill = (skill: string) => {
    const newSkills = skills.filter((skillItem: string) => skillItem !== skill);
    setSkills(newSkills);
    newUserContext.skills = newSkills;
  };

  const handleJobTitleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    newUserContext.jobTitle = e.target.value;
  };

  const handleGithubUsernameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    newUserContext.github = e.target.value;
  };

  const handleEmploymentStatusChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    e.preventDefault();
    newUserContext.employmentStatus = e.target.value;
  };

  const handleWebsiteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    newUserContext.website = e.target.value;
  };
  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    newUserContext.location = e.target.value;
  };

  const handleBioChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    newUserContext.bio = e.target.value;
  };

  return (
    <Fragment>
      <div className="setup-profile">
        <h3 className="setup-profile__heading">
          Customize your profile (Optional)
        </h3>
        <div className="setup-profile__main">
          <div className="setup-profile__job">
            <Box>
              <FormControl fullWidth>
                <InputLabel variant="standard">Job Title</InputLabel>
                <NativeSelect
                  inputProps={{
                    name: "jobTitle",
                  }}
                  onChange={handleJobTitleChange}
                >
                  <option> -- select an option -- </option>
                  <option>Project Manager</option>
                  <option>C-Suite executive</option>
                  <option>Freelancer</option>
                  <option>Software engineer</option>
                  <option>Database admin</option>
                  <option>Cloud architect</option>
                  <option>Web developer</option>
                  <option>Data scientist</option>
                  <option>DevOps engineer</option>
                  <option>Other</option>
                </NativeSelect>
              </FormControl>
            </Box>
          </div>
          <div className="setup-profile__status">
            <Box>
              <FormControl fullWidth>
                <InputLabel variant="standard">Employment Status</InputLabel>
                <NativeSelect
                  inputProps={{
                    name: "employmentStatus",
                  }}
                  onChange={handleEmploymentStatusChange}
                >
                  <option> -- select an option -- </option>
                  <option>Employed</option>
                  <option>Unemployed</option>
                  <option>Retired</option>
                </NativeSelect>
              </FormControl>
            </Box>
          </div>
          <div className="setup-profile__website">
            <Box component="form" noValidate autoComplete="off">
              <TextField
                label="Website"
                variant="standard"
                onChange={handleWebsiteChange}
              />
            </Box>
          </div>
          <div className="setup-profile__github">
            <Box component="form" noValidate autoComplete="off">
              <TextField
                label="Github"
                variant="standard"
                onChange={handleGithubUsernameChange}
              />
            </Box>
          </div>
          <div className="setup__skills">
            <ChipInput
              value={skills}
              newChipKeys={["Enter"]}
              onAdd={handleAddSkill}
              onDelete={handleRemoveSkill}
              allowDuplicates={false}
              blurBehavior="clear"
              placeholder="Add tags to your post"
              fullWidthInput={true}
              variant="standard"
              helperText="Enter between 1 and 5 skills"
              fullWidth={true}
            />
          </div>
          <div className="setup-profile__github">
            <Box>
              <FormControl fullWidth>
                <InputLabel variant="standard">Location</InputLabel>
                <NativeSelect
                  inputProps={{
                    name: "employmentStatus",
                  }}
                  onChange={handleLocationChange}
                >
                  <option> -- select an option -- </option>
                  {countryList}
                </NativeSelect>
              </FormControl>
            </Box>
          </div>
        </div>
        <div className="setup-profile__bio">
          <Box component="form" noValidate autoComplete="off">
            <TextField
              label="Bio"
              variant="standard"
              onChange={handleBioChange}
              multiline={true}
              minRows={4}
              maxRows={4}
              fullWidth={true}
              placeholder="But most of all, autumn is my hero."
            />
          </Box>
        </div>
        <button type="button" onClick={() => console.log(newUserContext)}>
          submit
        </button>
      </div>
    </Fragment>
  );
};

export default SetupProfile;
