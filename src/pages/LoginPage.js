import React, { useEffect, useState } from "react";
import ClayButton from "@clayui/button";
import ClayForm, { ClayInput } from "@clayui/form";
import ClayLink from "@clayui/link";
import { Option, Picker } from "@clayui/core";

const LoginPage = () => {
  const [items, setItems] = useState([]);
  const [itemsAlternateNames, setItemsAlternateNames] = useState([]);
  const [user, setUser] = useState("");
  const [userAlternateName, setUserAlternateName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const fetchUsersAccounts = async () => {
      try {
        const response = await fetch(
          `https://webserver-lctgvrnmnt-prd.lfr.cloud/o/headless-admin-user/v1.0/user-accounts?search=ac`,
          {
            headers: {
              Authorization:
                "Basic YWMxOnRoaXNpc2FuYWxtb3N0dW5ndWVzc2FibGVidXRhbnl3YXl1bmltcG9ydGFudHBhc3N3b3Jk",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();

          const usersNames = data.items.map((user) => user.name);

          const usersAlternateNames = data.items.map(
            (user) => user.alternateName
          );

          setItems(usersNames);

          setItemsAlternateNames(usersAlternateNames);

          if (usersNames.length > 0) {
            setUser(usersNames[0]);

            setUserAlternateName(usersAlternateNames[0]);
          }
        } else {
          console.error("Request error");
        }
      } catch (error) {
        console.log("ERROR: " + error);
      }
    };

    fetchUsersAccounts();
  }, []);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUserSelectionChange = (selectedUser) => {
    const index = items.indexOf(selectedUser);

    setUser(selectedUser);

    setUserAlternateName(itemsAlternateNames[index]);
  };

  const isLinkEnabled = password.trim() !== "";

  return (
    <div style={{ margin: "100px auto", maxWidth: 400 }}>
      <ClayForm.Group className="sheet">
        <label className="mb-3" htmlFor="picker" id="picker-label">
          Select your user
        </label>

        <Picker
          selectedKey={user}
          style={{ textAlign: "left" }}
          className="mb-3"
          aria-labelledby="picker-label"
          id="picker"
          items={items}
          onSelectionChange={handleUserSelectionChange}
        >
          {(item) => <Option key={item}>{item}</Option>}
        </Picker>

        <ClayInput
          id="basicInputText"
          placeholder="Insert your password here"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <div className="text-center mt-3">
          <ClayLink
            button
            className="mr-2"
            displayType="primary"
            href={isLinkEnabled ? `/home?user=${userAlternateName}` : null}
          >
            Login
          </ClayLink>

          <ClayLink button displayType="secondary" href="/">
            Cancel
          </ClayLink>
        </div>
      </ClayForm.Group>
    </div>
  );
};

export default LoginPage;
