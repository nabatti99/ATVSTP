import { useEffect, useState } from "react";
import { Stack, Typography } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";

import useRequest from "../../hooks/useRequest";
import CertificateSearchBar from "./CertificateSearchBar";
import CertificateDataGrid from "./CertificateDataGrid";
import { ADD_NEW_CERTIFICATE, DELETE_CERTIFICATE, EDIT_CERTIFICATE } from "./Modals/certificateActionTypes";

function CertificatesManagement() {
  const request = useRequest();

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
      const certificate = state.certificateData;

      let avatarFormData = null;

      if (certificate.avatar instanceof File) {
        avatarFormData = new FormData();
        avatarFormData.append("upload", certificate.avatar);
      }

      Promise.resolve().then(() => {
        switch (state.action) {
          case ADD_NEW_CERTIFICATE:
            return request.post("/certificate", certificate).then(
              () =>
                avatarFormData &&
                request.post(`certificate/save_image/${certificate.name}`, avatarFormData, {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                })
            );

          case EDIT_CERTIFICATE:
            return request.put(`/certificate/${certificate.name}`, certificate).then(
              () =>
                avatarFormData &&
                request.post(`certificate/save_image/${certificate.name}`, avatarFormData, {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                })
            );

          case DELETE_CERTIFICATE:
            return request.delete(`/certificate/${certificate.name}`);

          default:
            throw new Error(`Lệnh không hợp lệ: ${state.action}`);
        }
      });
    }
  }, [state]);

  return (
    <Stack>
      <Typography variant="h4" color="gray.700">
        Quản lí các loại Chứng nhận
      </Typography>

      <CertificateSearchBar onChange={handleChanged} />

      <CertificateDataGrid
        shouldTableUpdate={shouldTableUpdate}
        query={query}
        onTableUpdate={handleTableUpdated}
      />

      {/* Portal to render Modals */}
      <Outlet />
    </Stack>
  );
}

export default CertificatesManagement;
