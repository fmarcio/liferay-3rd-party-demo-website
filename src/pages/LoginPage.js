import React, { useState } from "react";
import ClayForm, { ClayInput } from "@clayui/form";
import ClayButton from "@clayui/button";
import { Option, Picker, Text } from "@clayui/core";
import ClayLoadingIndicator from "@clayui/loading-indicator";
import { Link } from "react-router-dom";
import { useFetchUsers } from "../hooks/useFetch";

const LoginPage = () => {
  const [password, setPassword] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);

  const { items, loading } = useFetchUsers();

  const isLinkEnabled = password.trim() !== "";

  return (
    <div className="login">
      <ClayForm.Group className="sheet">
        <div className="text-center mb-4 position-relative">
          <img src="./logo.png" alt="logo" />

          <div className="header__logo-login-text">
            <Text weight="bold" size={3}>
              3rd party website
            </Text>
          </div>
        </div>

        <label
          className="mb-3 text-uppercase"
          htmlFor="picker"
          id="picker-label"
        >
          <Text size={4}>Login</Text>
        </label>

        {loading && <ClayLoadingIndicator className="mb-4" />}

        {!loading && (
          <Picker
            selectedKey={selectedUserId}
            className="mb-3"
            aria-labelledby="picker-label"
            id="picker"
            items={items}
            onSelectionChange={(id) => setSelectedUserId(id)}
          >
            {({ name, id }) => <Option key={id}>{name}</Option>}
          </Picker>
        )}

        <ClayInput
          disabled={loading}
          id="basicInputText"
          placeholder="Type password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <div className="text-center mt-3">
          <Link
            className="login-link"
            to={isLinkEnabled ? `/home?userId=${selectedUserId}` : ""}
          >
            <ClayButton
              block
              className="mr-2"
              displayType="primary"
              disabled={!isLinkEnabled}
            >
              Login
            </ClayButton>
          </Link>
        </div>
      </ClayForm.Group>

      <div className="text-center">
        {" "}
        3rd party website demo. Powered by @liferay
      </div>
    </div>
  );
};

export default LoginPage;