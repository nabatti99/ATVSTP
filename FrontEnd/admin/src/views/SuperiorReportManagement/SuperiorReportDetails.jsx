import { Box, Link, Paper, Skeleton, Stack, Typography } from "@mui/material";

import useRequest from "hooks/useRequest";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import ButtonIcon from "../../components/ButtonIcon";
import ApartmentSvg from "../../components/Icons/ApartmentSvg";
import AlarmOnSvg from "../../components/Icons/AlarmOnSvg";
import Image from "../../components/Image";
import ModeSvg from "components/Icons/ModeSvg";
import DeleteSvg from "components/Icons/DeleteSvg";
import { DELETE_REPORT } from "./Modals/superiorReportActionTypes";
import LocalMallSvg from "components/Icons/LocalMallSvg";
import { exportDate } from "utilities/formatDate";
import FlagSvg from "components/Icons/FlagSvg";

function SuperiorReportDetails() {
  const request = useRequest();
  const navigate = useNavigate();

  const { _id } = useParams();
  const { state } = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [superiorReport, setSuperiorReport] = useState({
    title: "",
    writer: "",
    reporting_area: "",
    inspected_groceries: [],
    content: "",
    regulator_agency: "",
    updated_at: new Date(),
    is_draft: true,
  });

  const getSuperiorReport = async () => {
    setIsLoading(true);
    const { data } = await request.get(`superior_reporting/${_id}`);
    setSuperiorReport(data);
    setIsLoading(false);
  };

  useEffect(() => getSuperiorReport(), []);

  useEffect(() => {
    console.log(state);
    if (state && state.isSubmitted) {
      if (state.action == DELETE_REPORT) {
        navigate("/SuperiorReportsManagement/", {
          replace: true,
        });
        return;
      }

      getSuperiorReport();
    }
  }, [state]);

  const {
    title = "",
    writer = "",
    reporting_area = "",
    inspected_groceries = [],
    content = "",
    regulator_agency = "",
    updated_at = "",
    is_draft = true,
  } = superiorReport;

  const skeleton = <Skeleton animation="wave" sx={{ minWidth: "200px" }} />;

  return (
    <Stack>
      <Typography variant="h4" color="gray.700">
        Nội dung báo cáo cấp trên
      </Typography>

      <Paper elevation={2} sx={{ padding: 4, marginTop: 4 }}>
        <Stack direction="row">
          <Stack flexGrow={1}>
            <Typography variant="h4">{isLoading ? skeleton : title}</Typography>
            <Box width={100} height={2} bgcolor="gray.500" mt={2} />

            <Stack direction="row" color="gray.500" alignItems="center" mt={1}>
              <ApartmentSvg size={16} mr={1} />
              <Typography variant="strong">
                {isLoading ? skeleton : `Nơi nhận báo cáo: ${regulator_agency}`}
              </Typography>
            </Stack>

            <Stack direction="row" color="gray.500" mt={1}>
              <LocalMallSvg size={16} mr={1} />
              <Stack>
                <Typography variant="strong">Danh sách cửa hàng cần thanh tra</Typography>
                {isLoading
                  ? skeleton
                  : inspected_groceries.map((grocery) => (
                      <Typography variant="strong" key={grocery} mt={1}>
                        <Link href={`GroceryDetail/${grocery}`}>{grocery}</Link>
                      </Typography>
                    ))}
              </Stack>
            </Stack>

            <Stack direction="row" color="gray.500" mt={1}>
              <FlagSvg size={16} mr={1} />
              <Typography variant="strong">Khu vực báo cáo: {reporting_area}</Typography>
            </Stack>

            <Typography variant="h5" color="gray.700" mt={4}>
              NỘI DUNG
            </Typography>
            <Typography variant="regular" color="gray.500" mt={1}>
              {isLoading ? skeleton : content}
            </Typography>
            <Typography variant="strong" mt={2} color="gray.500">
              Được tạo bởi: {isLoading ? skeleton : <Link href={`/UserDetail/${writer}`}>{writer}</Link>}
            </Typography>

            <Typography variant="strong" mt={2} color="gray.500">
              Cập nhật lần cuối: {isLoading ? skeleton : exportDate(new Date(updated_at))}
            </Typography>

            {is_draft ? (
              <Typography variant="strong" mt={2} color="red.500">
                {isLoading ? skeleton : "Bản nháp"}
              </Typography>
            ) : (
              <Typography variant="strong" mt={2} color="green.500">
                {isLoading ? skeleton : "Đã gửi"}
              </Typography>
            )}
          </Stack>

          <Stack>
            <ButtonIcon
              variant="contained"
              LeftIcon={ModeSvg}
              onClick={() => {
                navigate("Edit", {
                  state: superiorReport,
                });
              }}
              sx={{ marginBottom: 2 }}
            >
              Chỉnh sửa
            </ButtonIcon>
            <ButtonIcon
              variant="contained"
              color="red"
              LeftIcon={DeleteSvg}
              onClick={() => {
                navigate("Delete", {
                  state: superiorReport,
                });
              }}
            >
              Xoá
            </ButtonIcon>
          </Stack>
        </Stack>
      </Paper>

      {/* Portal to render Modals */}
      <Outlet />
    </Stack>
  );
}

export default SuperiorReportDetails;
