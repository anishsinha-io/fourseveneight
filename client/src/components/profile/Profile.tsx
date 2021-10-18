import React, { Fragment, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchProfileFromQuery } from "./profileSlice";
import Spinner from "../spinner/Spinner";
import UserPosts from "../post/UserPosts";
import { getUserPosts } from "../post/postSlice";

import { TabPanel, a11yProps } from "../ui/MaterialUITabConfig";

const Profile = ({ match }: RouteComponentProps<{ username?: string }>) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (match.params.username) {
      dispatch(fetchProfileFromQuery(match.params.username));
    }
  }, [dispatch, match.params.username]);

  const [value, setValue] = useState<number>(0);

  const handleChange = (
    e: React.SyntheticEvent<Element, Event>,
    newValue: number
  ) => {
    setValue(newValue);
  };

  const status = useAppSelector((state) => state.profile.status);
  const profile = useAppSelector((state) => state.profile.profile);

  useEffect(() => {
    try {
      dispatch(getUserPosts(profile.user._id));
    } catch (err) {}
  });

  if (status === "loading") return <Spinner />;

  if (!profile || !Object.keys(profile).includes("user"))
    return <div>No profile found!</div>;

  return (
    <Fragment>
      <div className="profile-wrapper">
        <div className="profile-main">
          <div className="profile-main__head">
            <div className="head__background">
              <img
                src="http://localhost:8000/api/media/image/default_background"
                alt="background"
              />
            </div>
            <div className="head__image">
              <img
                className="image-profile"
                src="http://localhost:8000/api/media/image/fse-default-profile"
                alt="profile"
              />
            </div>
          </div>
          <div className="profile-main__meta">
            <div className="meta__user">
              <div className="meta__user-username">@{profile.username}</div>
              <div className="meta__user-name">{profile.user.firstName}</div>
            </div>
            <div className="meta__bio">{profile.bio}</div>
          </div>
          <div className="profile-main__tabs">
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "#7e7e7e" }}>
                <Tabs
                  TabIndicatorProps={{ style: { backgroundColor: "black" } }}
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  centered
                >
                  <Tab
                    label={
                      <span style={{ color: "black", minWidth: "8rem" }}>
                        Posts
                      </span>
                    }
                    {...a11yProps(0)}
                  />
                  <Tab
                    label={
                      <span style={{ color: "black", minWidth: "8rem" }}>
                        Questions
                      </span>
                    }
                    {...a11yProps(1)}
                  />
                  <Tab
                    label={
                      <span style={{ color: "black", minWidth: "8rem" }}>
                        Followers
                      </span>
                    }
                    {...a11yProps(2)}
                  />
                  <Tab
                    label={
                      <span style={{ color: "black", minWidth: "8rem" }}>
                        Following
                      </span>
                    }
                    {...a11yProps(3)}
                  />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <UserPosts userId={profile.user._id} />
              </TabPanel>
              <TabPanel value={value} index={1}>
                Questions
              </TabPanel>
              <TabPanel value={value} index={2}>
                Followers
              </TabPanel>
              <TabPanel value={value} index={3}>
                Following
              </TabPanel>
            </Box>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
