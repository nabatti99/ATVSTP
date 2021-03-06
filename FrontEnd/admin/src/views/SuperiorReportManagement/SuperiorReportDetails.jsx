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
import { exportDate, getDateDelete, importDate } from "utilities/formatDate";
import FlagSvg from "components/Icons/FlagSvg";
import ReplaySvg from "components/Icons/ReplaySvg";

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
    date_delete: null,
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
    date_delete = null,
  } = superiorReport;

  const buttonELements = (
    <Stack direction="row">
      <Stack width={132}>
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
          Ch???nh s???a
        </ButtonIcon>

        {date_delete ? (
          <ButtonIcon
            variant="contained"
            color="green"
            LeftIcon={ReplaySvg}
            onClick={() => {
              request.put(`superior_reporting/restore_report/${_id}`).then(() => getSuperiorReport());
            }}
          >
            Ph???c h???i
          </ButtonIcon>
        ) : (
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
            Xo??
          </ButtonIcon>
        )}
      </Stack>
    </Stack>
  );

  const skeleton = <Skeleton animation="wave" sx={{ minWidth: "200px" }} />;

  return (
    <Stack>
      <Typography variant="h4" color="gray.700">
        N???i dung b??o c??o c???p tr??n
      </Typography>

      <Paper elevation={2} sx={{ padding: 4, marginTop: 4 }}>
        <Stack direction="row">
          <Stack flexGrow={1}>
            <Typography variant="h4">{isLoading ? skeleton : title}</Typography>
            <Box width={100} height={2} bgcolor="gray.500" mt={2} />

            <Stack direction="row" color="gray.500" alignItems="center" mt={1}>
              <ApartmentSvg size={16} mr={1} />
              <Typography variant="strong">{isLoading ? skeleton : `N??i nh???n b??o c??o: ${regulator_agency}`}</Typography>
            </Stack>

            <Stack direction="row" color="gray.500" mt={1}>
              <LocalMallSvg size={16} mr={1} />
              <Stack>
                <Typography variant="strong">Danh s??ch c???a h??ng c???n thanh tra</Typography>
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
              <Typography variant="strong">Khu v???c b??o c??o: {reporting_area}</Typography>
            </Stack>

            <Typography variant="h5" color="gray.700" mt={4}>
              N???I DUNG
            </Typography>
            <Typography variant="regular" color="gray.500" mt={1}>
              {isLoading ? skeleton : content}
            </Typography>
            <Typography variant="strong" mt={2} color="gray.500">
              ???????c t???o b???i: {isLoading ? skeleton : <Link href={`/UserDetail/${writer}`}>{writer}</Link>}
            </Typography>

            <Typography variant="strong" mt={2} color="gray.500">
              C???p nh???t l???n cu???i: {isLoading ? skeleton : importDate(updated_at).toLocaleString()}
            </Typography>

            {is_draft ? (
              <Typography variant="strong" mt={2} color="red.500">
                {isLoading ? skeleton : "B???n nh??p"}
              </Typography>
            ) : (
              <Typography variant="strong" mt={2} color="green.500">
                {isLoading ? skeleton : "???? g???i"}
              </Typography>
            )}
            {date_delete && (
              <Typography variant="strong" color="red.500" mt={4}>
                B??o c??o n??y s??? b??? xo?? v??nh vi???n sau: {getDateDelete(date_delete)}
              </Typography>
            )}
          </Stack>

          {buttonELements}
        </Stack>
      </Paper>

      {/* Portal to render Modals */}
      <Outlet />
    </Stack>
  );
}

export default SuperiorReportDetails;
