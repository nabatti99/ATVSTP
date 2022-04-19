import { useEffect, useState } from "react";
import { Stack, Typography } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";

import InspectionScheduleSearchBar from "./InspectionScheduleSearchBar";
import InspectionScheduleDataGrid from "./InspectionScheduleDataGrid";
import { exportDate } from "utilities/formatDate";

function InspectionSchedulesManagement() {
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
    dateStart: exportDate(defaultStartDate),
    dateEnd: exportDate(defaultEndDate),
    isDraft: true,
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
        Quản lí Kế hoạch thanh tra
      </Typography>

      <InspectionScheduleSearchBar query={query} onChange={handleChanged} />

      <InspectionScheduleDataGrid
        shouldTableUpdate={shouldTableUpdate}
        query={query}
        onTableUpdate={handleTableUpdated}
      />

      {/* Portal to render Modals */}
      <Outlet />
    </Stack>
  );
}

export default InspectionSchedulesManagement;
