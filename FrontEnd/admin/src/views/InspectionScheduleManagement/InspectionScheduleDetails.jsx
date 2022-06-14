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
import { DELETE_SCHEDULE } from "./Modals/inspectionScheduleActionTypes";
import LocalMallSvg from "components/Icons/LocalMallSvg";
import GroupSvg from "components/Icons/GroupSvg";
import ReplaySvg from "components/Icons/ReplaySvg";
import { getDateDelete } from "utilities/formatDate";

function InspectionScheduleDetails() {
  const request = useRequest();
  const navigate = useNavigate();

  const { _id } = useParams();
  const { state } = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [inspectionSchedule, setInspectionSchedule] = useState({
    authority: "",
    groceries: [],
    content: "",
    assigned_to: [],
    schedule: "",
    updated_by: "",
    is_draft: true,
    date_delete: null,
  });

  const getInspectionSchedule = async () => {
    setIsLoading(true);
    const { data } = await request.get(`inspection_schedule/${_id}`);
    setInspectionSchedule(data);
    setIsLoading(false);
  };

  useEffect(() => getInspectionSchedule(), []);

  useEffect(() => {
    console.log(state);
    if (state && state.isSubmitted) {
      getInspectionSchedule();
    }
  }, [state]);

  const { authority = "", groceries = [], content = "", assigned_to = [], schedule = "", updated_by = "", is_draft = true, date_delete = null } = inspectionSchedule;

  const buttonELements = (
    <Stack>
      <ButtonIcon
        variant="contained"
        LeftIcon={ModeSvg}
        onClick={() => {
          navigate("Edit", {
            state: inspectionSchedule,
          });
        }}
        sx={{ marginBottom: 2 }}
      >
        Chỉnh sửa
      </ButtonIcon>
      {date_delete ? (
        <ButtonIcon
          variant="contained"
          color="green"
          LeftIcon={ReplaySvg}
          onClick={() => {
            request.put(`inspection_schedule/restore_schedule/${_id}`).then(() => getInspectionSchedule());
          }}
        >
          Phục hồi
        </ButtonIcon>
      ) : (
        <ButtonIcon
          variant="contained"
          color="red"
          LeftIcon={DeleteSvg}
          onClick={() => {
            navigate("Delete", {
              state: inspectionSchedule,
            });
          }}
        >
          Xoá
        </ButtonIcon>
      )}
    </Stack>
  );

  const skeleton = <Skeleton animation="wave" sx={{ minWidth: "200px" }} />;

  return (
    <Stack>
      <Typography variant="h4" color="gray.700">
        Thông tin kế hoạch thanh tra
      </Typography>

      <Paper elevation={2} sx={{ padding: 4, marginTop: 4 }}>
        <Stack direction="row">
          <Stack flexGrow={1}>
            <Typography variant="h4">{isLoading ? skeleton : schedule}</Typography>
            <Box width={100} height={2} bgcolor="gray.500" mt={2} />

            <Stack direction="row" color="gray.500" alignItems="center" mt={1}>
              <ApartmentSvg size={16} mr={1} />
              <Typography variant="strong">{isLoading ? skeleton : authority}</Typography>
            </Stack>

            <Stack direction="row" color="gray.500" alignItems="center" mt={1}>
              <LocalMallSvg size={16} mr={1} />
              <Stack color="gray.500">
                {groceries.map((grocery) => (
                  <Typography key="grocery" variant="strong">
                    <Link href={`/GroceryDetail/${grocery}`}>{grocery}</Link>
                  </Typography>
                ))}
              </Stack>
            </Stack>

            <Stack direction="row" color="gray.500" alignItems="center" mt={1}>
              <GroupSvg size={16} mr={1} />
              {isLoading ? (
                skeleton
              ) : (
                <Typography variant="strong">
                  Phân công:&nbsp;
                  {assigned_to.map((email) => (
                    <Link href={`/UserDetail/${email}`} mr={1}>
                      {email}
                    </Link>
                  ))}
                </Typography>
              )}
            </Stack>

            <Typography variant="strong" color="gray.500" mt={2}>
              Cập nhật lần cuối: {isLoading ? skeleton : updated_by}
            </Typography>

            <Typography variant="h4" color="gray.700" mt={4}>
              NỘI DUNG
            </Typography>
            <Typography color="gray.500" mt={2}>
              {isLoading ? skeleton : content}
            </Typography>

            {date_delete && (
              <Typography variant="strong" color="red.500" mt={4}>
                Lịch thanh tra này sẽ bị xoá vĩnh viễn sau: {getDateDelete(date_delete)}
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

export default InspectionScheduleDetails;
