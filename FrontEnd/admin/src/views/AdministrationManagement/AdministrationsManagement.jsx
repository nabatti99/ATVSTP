import { useEffect, useState } from "react";
import { Stack, Typography } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";

import AdministrationSearchBar from "./AdministrationSearchBar";
import AdministrationDataGrid from "./AdministrationDataGrid";

function AdministrationsManagement() {
  // Handle table events
  const [shouldTableUpdate, setShouldTableUpdate] = useState(false);

  const handleTableUpdated = () => {
    setShouldTableUpdate(false);
  };

  // Handle search bar events
  const [query, setQuery] = useState("");
  const handleChanged = (keyword) => {
    setQuery(keyword);

    setShouldTableUpdate(true);
  };

  // Trigger execute table actions
  const { state } = useLocation();

  useEffect(() => {
    if (state && state.isSubmitted) {
      setShouldTableUpdate(true);
    }
  }, [state]);

  return (
    <Stack>
      <Typography variant="h4" color="gray.700" mb={4}>
        Quản lí Các tổ chức thanh tra
      </Typography>

      <AdministrationSearchBar onChange={handleChanged} />

      <AdministrationDataGrid
        shouldTableUpdate={shouldTableUpdate}
        query={query}
        onTableUpdate={handleTableUpdated}
      />

      {/* Portal to render Modals */}
      <Outlet />
    </Stack>
  );
}

export default AdministrationsManagement;
