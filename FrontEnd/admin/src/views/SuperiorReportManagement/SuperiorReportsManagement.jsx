import { useEffect, useState } from "react";
import { Stack, Typography } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";

import useRequest from "../../hooks/useRequest";
import SuperiorReportSearchBar from "./SuperiorReportSearchBar";
import SuperiorReportsDataGrid from "./SuperiorReportDataGrid";
import { exportDate } from "utilities/formatDate";

function SuperiorReportsManagement() {
  const request = useRequest();

  // Handle table events
  const [shouldTableUpdate, setShouldTableUpdate] = useState(false);

  const handleTableUpdated = () => {
    setShouldTableUpdate(false);
  };

  // Handle search bar events
  const defaultStartDate = new Date();
  defaultStartDate.setMonth(new Date().getMonth() - 3);

  const defaultEndDate = new Date();
  defaultEndDate.setMonth(new Date().getMonth() + 3);

  const [query, setQuery] = useState({
    dateStart: exportDate(defaultStartDate).slice(0, 10),
    dateEnd: exportDate(defaultEndDate).slice(0, 10),
    isDraft: false,
  });
  const handleChanged = (newQuery) => {
    setQuery(newQuery);

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
        Quản lí các báo cáo gửi cấp trên
      </Typography>

      <SuperiorReportSearchBar query={query} onChange={handleChanged} />

      <SuperiorReportsDataGrid
        shouldTableUpdate={shouldTableUpdate}
        query={query}
        onTableUpdate={handleTableUpdated}
      />

      {/* Portal to render Modals */}
      <Outlet />
    </Stack>
  );
}

export default SuperiorReportsManagement;
